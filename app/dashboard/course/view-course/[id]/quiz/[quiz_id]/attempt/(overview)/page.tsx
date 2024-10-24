'use client'
import { getStudentQuiz, getStudentProfile, getStudentAttempt } from "@/app/api/student/data";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { attemptQuiz } from "@/app/api/student/create";

type StudentProfile = {
    student_id: string;
    name: string;
    program: string;
    email: string;
    password: string; 
    student_image: string;
};

type studentAttempt = {
    is_enabled: boolean;
};

type Quiz = {
    quiz_id: string;
    quiz_name: string;
    quiz_duration: string;
    quiz_total_marks: number;
    quiz_description: string;
    quiz_password: string;
    quiz_no_of_questions: string;
    is_enabled: boolean;
    attempts: number;
};
export default function At({ params }: { params: { quiz_id: string, id: string } }) {
    const { id } = params;
    const { quiz_id } = params;
    const [component, setComponent] = useState<JSX.Element | null>(null);
    const { control, handleSubmit } = useForm();
    const [loading, setLoading] = useState(true);
    const [buttonLoading, setbuttonLoading] = useState(false);
    const [buttonText,setButtonText] = useState('Enter')

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true); 
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    window.location.href = '/'; 
                    return;
                }

                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                const email = decodedToken.sub;

                const studentResponse = await getStudentProfile({ email });
                if (!studentResponse.ok) {
                    throw new Error('Failed to fetch student');
                }
                const studentData: StudentProfile = await studentResponse.json();
                const studentID = studentData.student_id;

                const student_attempt = await getStudentAttempt({ student_id: studentID, course_id: id, quiz_id: quiz_id });
                const quiz = await getStudentQuiz({ quiz_id });

                if (!quiz.ok) {
                    throw new Error('Failed to fetch quiz');
                }
                const quizData: Quiz = await quiz.json();

                if (quizData.is_enabled === false) {
                    window.location.href = `/dashboard/course/view-course/${id}/quiz/${quiz_id}`;
                    return;
                }

                if (!student_attempt.ok) {
                    const onSubmit = async (data: any) => {

                        setbuttonLoading(true)
                        setButtonText('Loading...')
                        const { quiz_password } = data;
                        const response = await attemptQuiz({ course_id: id, quiz_id: quiz_id, student_id: studentID, quiz_password: quiz_password });

                        if (!response.ok) {
                            const errorData = await response.json();
                            console.error('Error details:', errorData);
                            alert('Wrong quiz password');
                            setbuttonLoading(false)
                            setButtonText('Enter')
                        } else {
                            window.location.href = `/dashboard/course/view-course/${id}/quiz/${quiz_id}/attempt/questions`;
                        }
                    };

                    setComponent(
                        <form className='w-11/12 max-w-sm mx-auto my-4' onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <h1 className="font-bold text-xl mb-3 text-center">Enter quiz password</h1>
                                <div className="flex items-center p-2 border border-slate-600 rounded-md">
                                    <Controller
                                        name="quiz_password"
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                required
                                                type="text"
                                                id="quiz_password"
                                                placeholder="Enter quiz password"
                                                className="ml-2 text-black flex-1 outline-none text-sm sm:text-base"
                                                {...field}
                                            />
                                        )}
                                    />
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                disabled={buttonLoading}
                                className={`w-full py-2 px-4 rounded-md text-white border hover:border-black hover:text-black hover:bg-white bg-black`}
                            >
                                {buttonText}
                            </button>
                        </form>
                    );
                } else {
                    const studentAttemptData: studentAttempt = await student_attempt.json();
                    if (studentAttemptData.is_enabled===true) {
                        window.location.href = `/dashboard/course/view-course/${id}/quiz/${quiz_id}/attempt/questions`;
                        return;   
                    } else {
                        setComponent(
                            <div className='w-11/12 max-w-sm mx-auto my-4'>
                                <div className="mb-4">
                                    <p className="font-bold text-xl mb-3 text-center">You have already attempted this quiz</p>
                                </div>

                                <Link 
                                    href={`/dashboard/course/view-course/${id}/quiz/${quiz_id}`}
                                    className={`w-full py-2 px-4 rounded-md text-white border hover:border-black hover:text-black hover:bg-white bg-black`}
                                >
                                    Go back
                                </Link>
                            </div>
                        );
                    }
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, [quiz_id, id]);

    if (loading) {
        return <p>Loading...</p>;
    }
    return <>{component}</>;
}
