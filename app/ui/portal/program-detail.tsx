'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import { getProgramDetails } from "@/app/api/student-portal/new-student/data";
import { CourseSkeletonPortal } from '@/app/ui/skeletons';
import Link from "next/link";

type Course = {
    course_id: string;
    program_name: string;
    program_description: string;
    university_name: string;
    university_image: string | null;
    course_name: string;
    course_description: string;
    course_image: string | null;
    year: number;
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


export default function ProgramDetailsComp({program_id} : {program_id: string}) {
    const [groupedCourses, setGroupedCourses] = useState<GroupedCourses>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchCourses = async () => {
            try {

                const coursesResponse = await getProgramDetails({ program_id });
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
    }, [program_id]);

    useEffect(() => {
        console.log(groupedCourses);
    }, [groupedCourses]);

    if (loading) return <CourseSkeletonPortal />;
    if (error) return <p>No courses to show...</p>;

    return (
        <div className="flex flex-col gap-6 w-full lg:gap-16">
            {Object.keys(groupedCourses).map((semesterKey) => {
                return (
                    <div key={semesterKey} className="w-full">
                        <p className="text-sm mb-4 text-gray-400">{semesterKey}</p>
                        <div className="flex flex-col gap-5">
                            {
                                groupedCourses[semesterKey].map((course) => {
                                    return (
                                        <div className="flex gap-7 items-center border-b border-b-slate-200 pb-3 justify-between" key={course.course_id}>
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
                                                    <p className="text-xs max-w-72 text-slate-500">{course.course_description}</p>
                                                </div>
                                            </div>
                                            <p className="text-sm flex gap-2">4 <span className="text-slate-300">credits</span></p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                )
            })}
            <Link href={`/student-portal/enroll/${program_id}`} className='text-center w-full rounded-md bg-black text-white text-sm font-bold p-2 hover:bg-slate-800'>
                Enroll right now
            </Link>
        </div>
    );
}