'use client'

import { useState, useEffect } from 'react';
import { getNewStudents } from '@/app/api/student-portal/new-student/data';
import Link from 'next/link';
import { confirmNewStudent } from '@/app/api/student-portal/new-student/update';

type NewStudent = {
    newStudent_id: string;
    name: string;
    address: string;
    email: string;
    OL_path: string;
    AL_path: string;
    payment_path: string;
    date: string;
    confirmed: boolean;
}

export default function NewStudents({params} : {params: {id: string}}) {
    const {id} = params;

    const [newStudents, setNewStudents] = useState<NewStudent[]>([]);
    const [loading, setLoading] = useState(true);

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchNewStudents = async () => {
            try {
                const response = await getNewStudents({program_id: id});
                const result: NewStudent[] = await response.json();
                setNewStudents(result);
                setLoading(false);
            } catch (error) {
                console.error('Error occurred:', error);
            }
        };
        fetchNewStudents();
    }, [id]);

    const confirmStudent = (newStudent_id: string) => async () => {
        setIsSubmitting(true);
        try {
            const response = await confirmNewStudent({newStudent_id});
            if (response) {
                alert('Student confirmed successfully');
                window.location.reload();
            } else {
                alert('Error occurred while confirming student');
            }
        } catch (error) {
            console.error('Error occurred:', error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="w-full p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">New Students</h1>
            </div>
            <div className="mt-8">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2">Name</th>
                                    <th className="border px-4 py-2">Address</th>
                                    <th className="border px-4 py-2">Email</th>
                                    <th className="border px-4 py-2">OL</th>
                                    <th className="border px-4 py-2">AL</th>
                                    <th className="border px-4 py-2">Payment</th>
                                    <th className="border px-4 py-2">Date</th>
                                    <th className="border px-4 py-2">Confirmed</th>
                                    <th className="border px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {newStudents.map((student) => (
                                    <tr key={student.newStudent_id}>
                                        <td className="border px-4 py-2">{student.name}</td>
                                        <td className="border px-4 py-2">{student.address}</td>
                                        <td className="border px-4 py-2">{student.email}</td>
                                        <td className="border px-4 py-2">
                                            <a href={`${student.OL_path}?sp=r&st=2024-10-17T11:25:27Z&se=2024-10-25T19:25:27Z&spr=https&sv=2022-11-02&sr=c&sig=fIc3B1e2RetRdmyXmNe0NDm%2BHpXM3ddFMwnC9ut1T40%3D`} download className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                                                View
                                            </a>
                                        </td>
                                        <td className="border px-4 py-2">
                                            <a href={`${student.AL_path}?sp=r&st=2024-10-17T11:25:27Z&se=2024-10-25T19:25:27Z&spr=https&sv=2022-11-02&sr=c&sig=fIc3B1e2RetRdmyXmNe0NDm%2BHpXM3ddFMwnC9ut1T40%3D`} download className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                                                View
                                            </a>
                                        </td>
                                        <td className="border px-4 py-2">
                                            <a href={`${student.payment_path}?sp=r&st=2024-10-17T11:25:27Z&se=2024-10-25T19:25:27Z&spr=https&sv=2022-11-02&sr=c&sig=fIc3B1e2RetRdmyXmNe0NDm%2BHpXM3ddFMwnC9ut1T40%3D`} download className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                                                View
                                            </a>
                                        </td>
                                        <td className="border px-4 py-2">{student.date}</td>
                                        <td className="border px-4 py-2">{student.confirmed ? 'Yes' : 'No'}</td>
                                        <td className="border px-5 py-5">
                                            <button className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded' onClick={confirmStudent(student.newStudent_id)} disabled={isSubmitting}>
                                                {
                                                    student.confirmed ? 'Reject' : 'Confirm'
                                                }
                                            </button>
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