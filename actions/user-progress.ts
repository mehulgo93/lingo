// whenever you are writing server actions you need to add use server in front otherwise it will not work

"use server";

import { getCoursesById, getUserProgress } from "@/db/queries";
import { challengeProgress, challenges, userProgress } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import db from "@/db/drizzle";

const POINTS_TO_REFILL = 10

export const upsertUserProgress = async (courseId: number) => {
    // every time we need to check the user progress we need to make sure that the user is logged in
    // every time we do server actions we need to behave like we are doing an API call so that's the reason for trying to authorize the user
    const {userId} = await auth();
    const user = await currentUser();

    if (!userId || !user) {
        throw new Error("Unauthorized");
    }

    const course = await getCoursesById(courseId);

    if (!course) {
        throw new Error("Course not found");
    }
    // TODO: Enable once units and lessons are added
    // if (!course.units.length || !course.units[0].lessons.length) {
    //     throw new Error("Course is Empty");
    // } 

    const exisitingUserProgress = await getUserProgress();

    if (exisitingUserProgress) {
        await db.update(userProgress).set({
            activeCourseId: courseId,
            userName: user.firstName || "User",
            userImageSrc: user.imageUrl || "/mascot.svg",
        })

        revalidatePath("/courses");
        revalidatePath("/learn");
        redirect("/learn");
    }
    // this step is only dones if there is no user progress for the current user in the db
    await db.insert(userProgress).values({
        userId, 
        activeCourseId: courseId,
        userName: user.firstName || "User",
        userImageSrc: user.imageUrl || "/mascot.svg",
    });

    revalidatePath("/courses");
    revalidatePath("/learn");
    redirect("/learn");
}

export const reduceHearts = async (challengeId:number) => {
    const {userId} = await auth();

    if(!userId) {
        throw new Error("Unauthorized");
    }

    const currentUserProgress = await getUserProgress();
    //TODO: Get user subscription
    const challenge = await db.query.challenges.findFirst({
        where: eq(challenges.id, challengeId)
    })
    if (!challenge) {
        throw new Error("Challenge not found");
    }
    const lessonId = challenge.lessonId;
    const exisitingChallengeProgress = await db.query.challengeProgress.findFirst({
        where:and(
            eq(challengeProgress.userId, userId),
            eq(challengeProgress.challengeId, challengeId),
        ),
    });
    const isPractice = !!exisitingChallengeProgress;
    if (isPractice) {
        return {error: "practice"};
    }
    if (!currentUserProgress) {
        throw new Error("User Progress not found");
    }
    //TODO: handle Subscriptions

    if (currentUserProgress.hearts === 0) {
        return {error: "hearts"};
    }
    await db.update(userProgress).set({
        hearts: Math.max(currentUserProgress.hearts - 1, 0),
    }).where(eq(userProgress.userId, userId))

    revalidatePath("/shop");
    revalidatePath("/learn");
    revalidatePath("/quests");
    revalidatePath("/leaderboard");
    revalidatePath(`/lesson/${lessonId}`);
};


export const refillHearts = async () => {
    const currentUserProgress = await getUserProgress();
    if (!currentUserProgress) {
        throw new Error("User Progress not found");
    }

    if (currentUserProgress.hearts === 5) {
        throw new Error("hearts are already full");
    }
    if (currentUserProgress.points < POINTS_TO_REFILL) {
        throw new Error("not enough points to refill");
    }
    await db.update(userProgress).set({
        hearts: currentUserProgress.hearts + 1,
        points: currentUserProgress.points - POINTS_TO_REFILL
    }).where(eq(userProgress.userId, currentUserProgress.userId));
    revalidatePath("/shop");
    revalidatePath("/learn");
    revalidatePath("/leaderboard");
    revalidatePath("/quests");
}