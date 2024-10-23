'use client'

import { useState, useEffect } from 'react';
import { getQuizzes } from '@/app/api/lecturer/data';
import Link from 'next/link';

type Quizzes = {
    quiz_id: string;
    quiz_name: string;
    section_name: string;
}


export default function StudentQuizAnswers({params} : {params: {id: string}}) {
    const {id} = params;
    const [quizzes, setQuizzes] = useState<Quizzes[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await getQuizzes({courseId: id});
                const result: Quizzes[] = await response.json();
                setQuizzes(result);
                setLoading(false);
            } catch (error) {
                console.error('Error occurred:', error);
            }
        };
        fetchQuizzes();
    }, [id]);

    return (
        <div className="w-full">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Student Quiz Answers</h1>
            </div>
            <div className="mt-8">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2">Quiz Name</th>
                                    <th className="border px-4 py-2">Section Name</th>
                                    <th className="border px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {quizzes.map((quiz) => (
                                    <tr key={quiz.quiz_id}>
                                        <td className="border px-4 py-2">{quiz.quiz_name}</td>
                                        <td className="border px-4 py-2">{quiz.section_name}</td>
                                        <td className="border px-5 py-5">
                                            <Link href={`/lecturer/dashboard/student-attempts/${quiz.quiz_id}`} className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded'>
                                                View answers
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}