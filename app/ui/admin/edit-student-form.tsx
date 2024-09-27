'use client'

import { AddStudentsSchema } from "@/app/lib/zod-schema"
import { z } from "zod"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { getStudent } from "@/app/api/admin/data"
import { updateStudent } from "@/app/api/admin/update"


type FormValues = z.infer<typeof AddStudentsSchema>

type Student = {
    email: string;
    password: string;
}

export default function EditStudentForm({student_id}: {student_id: string}) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [section, setSection] = useState<Student>();
    useEffect(() => {
        const fetchSection = async () => {
            try {

                const studentResponse = await getStudent({ studentId: student_id });
                if (!studentResponse.ok) {
                    throw new Error('Failed to fetch lecturer');
                }
                const student: Student = await studentResponse.json();
                setSection(section);
                reset({
                    email: student.email,
                    password: student.password
                });
            } catch (error) {
                console.error('Error fetching students:', error);
                setError('Error fetching students');
            } finally {
                setLoading(false);
            }
        };

        fetchSection();
    }, []);

    const [isLoading, setIsLoading] = useState(false)
    const [buttonText, setButtonText] = useState("Save Changes")

    const { control, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
        resolver: zodResolver(AddStudentsSchema),
        mode: 'onTouched',
        defaultValues: {
            email: '',
            password: ''
        }
    });
    
    const onSubmit = async (data: FormValues) => {
        setIsLoading(true)
        setButtonText('Saving section...')

        try {
            const response = await updateStudent({ student_id, email: data.email, password: data.password });
            if (response.ok) {
                setIsLoading(false)
                setButtonText('Save Changes')
                alert('Student updated successfully')
                handleClear()
                window.location.href = `/admin/dashboard/students`
            } else {
                setIsLoading(false)
                setButtonText('Save Changes')
                alert('Error occurred while updating student')
            }
        } catch (error) {
            console.error('Error occurred:', error);
            throw error;
        }
    }

    const handleClear = () => {
        reset();
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

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