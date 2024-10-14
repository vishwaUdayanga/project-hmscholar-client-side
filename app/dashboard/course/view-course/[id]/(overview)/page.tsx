'use client';
import Image from "next/image";
import StudentAnnouncement from "@/app/ui/student/annoucements";
import { getEnrolledStudents, getStudentProfile, getSemesterCourse } from "@/app/api/student/data";
import { useEffect, useState } from "react";
import StudentSections from "@/app/ui/student/section";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form"; // Import useForm and Controller
import {enrollIncourses} from "@/app/api/student/create";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const [component, setComponent] = useState<JSX.Element | null>(null);
  const { control, handleSubmit } = useForm(); // Initialize useForm
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          window.location.href = '';
          return;
        }

        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const email = decodedToken.sub;

        const studentResponse = await getStudentProfile({ email });
        if (!studentResponse.ok) {
          throw new Error('Failed to fetch student');
        }

        const studentData = await studentResponse.json();
        const studentID = studentData.student_id;

        const coursesProgramResponse = await getEnrolledStudents({
          course_id: id,
          student_id: studentID,
        });
        if (!coursesProgramResponse.ok) {
          throw new Error('Failed to fetch courses');
        }

        const enrolledStudents = await coursesProgramResponse.json();
        if (!enrolledStudents || enrolledStudents.length === 0) {
          const checkSemesterResponse = await getSemesterCourse({ course_id: id, student_id: studentID });
          if (!checkSemesterResponse.ok) {
            throw new Error('Failed to fetch courses');
          }
          const checkSemester = await checkSemesterResponse.json();
          if (!checkSemester || checkSemester.length === 0) {
            setComponent(
              <div className="flex flex-col w-full h-1/2 justify-center items-center">
                <p className="font-bold mb-4">
                  You cannot currently register in this course
                </p>
                <Link 
                  href="/dashboard/course" 
                  className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-md hover:bg-white hover:text-black text-center border hover:border-black"
                >
                  Go back
                </Link>
              </div>
            );
            setLoading(false);
          } else {
            const onSubmit = async (data: any) => {
              const { enrollmentKey } = data;
              const response = await enrollIncourses({ course_id: id, student_id: studentID, enrollment_key: enrollmentKey });
              if (response.ok) {
                alert('Enrolled successfully');
                window.location.href = `/dashboard/course/view-course/${id}`;
              } else {
                alert('Wrong enrollment key!');
              }
            };

            setComponent(
                <form className='w-11/12 max-w-sm mx-auto my-4' onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <h1 className="font-bold text-xl mb-3 text-center">Course Enrollment</h1>
                    <div className="flex items-center p-2 border border-slate-600 rounded-md">
                    <Controller
                        name="enrollmentKey"
                        control={control}
                        render={({ field }) => (
                        <input
                            required
                            type="text"
                            id="enrollmentKey"
                            placeholder="Enter your enrollment key"
                            className="ml-2 text-black flex-1 outline-none text-sm sm:text-base"
                            {...field}
                        />
                        )}
                    />
                    </div>
                </div>

                <button 
                    type="submit" 
                    className={`w-full py-2 px-4 rounded-md text-white border hover:border-black hover:text-black hover:bg-white bg-black`}
                >
                    Enter
                </button>
                </form>

            );
            setLoading(false);
          }
        } else {
          setComponent(
            <div>
              <p className="mt-2 p-4 font-semibold text-lg">Major content</p>
              <StudentSections course_id={id} />
              <div className="flex-row items-center w-fit justify-center gap-6 mt-6 px-4">
                <p className="font-bold text-lg">Announcements</p>
                <Image src="/dashboard/announcements/bell.svg" alt="Announcement" width={20} height={20} />
              </div>
              <StudentAnnouncement course_id={id} />
            </div>
          ); 
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [id]);

  if(loading) {
    return <p>Loading...</p>;
  }
  return <>{component}</>; 
}
