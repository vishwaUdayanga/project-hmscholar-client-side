'use client'

import { useState, useEffect } from 'react';
import { getStudentAttempts } from '@/app/api/lecturer/data';
import Link from 'next/link';

type StudentAttempts = {
    student_id: string;
    email: string;
    quiz_id: string;
    mcq_marks: number;
    written_marks: number;
}

export default function StudentAttempts({params} : {params: {id: string}}) {
    const {id} = params;
    const [studentAttempts, setStudentAttempts] = useState<StudentAttempts[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudentAttempts = async () => {
            try {
                const response = await getStudentAttempts({quiz_id: id});
                const result: StudentAttempts[] = await response.json();
                setStudentAttempts(result);
                setLoading(false);
            } catch (error) {
                console.error('Error occurred:', error);
            }
        };
        fetchStudentAttempts();
    }, [id]);

    return (
        <div className="w-full">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Student Attempts</h1>
            </div>
            <div className="mt-8">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2">Email</th>
                                    <th className="border px-4 py-2">MCQ Marks</th>
                                    <th className="border px-4 py-2">Written Marks</th>
                                    <th className="border px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentAttempts.map((studentAttempt) => (
                                    <tr key={studentAttempt.student_id}>
                                        <td className="border px-4 py-2">{studentAttempt.email}</td>
                                        <td className="border px-4 py-2">{studentAttempt.mcq_marks}</td>
                                        <td className="border px-4 py-2">{studentAttempt.written_marks}</td>
                                        <th className="border px-5 py-5"><Link href={`/lecturer/dashboard/check-written/${studentAttempt.student_id}_${studentAttempt.quiz_id}`} className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded'>View answers</Link></th>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}