import { getCourseName } from "@/app/api/lecturer/data";
import Link from "next/link";

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
            <div className="p-4 flex justify-between items-center flex-wrap gap-5 w-full">
                <h1 className="text-xl">{course_name}</h1>
            </div>
            <div className="w-full">
            {children}

            </div>
                
        </>

    );
}
