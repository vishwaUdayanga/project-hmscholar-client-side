'use client'

import { useState, useEffect } from 'react';
import { getWrittenAnswers } from '@/app/api/lecturer/data';
import Link from 'next/link';
import { updateWrittenAnswers } from '@/app/api/lecturer/update';

type WrittenAnswers = {
    question_id: string;
    question: string;
    answer: string;
    marks: number;
}

export default function WrittenAnswersForm({student_id, quiz_id} : {student_id: string, quiz_id: string}) {
    const [writtenAnswers, setWrittenAnswers] = useState<WrittenAnswers[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [buttonText, setButtonText] = useState("Submit");

    useEffect(() => {
        const fetchWrittenAnswers = async () => {
            try {
                const response = await getWrittenAnswers({student_id, quiz_id});
                const result: WrittenAnswers[] = await response.json();
                setWrittenAnswers(result);
                setLoading(false);
            } catch (error) {
                console.error('Error occurred:', error);
            }
        };
        fetchWrittenAnswers();
    }, [student_id, quiz_id]);

    const changeMark = (question_id: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newWrittenAnswers = writtenAnswers.map((answer) => {
            if (answer.question_id === question_id) {
                return {
                    ...answer,
                    marks: parseInt(event.target.value),
                }
            }
            return answer
        })
        setWrittenAnswers(newWrittenAnswers)
    }

    useEffect(() => {
        console.log(writtenAnswers)
    }
    , [writtenAnswers])

    useEffect(() => {
        if (isSubmitting) {
            setButtonText("Submitting...")

            const submitWrittenAnswers = async () => {
                try {
                    const response = await updateWrittenAnswers({ student_id: student_id, quiz_id: quiz_id, written_answers: writtenAnswers });
                    if (response) {
                        alert('Written answers updated successfully')
                    } else {
                        alert('Error occurred while updating written answers')
                    }
                } catch (error) {
                    console.error('Error occurred:', error);
                    throw error;
                }
                finally {
                    setIsSubmitting(false)
                    setButtonText("Submit")
                }
            }

            submitWrittenAnswers()
        }
    }, [isSubmitting])

    return (
        <div className="w-full">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Written Answers</h1>
            </div>
            <div className="mt-8">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2">Question</th>
                                    <th className="border px-4 py-2">Answer</th>
                                    <th className="border px-4 py-2">Marks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {writtenAnswers.map((answer) => (
                                    <tr key={answer.question_id}>
                                        <td className="border px-4 py-2">{answer.question}</td>
                                        <td className="border px-4 py-2">{answer.answer}</td>
                                        <td className="border px-4 py-2">
                                            <input type="number" defaultValue={answer.marks} onChange={changeMark(answer.question_id)} className='outline-none'/>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mt-4" onClick={() => setIsSubmitting(true)} disabled={isSubmitting}>{buttonText}</button>
                    </div>
                )}
            </div>
        </div>
    )
}