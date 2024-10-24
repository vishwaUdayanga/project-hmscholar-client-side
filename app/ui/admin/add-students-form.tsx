'use client'

import { AddStudentsSchemaNew } from "@/app/lib/zod-schema"
import { z } from "zod"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { createStudent } from "@/app/api/admin/create"
import React from "react"

type FormValues = z.infer<typeof AddStudentsSchemaNew>

export default function AddStudent() {
    // const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)
    const [buttonText, setButtonText] = useState("Save & Continue")

    const { control, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
        resolver: zodResolver(AddStudentsSchemaNew),
        mode: 'onTouched',
        defaultValues: {
            email: '',
            password: '',
        }
    });
    
    const onSubmit = async (data: FormValues) => {
        setIsLoading(true)
        setButtonText('Saving announcement...')

        try {
            const response = await createStudent({ email: data.email, password: data.password })
            if (response.ok) {
                setIsLoading(false)
                setButtonText('Save & Continue')
                alert('Student added successfully')
                handleClear()
            } else {
                setIsLoading(false)
                setButtonText('Save & Continue')
                alert('Error occurred while adding student')
            }
        } catch (error) {
            console.error('Error occurred:', error);
            throw error;
        }
        
        // handleAddSection
    }

    const handleClear = () => {
        reset();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-5 flex items-center justify-center flex-col">
            <div className="w-full md:w-8/12">
                <h1 className="text-xl font-semibold">Add Student</h1>
                <p className="text-sm text-slate-500">Enter the details for a new student.</p>
                
                <div className="w-full mt-10">
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
                                            placeholder='e.g. vishwa@gmail.com'
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
                        <label htmlFor="password" className="block mb-1 text-sm sm:text-base">
                            Password
                        </label>
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <div className="flex items-center p-2 border border-zinc-200 rounded-md">
                                        <input
                                            type="text"
                                            id="password"
                                            placeholder='e.g. password123'
                                            className="ml-2 text-black flex-1 outline-none text-sm"
                                            {...field}
                                        />
                                    </div>
                                    {errors.password &&
                                    <div className="flex gap-2 items-center mt-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CD3C16" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                                        </svg>
                                        <p className="text-red-600 text-sm">{errors.password.message}</p>
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
                <button type="submit" className="px-5 py-2 h-fit rounded-md border border-zinc-200 font-bold text-sm">{buttonText}</button>
            </div>
        </form>
    )
}