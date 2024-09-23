'use client'
import { getEnrolledStudents,getStudentProfile, getSemesterCourse} from "@/app/api/student/data";
import { useEffect } from "react";


export default function Page({ params } : { params: { id: string } }) {
    const { id } = params;
    let enrolledStudents,length;
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



                const coursesProgramResponse = await getSemesterCourse({ course_id: id,student_id: studentID });
                if (!coursesProgramResponse.ok) {
                    throw new Error('Failed to fetch courses');
                }

                enrolledStudents = await coursesProgramResponse.json();
                length = enrolledStudents.length;
            


            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    if (!enrolledStudents || length === 0) {
        return(
            <div>
                hello world
            </div>
        );
      }
}