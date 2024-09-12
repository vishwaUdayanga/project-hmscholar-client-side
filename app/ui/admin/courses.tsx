'use client'

import { useEffect, useState } from "react";
import { getCourses } from "@/app/api/admin/data";
import Link from "next/link";
import { deleteCourse } from "@/app/api/admin/delete";
import Image from "next/image";

type Course = {
    course_id: string;
    course_name: string;
    enrollment_key: string;
    course_description: string;
};

export default function Courses() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [courses, setCourses] = useState<Course[]>([]);
    useEffect(() => {
        const fetchCourses = async () => {
            try {

                const sectionsResponse = await getCourses();
                if (!sectionsResponse.ok) {
                    throw new Error('Failed to fetch lecturers');
                }
                const courses: Course[] = await sectionsResponse.json();
                setCourses(courses);
            } catch (error) {
                console.error('Error fetching courses:', error);
                setError('Error fetching courses');
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const handleDelete = async (courseId: string) => {
        try {
            const response = await deleteCourse({ courseId });
            if (!response.ok) {
                throw new Error('Failed to delete courses.');
            }
            setCourses(courses.filter(course => course.course_id !== courseId));
        } catch (error) {
            console.error('Error deleting courses:', error);
            setError('Error deleting courses');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="w-full px-4 pt-0 pb-4">
            {courses.map((course) => {
                return (
                    <div className="w-full flex items-center justify-between border-b-slate-300 border-b py-3 cursor-pointer flex-wrap gap-5" key={course.course_id}>
                        <div>
                            <p className="text-sm">{course.course_name}</p>
                            <p className="text-xs text-slate-400 mt-1">{course.enrollment_key}</p>
                            <div className={`rounded-lg px-3 border-slate-200 border w-fit mt-1 text-fuchsia-600`}>
                                <p className="text-xs">Y1 SEM1</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Link href={`/admin/dashboard/edit-course/${course.course_id}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#c026d3" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                </svg>
                            </Link>
                            <button 
                                onClick={() => handleDelete(course.course_id)} 
                                className="text-red-600"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-rose-600" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}