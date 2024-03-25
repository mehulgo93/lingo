// whenever you are writing server actions you need to add use server in front otherwise it will not work

"use server";

import db from "@/db/drizzle";
import { getCoursesById, getUserProgress } from "@/db/queries";
import { userProgress } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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