import { getCourseName } from "@/app/api/lecturer/data";

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
            <div>
                <h1>{course_name}</h1>
            </div>
            {children}
        </>
    );
}
