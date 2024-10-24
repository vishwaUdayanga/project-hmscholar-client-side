'use client'

import { PaymentUploadSchema } from "@/app/lib/zod-schema";
import { z } from "zod"
import { useForm, Controller, FieldError, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { use, useEffect, useState } from "react"
import { registerCurrentStudent } from "@/app/api/student-portal/new-student/create";
import React from "react"
import { getStudentDetails, getPaymentDetailsById } from "@/app/api/student-portal/new-student/data";
import Lottie from 'lottie-react';
import InProgressAnim from '../../../public/animations/in-progress.json';
import Confirmed from '../../../public/animations/confirmed.json';
import Image from 'next/image';

type FormValues = z.infer<typeof PaymentUploadSchema>

type Student = {
    student_id: string,
    name: string,
    email: string,
}

type Payment = {
    payment_id: string,
    confirmed: boolean
}

export default function CurrentStudentForm() {
    const [student, setStudent] = useState<Student>({student_id: '', name: '', email: ''})
    const [loading, setLoading] = useState(false)

    const [isLoading, setIsLoading] = useState(false)
    const [buttonText, setButtonText] = useState("Save & Continue")

    const [payment, setPayment] = useState<Payment>({payment_id: '', confirmed: false})

    const { control, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
        resolver: zodResolver(PaymentUploadSchema),
        mode: 'onTouched',
        defaultValues: {
            receipt_doc: null
        }
    });

    const onSubmit = async (data: FormValues) => {
        setIsLoading(true)
        setButtonText('Uploading receipt...')

        try {
            const newFormData = new FormData();
            newFormData.append('receipt_doc', data.receipt_doc[0]);
            newFormData.append('student_id', student.student_id);
            const response = await registerCurrentStudent({ data: newFormData, student_id: student.student_id });
            if (response) {
                setIsLoading(false)
                setButtonText('Save & Continue')
                alert('Registered to the semester successfully')
                handleClear()
                window.location.href = '/'
            } else {
                setIsLoading(false)
                setButtonText('Save & Continue')
                alert('Error occurred while uploading receipt')
            }
        } catch (error) {
            console.error('Error occurred:', error);
            throw error;
        }
    }

    const handleClear = () => {
        reset()
    }

    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.log('No token found');
            } else {
                try {
                    const decodedToken = JSON.parse(atob(token.split('.')[1]));
                    const email = decodedToken.sub;
                    if (email) {

                        const response = await getStudentDetails({email});
                        const result: Student = await response.json();
                        
                        setStudent(result);
                        setLoading(false);
                    } else {
                        console.error('Email is undefined');
                    }
                } catch (error) {
                    console.error('Error decoding token:', error);
                    localStorage.removeItem('token');
                }
            }
        };
        verifyToken();
        
    }, [])

    useEffect(() => {
        const fetchPaymentDetails = async () => {
            if (student.student_id) {
                const response = await getPaymentDetailsById({ student_id: student.student_id });
                const result = await response.json();
                if (result) {
                    reset();
                    setPayment(result);
                }
            }
        };

        if (!loading && student.student_id) { 
            fetchPaymentDetails();
        }
    }, [student.student_id, loading]);

    useEffect(() => {
        console.log(payment);
    }, [payment]);

    if (loading) {
        return <h1>Loading...</h1>
    }

    // If payment is confirmed print a message saying your payment has been confirmed
    if (payment && payment.confirmed) {
        return (
            <div className="p-4 w-full h-[80vh] flex items-center justify-center flex-col gap-3 text-center">
                <div className='w-96'>
                    <Lottie animationData={Confirmed} loop={true} />
                </div>
                <div className="w-full md:w-1/2">
                    <h1 className="text-2xl font-bold">Your payment has been confirmed</h1>
                    <p className="text-sm text-slate-500">You can now login to the LMS and register for courses.</p> 
                </div>  
            </div>
        )
    } 

    if (payment && payment.payment_id && payment.confirmed === false) {
        return (
            <div className="p-4 w-full h-[80vh] flex items-center justify-center flex-col gap-3 text-center">
                <div className='w-96'>
                    <Lottie animationData={InProgressAnim} loop={true} />
                </div>
                <div className="w-full md:w-1/2">
                    <h1 className="text-2xl font-bold">Your payment is in progress</h1>
                    <p className="text-sm text-slate-500">Please wait for the admin to confirm your payment.</p>
                </div>
            </div>
        )
    } 

    return (
        <div className="flex gap-2 items-center">
            <div className="w-full md:w-1/2">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-5 flex items-center justify-center flex-col p-4">
                    <div className="w-full md:w-8/12">
                        <h1 className="text-xl font-semibold">Enrollment form</h1>
                        <p className="text-sm text-slate-500">Make sure to ensure the detail validity and upload the payment receipt to register to the next semester.</p>
                        
                        <div className="w-full mt-10">
                            <div className="mb-4">
                                <label htmlFor="name" className="block mb-1 text-sm sm:text-base">
                                    Name
                                </label>
                                <div className="flex items-center p-2 border border-zinc-200 rounded-md">
                                    <p className="ml-2 text-black flex-1 outline-none text-sm">{student.name}</p>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="name" className="block mb-1 text-sm sm:text-base">
                                    Email
                                </label>
                                <div className="flex items-center p-2 border border-zinc-200 rounded-md">
                                    <p className="ml-2 text-black flex-1 outline-none text-sm">{student.email}</p>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="name" className="block mb-1 text-sm sm:text-base">
                                    Year
                                </label>
                                <div className="flex items-center p-2 border border-zinc-200 rounded-md">
                                    <p className="ml-2 text-black flex-1 outline-none text-sm">Year 1</p>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="name" className="block mb-1 text-sm sm:text-base">
                                    Semester
                                </label>
                                <div className="flex items-center p-2 border border-zinc-200 rounded-md">
                                    <p className="ml-2 text-black flex-1 outline-none text-sm">Semester 2</p>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="receipt_doc" className="block mb-1 text-sm sm:text-base">
                                    Payment Receipt
                                </label>
                                <Controller
                                    name="receipt_doc"
                                    control={control}
                                    render={({ field }) => (
                                        <>
                                            <div className="flex items-center p-2 border border-zinc-200 rounded-md">
                                                <input
                                                    type="file"
                                                    id="receipt_doc"
                                                    className="ml-2 text-black flex-1 outline-none text-sm"
                                                    onChange={(e) => field.onChange(e.target.files)}
                                                    onBlur={field.onBlur}
                                                />
                                            </div>
                                            {errors.receipt_doc &&
                                            <div className="flex gap-2 items-center mt-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CD3C16" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                                                </svg>
                                                <p className="text-red-600 text-sm">{(errors.receipt_doc as FieldError)?.message || 'An error occurred'}</p>
                                            </div>
                                            }
                                        </>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="border-t-2 border-zinc-100 pt-5 flex justify-between w-full mt-10">
                        <button className="px-5 py-2 h-fit border rounded-md border-zinc-200 font-bold text-sm" type="button" onClick={handleClear}>Clear</button>
                        <button 
                            type="submit"
                            className="px-5 py-2 h-fit rounded-md border border-zinc-200 font-bold text-sm"
                            disabled={isLoading}
                            >
                                {buttonText}
                        </button>
                    </div>
                </form>
            </div>
            <div className="hidden w-1/2 md:block">
                <Image src="/portal/main/form.jpg" alt="Right Animation" width={500} height={500} />
            </div>
        </div>
    )
}