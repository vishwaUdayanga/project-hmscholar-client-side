import { getCourseName } from "@/app/api/lecturer/data";
import Link from "next/link";
import React from "react";

export default async function Layout({ children, params }: { children: React.ReactNode, params: { id: string } }) {
    const { id } = params;
    let course;
    let course_name;;

    try {
        course = await getCourseName({ courseId: id });
        course_name = await course.json() || 'Error fetching course name';
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }

    return (
        <>
            <div className="p-4 flex justify-between items-center flex-wrap gap-5">
                <h1 className="text-xl">{course_name}</h1>
                <div className="flex gap-3 flex-wrap">
                    <Link href={`/lecturer/dashboard/view-course/${id}`} className="px-3 py-2 h-fit bg-blue-200 text-blue-600 rounded-md text-xs cursor-pointer">Course</Link>
                    <Link href={`/lecturer/dashboard/view-course/${id}/add-section`} className="px-3 py-2 h-fit bg-fuchsia-200 text-fuchsia-600 rounded-md text-xs cursor-pointer">Add section</Link>
                    <Link href={`/lecturer/dashboard/view-course/${id}/add-quiz`} className="px-3 py-2 h-fit bg-green-200 text-green-600 rounded-md text-xs cursor-pointer">Add quiz</Link>
                    <Link href={`/lecturer/dashboard/view-course/${id}/add-student`} className="px-3 py-2 h-fit bg-sky-200 text-sky-600 rounded-md text-xs cursor-pointer">Add students</Link>
                    <Link href={`/lecturer/dashboard/view-course/${id}/add-announcements`} className="px-2 h-fit py-2 bg-rose-200 text-rose-600 rounded-md text-xs cursor-pointer">Add announcements</Link>
                    <Link href={`/lecturer/dashboard/view-course/${id}/settings`} className="px-2 h-fit py-2 bg-yellow-200 text-yellow-600 rounded-md text-xs cursor-pointer">Settings</Link>
                </div>
            </div>
            {children}
        </>
    );
}
