'use client'

import { NewStudentSchema } from "@/app/lib/zod-schema";
import { z } from "zod"
import { useForm, Controller, FieldError, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { enrollStudent } from "@/app/api/student-portal/new-student/create";
import React from "react"

type FormValues = z.infer<typeof NewStudentSchema>

export default function EnrollmentForm({program_id} : {program_id: string}) {

    const [isLoading, setIsLoading] = useState(false)
    const [buttonText, setButtonText] = useState("Save & Continue")

    const { control, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
        resolver: zodResolver(NewStudentSchema),
        mode: 'onTouched',
        defaultValues: {
            name: '',
            address: '',
            email: '',
            OL_doc: null,
            AL_doc: null,
            payment_doc: null
        }
    });

    const onSubmit = async (data: FormValues) => {
        setIsLoading(true)
        setButtonText('Saving student...')

        try {
            const newFormData = new FormData();
            newFormData.append('name', data.name);
            newFormData.append('address', data.address);
            newFormData.append('email', data.email);
            newFormData.append('OL_doc', data.OL_doc[0]);
            newFormData.append('AL_doc', data.AL_doc[0]);
            newFormData.append('payment_doc', data.payment_doc[0]);
            const response = await enrollStudent({ data: newFormData, program_id: program_id });
            if (response) {
                setIsLoading(false)
                setButtonText('Save & Continue')
                alert('Student added successfully')
                handleClear()
                window.location.href = '/student-portal'
            } else {
                setIsLoading(false)
                setButtonText('Save & Continue')
                alert('Error occurred while adding student')
            }
        } catch (error) {
            console.error('Error occurred:', error);
            throw error;
        }
    }

    const handleClear = () => {
        reset();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-5 flex items-center justify-center flex-col">
            <div className="w-full md:w-8/12">
                <h1 className="text-xl font-semibold">Enrollment form</h1>
                <p className="text-sm text-slate-500">Enter your details to enroll for this course</p>
                
                <div className="w-full mt-10">
                    <div className="mb-4">
                        <label htmlFor="name" className="block mb-1 text-sm sm:text-base">
                            Name
                        </label>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <div className="flex items-center p-2 border border-zinc-200 rounded-md">
                                        <input
                                            type="text"
                                            id="name"
                                            placeholder='e.g. John Doe'
                                            className="ml-2 text-black flex-1 outline-none text-sm"
                                            {...field}
                                        />
                                    </div>
                                    {errors.name &&
                                    <div className="flex gap-2 items-center mt-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CD3C16" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                                        </svg>
                                        <p className="text-red-600 text-sm">{errors.name.message}</p>
                                    </div>
                                    }
                                </>
                            )}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block mb-1 text-sm sm:text-base">
                            Address
                        </label>
                        <Controller
                            name="address"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <div className="flex items-center p-2 border border-zinc-200 rounded-md">
                                        <input
                                            type="text"
                                            id="address"
                                            placeholder='e.g. Colombo 07'
                                            className="ml-2 text-black flex-1 outline-none text-sm"
                                            {...field}
                                        />
                                    </div>
                                    {errors.address &&
                                    <div className="flex gap-2 items-center mt-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CD3C16" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                                        </svg>
                                        <p className="text-red-600 text-sm">{errors.address.message}</p>
                                    </div>
                                    }
                                </>
                            )}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-1 text-sm sm:text-base">
                            Email
                        </label>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <div className="flex items-center p-2 border border-zinc-200 rounded-md">
                                        <input
                                            type="text"
                                            id="email"
                                            placeholder='e.g. test@gmail.com'
                                            className="ml-2 text-black flex-1 outline-none text-sm"
                                            {...field}
                                        />
                                    </div>
                                    {errors.email &&
                                    <div className="flex gap-2 items-center mt-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CD3C16" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                                        </svg>
                                        <p className="text-red-600 text-sm">{errors.email.message}</p>
                                    </div>
                                    }
                                </>
                            )}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="OL_doc" className="block mb-1 text-sm sm:text-base">
                            OL Document
                        </label>
                        <Controller
                            name="OL_doc"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <div className="flex items-center p-2 border border-zinc-200 rounded-md">
                                        <input
                                            type="file"
                                            id="OL_doc"
                                            className="ml-2 text-black flex-1 outline-none text-sm"
                                            onChange={(e) => field.onChange(e.target.files)}
                                            onBlur={field.onBlur}
                                        />
                                    </div>
                                    {errors.OL_doc &&
                                    <div className="flex gap-2 items-center mt-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CD3C16" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                                        </svg>
                                        <p className="text-red-600 text-sm">{(errors.OL_doc as FieldError)?.message || 'An error occurred'}</p>
                                    </div>
                                    }
                                </>
                            )}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="AL_doc" className="block mb-1 text-sm sm:text-base">
                            AL Document
                        </label>
                        <Controller
                            name="AL_doc"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <div className="flex items-center p-2 border border-zinc-200 rounded-md">
                                        <input
                                            type="file"
                                            id="AL_doc"
                                            className="ml-2 text-black flex-1 outline-none text-sm"
                                            onChange={(e) => field.onChange(e.target.files)}
                                            onBlur={field.onBlur}
                                        />
                                    </div>
                                    {errors.AL_doc &&
                                    <div className="flex gap-2 items-center mt-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CD3C16" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                                        </svg>
                                        <p className="text-red-600 text-sm">{(errors.AL_doc as FieldError)?.message || 'An error occurred'}</p>
                                    </div>
                                    }
                                </>
                            )}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="payment_doc" className="block mb-1 text-sm sm:text-base">
                            Payment Document
                        </label>
                        <Controller
                            name="payment_doc"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <div className="flex items-center p-2 border border-zinc-200 rounded-md">
                                        <input
                                            type="file"
                                            id="payment_doc"
                                            className="ml-2 text-black flex-1 outline-none text-sm"
                                            onChange={(e) => field.onChange(e.target.files)}
                                            onBlur={field.onBlur}
                                        />
                                    </div>
                                    {errors.payment_doc &&
                                    <div className="flex gap-2 items-center mt-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CD3C16" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                                        </svg>
                                        <p className="text-red-600 text-sm">{(errors.payment_doc as FieldError)?.message || 'An error occurred'}</p>
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
    )  
}