'use client';
import { useEffect, useState } from 'react';
import { getStudentCourse, getStudentProfile, getProgramCourse , getEnrolledProgramCourse} from '@/app/api/student/data';
import { CourseCardSkeleton } from '@/app/ui/skeletons';
import Search from '@/app/ui/dashboard/search';
import { Suspense } from 'react';
import CourseCard from '@/app/ui/student/courseCard';


type Course = {
    course_id: string;
    course_name: string;
    year: number;
    enrollment_key: string;
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
    const [groupedProgramCoursesPrev, setGroupedProgramCoursesPrev] = useState<GroupedCourses>({});
    const [groupedProgramCourses, setGroupedProgramCourses] = useState<GroupedCourses>({});
    const [groupedCourses, setGroupedCourses] = useState<GroupedCourses>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('No token found');
                    window.location.href = '';
                    return;
                }

                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                const email = decodedToken.sub;

                const studentResponse = await getStudentProfile({ email });
                if (!studentResponse.ok) {
                    throw new Error('Failed to fetch lecturer');
                }
                const studentData = await studentResponse.json();
                const studentID = studentData.student_id;

                const previousCoursePesponse = await getEnrolledProgramCourse({student_id:studentID})
                const coursesResponse = await getStudentCourse({ student_id: studentID });
                const coursesProgramResponse = await getProgramCourse({ student_id: studentID });
                if (!previousCoursePesponse.ok) {
                    throw new Error('Failed to fetch courses');
                }
                if (!coursesResponse.ok) {
                    throw new Error('Failed to fetch courses');
                }
                if (!coursesProgramResponse.ok) {
                    throw new Error('Failed to fetch courses');
                }
                const enrlledCourses : Course[] = await previousCoursePesponse.json();
                const courses: Course[] = await coursesResponse.json();
                const ProgramCourse: Course[] = await coursesProgramResponse.json();

                setGroupedProgramCoursesPrev(groupCoursesBySemester(enrlledCourses));
                setGroupedProgramCourses(groupCoursesBySemester(ProgramCourse));
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

    if (error) return <p>Error: {error}</p>;
    if (loading) return (
        <div className="flex flex-col px-4">
          <div className="flex gap-4 items-center flex-col lg:flex-row mb-5">
            <Suspense fallback={<div>Loading...</div>}>
              <Search placeholder="Search for courses" />
            </Suspense>
          </div>
      
          <p className="font-bold mb-3 mt-3">Courses in current semester</p>
          <div className="w-full overflow-x-auto">
            <div className="flex flex-wrap justify-start gap-4">
              <CourseCardSkeleton />
              <CourseCardSkeleton />
              <CourseCardSkeleton />
              <CourseCardSkeleton />
              <CourseCardSkeleton />
            </div>
          </div>
      
          <p className="font-bold mb-3 mt-3">Enrolled courses in previous semesters</p>
          <div className="w-full overflow-x-auto">
            <div className="flex flex-wrap justify-start gap-4">
              <CourseCardSkeleton />
              <CourseCardSkeleton />
              <CourseCardSkeleton />
              <CourseCardSkeleton />
              <CourseCardSkeleton />
            </div>
          </div>
      
          <p className="font-bold mb-3 mt-3">Courses in the Program</p>
          <div className="w-full overflow-x-auto">
            <div className="flex flex-wrap justify-start gap-4">
              <CourseCardSkeleton />
              <CourseCardSkeleton />
              <CourseCardSkeleton />
              <CourseCardSkeleton />
              <CourseCardSkeleton />
            </div>
          </div>
        </div>
    );
      
      

    return (
            <div className="flex flex-col px-4">
                <div className="flex gap-4 items-center flex-col lg:flex-row mb-5">
                    <Suspense fallback={<div>Loading...</div>}>
                        <Search placeholder="Search for courses" />
                    </Suspense>
                </div>
        
                <p className="font-bold mb-3">Courses in current semester</p>
                <div className="w-full overflow-x-auto">
                    {Object.keys(groupedCourses).length === 0 ? (
                        <p className="text-center text-gray-500">No courses available.</p>
                    ) : (
                        <div className="flex flex-wrap justify-start gap-4">
                            {Object.keys(groupedCourses).map((semesterKey) => (
                                <div key={semesterKey} className="mb-8 w-full md:w-auto">
                                    <p className="text-sm mb-4 text-gray-400">{semesterKey}</p>
                                    <div className="flex p-2 flex-wrap gap-4">
                                        {groupedCourses[semesterKey].map((course) => (
                                            <CourseCard key={course.course_id} course={course} ></CourseCard>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <p className="font-bold mb-3">Enrolled courses in previous semesters</p>
                <div className="w-full overflow-x-auto">
                    {Object.keys(groupedProgramCoursesPrev).length === 0 ? (
                        <p className="text-center text-gray-500">No courses available.</p>
                    ) : (
                        <div className="flex flex-wrap justify-start gap-4">
                            {Object.keys(groupedProgramCoursesPrev).map((semesterKey) => (
                                <div key={semesterKey} className="mb-8 w-full md:w-auto">
                                    {/* <p className="text-sm mb-4 text-gray-400">{semesterKey}</p> */}
                                    <div className="flex p-2 flex-wrap gap-4">
                                        {groupedProgramCoursesPrev[semesterKey].map((course) => (
                                            <CourseCard key={course.course_id} course={course} ></CourseCard>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <p className="font-bold mb-3">Courses in the Program</p>
                <div className="w-full overflow-x-auto">
                    {Object.keys(groupedProgramCourses).length === 0 ? (
                        <p className="text-center text-gray-500">No courses available.</p>
                    ) : (
                        <div className="flex flex-wrap justify-start gap-4">
                            {Object.keys(groupedProgramCourses).map((semesterKey) => (
                                <div key={semesterKey} className="mb-8 w-full md:w-auto">
                                    {/* <p className="text-sm mb-4 text-gray-400">{semesterKey}</p> */}
                                    <div className="flex p-2 flex-wrap gap-4">
                                        {groupedProgramCourses[semesterKey].map((course) => (
                                            <CourseCard key={course.course_id} course={course} ></CourseCard>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
        
}
