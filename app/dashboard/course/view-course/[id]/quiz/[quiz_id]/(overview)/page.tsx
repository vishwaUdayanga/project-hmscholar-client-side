'use client'
import { getStudentQuiz,getStudentProfile } from "@/app/api/student/data"
import { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form"; 

type Quiz = {
    quiz_id:string,
    quiz_name:string,
    quiz_duration:string,
    quiz_total_marks:number,
    quiz_description:string,
    quiz_password:string,
    quiz_no_of_questions:string,
    is_enabled:boolean,
    attempts:number
};

export default function ViewQuiz({ params }: { params: { quiz_id: string, id:string } })
{
    const { id } = params;
    const { quiz_id } = params;
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
                const quiz = await getStudentQuiz({quiz_id});
                if(!quiz.ok)
                {
                    throw new Error('Failed to fetch quiz')
                }
                const quizData:Quiz = await quiz.json();
                if (quizData.is_enabled===false) {
                    setComponent(
                      <div className="w-full flex justify-center items-center content-center">
                        <div className="flex flex-col w-3/5 h-auto justify-center items-center p-4 bg-white shadow-md rounded-md border-black overflow-hidden mt-4">
                            <p className="font-bold mb-4">
                                {quizData.quiz_name}
                            </p>
                            <p className="mb-4">
                                {quizData.quiz_description}
                            </p>
                            <p className="mb-4">
                                Duration: {quizData.quiz_duration}h
                            </p>
                            <p className="mb-4">
                                Number of questions: {quizData.quiz_no_of_questions}.
                            </p>
                            <p className="mb-4">
                                Total marks: {quizData.quiz_total_marks}.
                            </p>
                            <p className="mb-4 ">
                                attemps: {quizData.attempts}.
                            </p>
                            <p className="mb-4 text-red-600">
                                You cannot attempt this quiz as it is currently disabled. :(
                            </p>
                            <Link 
                                href={`/dashboard/course/view-course/${id}`}
                                className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-md hover:bg-white hover:text-black text-center border hover:border-black"
                            >
                                Go back
                            </Link>
                        </div>
                      </div>
                        
                    );
                    setLoading(false);
                  }
                  else if(quizData.attempts>0)
                  {
                    setComponent(
                      <div className="w-full flex justify-center items-center content-center">
                        <div className="flex flex-col w-3/5 h-auto justify-center items-center p-4 bg-white shadow-md rounded-md border-black overflow-hidden mt-4">
                            <p className="font-bold mb-4">
                                {quizData.quiz_name}
                            </p>
                            <p className="mb-4">
                                {quizData.quiz_description}
                            </p>
                            <p className="mb-4">
                                Duration: {quizData.quiz_duration}h
                            </p>
                            <p className="mb-4">
                                Number of questions: {quizData.quiz_no_of_questions}.
                            </p>
                            <p className="mb-4">
                                Total marks: {quizData.quiz_total_marks}.
                            </p>
                            <p className="mb-4 ">
                                attemps: {quizData.attempts}.
                            </p>
                            <div className="flex w-full justify-center items-center content-center gap-4 columns-2 ">
                            <Link 
                                href={`/dashboard/course/view-course/${id}`}
                                className="flex px-4  items-center justify-center bg-black text-white px-4 py-2 rounded-md hover:bg-white hover:text-black text-center border hover:border-black"
                            >
                                Go back
                            </Link>
                            <Link 
                                href={`/dashboard/course/view-course/${id}/quiz/${quiz_id}/attempt`}
                                className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-md hover:bg-white hover:text-black text-center border hover:border-black"
                            >
                                Attempt
                           </Link>

                            </div>
                        </div>
                      </div>
                        
                    );
                    setLoading(false);
                  }
              } catch (error) {
                console.error('Error fetching courses:', error);
              }
            };
        
            fetchCourses();
          }, [quiz_id]);
        
          if(loading) {
            return <p>Loading...</p>;
          }
          return <>{component}</>; 
        }
        