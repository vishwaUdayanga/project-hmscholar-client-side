'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import { getLecturer, getLecturerCourses } from "@/app/api/lecturer/data";
import { CoursesSkeleton } from '@/app/ui/skeletons';
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Course = {
    course_id: string;
    course_name: string;
    year: number;
    enrollment_key: string;
    course_image: string | null;
    semester: number;
    lecturer_name: string;
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
    const [filteredCourses, setFilteredCourses] = useState<GroupedCourses>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const searchParams = useSearchParams();

    useEffect(() => {
        const query = searchParams.get('query');
        if (!query) {
            setFilteredCourses(groupedCourses);
            return;
        }

        const filteredCourses = Object.keys(groupedCourses).reduce((acc: GroupedCourses, key) => {
            const courses = groupedCourses[key].filter((course) => course.course_name.toLowerCase().includes(query.toLowerCase()));
            if (courses.length) {
                acc[key] = courses;
            }
            return acc;
        }, {});

        setFilteredCourses(filteredCourses);
    }
    , [searchParams, groupedCourses]);


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

                const lecturerResponse = await getLecturer({ email });
                if (!lecturerResponse.ok) {
                    throw new Error('Failed to fetch lecturer');
                }
                const lecturerData = await lecturerResponse.json();
                const lecturerId = lecturerData.id;

                const coursesResponse = await getLecturerCourses({ lecturerId });
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
            {Object.keys(filteredCourses).length >0 ? Object.keys(filteredCourses).map((semesterKey) => {
                return (
                    <div key={semesterKey} className="w-full lg:w-4/12">
                        <p className="text-sm mb-4 text-gray-400">{semesterKey}</p>
                        <div className="flex flex-col gap-5">
                            {
                                groupedCourses[semesterKey].map((course) => {
                                    return (
                                        <Link href={`/lecturer/dashboard/view-course/${course.course_id}`} key={course.course_id} className="flex gap-7 items-center border-b border-b-slate-200 pb-3 justify-between">
                                            <div className="flex gap-3 items-center w-80">
                                                <div className="relative w-14 h-10 rounded overflow-hidden">
                                                    <Image
                                                        src={course.course_image ? `${course.course_image}?sp=r&st=2024-10-11T03:23:52Z&se=2024-10-26T11:23:52Z&spr=https&sv=2022-11-02&sr=c&sig=j9bm0r%2F1ublueF5hAeTTja5w7EUdkalfzZo%2BNw0zzZM%3D` : '/dashboard/courses/1.jpg'}
                                                        alt={course.course_name}
                                                        fill
                                                        style={{ objectFit: 'cover' }}
                                                        className="rounded"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-sm max-w-72 text-slate-800">{course.course_name}</p>
                                                    <p className="text-xs max-w-72 text-slate-500">{course.lecturer_name}</p>
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
            }) : <p>No courses to show...</p>}
        </div>
    );
}
