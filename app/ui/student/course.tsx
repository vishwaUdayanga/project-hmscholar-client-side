'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import { getStudentProfile,getAllEnrolledCourses } from "@/app/api/student/data";
import { CoursesSkeleton } from '@/app/ui/skeletons';
import Link from "next/link";

type Course = {
    course_id: string;
    course_name: string;
    year: number;
    enrollment_key: string;
    semester: number;
};

type GroupedCourses = {
    [key: string]: Course[];
};

const groupCoursesBySemester = (courses: Course[]) => {
    return courses.reduce((acc: GroupedCourses, course: Course) => {
        const key = `Year ${course.year} - Semester ${course.semester}`;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(course);
        return acc;
    }, {});
};

export default function Courses() {
    const [groupedCourses, setGroupedCourses] = useState<GroupedCourses>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('No token found');
                    window.location.href = 'lecturer/login';
                    return;
                }

                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                const email = decodedToken.sub;

                const studenttResponse = await getStudentProfile({ email });
                if (!studenttResponse.ok) {
                    throw new Error('Failed to fetch lecturer');
                }
                const studentData = await studenttResponse.json();
                const student_id = studentData.student_id;

                const coursesResponse = await getAllEnrolledCourses({ student_id });
                if (!coursesResponse.ok) {
                    throw new Error('Failed to fetch courses');
                }
                const courses: Course[] = await coursesResponse.json();

                setGroupedCourses(groupCoursesBySemester(courses));
            } catch (error) {
                console.error('Error fetching courses:', error);
                setError('Error fetching courses');
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (loading) return <CoursesSkeleton />;
    if (error) return <p>No courses to show...</p>;

    return (
        <div className="flex flex-col gap-6 w-full lg:flex-row lg:gap-16">
            {Object.keys(groupedCourses).map((semesterKey) => {
                return (
                    <div key={semesterKey} className="w-full lg:w-4/12">
                        <p className="text-sm mb-4 text-gray-400">{semesterKey}</p>
                        <div className="flex flex-col gap-5">
                            {
                                groupedCourses[semesterKey].map((course) => {
                                    return (
                                        <Link href={`/dashboard/course/view-course/${course.course_id}`} key={course.course_id} className="flex gap-7 items-center border-b border-b-slate-200 pb-3 justify-between">
                                            <div className="flex gap-3 items-center w-80">
                                                <div className="relative w-14 h-10 rounded overflow-hidden">
                                                    <Image
                                                        src={'/dashboard/courses/1.jpg'}
                                                        alt={course.course_name}
                                                        fill
                                                        style={{ objectFit: 'cover' }}
                                                        className="rounded"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-sm max-w-72 text-slate-800">{course.course_name}</p>
                                                </div>
                                            </div>
                                            <p className="text-sm flex gap-2">4 <span className="text-slate-300">credits</span></p>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </div>
                )
            })}
        </div>
    );
}
