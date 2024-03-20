// this function will run to call a query to get Courses from the drizzle database
import { cache } from "react";
import db from "./drizzle";

export const getCourses = cache(async() => {
    const data = await db.query.courses.findMany();

    return data;
})