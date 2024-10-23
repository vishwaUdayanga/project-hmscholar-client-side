'use client'

import { useState, useEffect } from 'react';
import { getCurrentStudentPayments } from '@/app/api/student-portal/new-student/data';
import Link from 'next/link';
import { confirmCurrentStudentPayment } from '@/app/api/student-portal/new-student/update';

type CurrentStudentPayments = {
    payment_id: string;
    email: string;
    date : string;
    receipt_path: string;
    confirmed: boolean;
}

export default function CurrentStudentPayments() {
    const [currentStudentPayments, setCurrentStudentPayments] = useState<CurrentStudentPayments[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchCurrentStudentPayments = async () => {
            try {
                const response = await getCurrentStudentPayments();
                const result: CurrentStudentPayments[] = await response.json();
                setCurrentStudentPayments(result);
                setLoading(false);
            } catch (error) {
                console.error('Error occurred:', error);
            }
        };
        fetchCurrentStudentPayments();
    }, []);

    const confirmPayment = (payment_id: string) => async () => {
        setIsSubmitting(true);
        try {
            const response = await confirmCurrentStudentPayment({payment_id});
            if (response) {
                alert('Payment confirmed successfully');
                window.location.reload();
            } else {
                alert('Error occurred while confirming payment');
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
                <h1 className="text-2xl font-bold">Current Student Payments</h1>
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
                                    <th className="border px-4 py-2">Date</th>
                                    <th className="border px-4 py-2">Receipt</th>
                                    <th className="border px-4 py-2">Confirmed</th>
                                    <th className="border px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentStudentPayments.map((payment) => (
                                    <tr key={payment.payment_id}>
                                        <td className="border px-4 py-2">{payment.email}</td>
                                        <td className="border px-4 py-2">{payment.date}</td>
                                        <td className="border px-4 py-2">
                                            <a href={`${payment.receipt_path}?sp=r&st=2024-10-17T11:25:27Z&se=2024-10-25T19:25:27Z&spr=https&sv=2022-11-02&sr=c&sig=fIc3B1e2RetRdmyXmNe0NDm%2BHpXM3ddFMwnC9ut1T40%3D`} download className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                                                View
                                            </a>
                                        </td>
                                        <td className="border px-4 py-2">{payment.confirmed ? 'Yes' : 'No'}</td>
                                        <td className="border px-5 py-5">
                                            <button className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded'disabled={isSubmitting} onClick={confirmPayment(payment.payment_id)}>
                                                {
                                                    payment.confirmed ? 'Reject' : 'Confirm'
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