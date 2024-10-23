'use client'

import { EditCourseSchema } from "@/app/lib/zod-schema" 
import { useState, useEffect } from "react"
import { Controller, FieldError, useForm } from "react-hook-form"
import { getCourseSettings } from "@/app/api/lecturer/data"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateCourseLecturer } from "@/app/api/lecturer/update"
import React from "react"

type FormValues = z.infer<typeof EditCourseSchema>

type CourseSettings = {
    course_id: string;
    course_name: string;
    enrollment_key: string;
    course_image: string | null;
}
export default function CourseSettings({course_id} : {course_id: string}) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [courseSettings, setCourseSettings] = useState<CourseSettings | null>(null);

    const [loading, setLoading] = useState(false)
    const [buttonText, setButtonText] = useState("Save Changes")

    const { control, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
        resolver: zodResolver(EditCourseSchema),
        mode: 'onTouched',
        defaultValues: {
            course_name: '',
            enrollment_key: '',
            course_description: '',
            course_image: null
        }
    });
    
    const onSubmit = async (data: FormValues) => {
        setLoading(true)
        setButtonText('Saving course...')

        try {
            const newFormData = new FormData();
            newFormData.append('course_name', data.course_name);
            newFormData.append('enrollment_key', data.enrollment_key);
            newFormData.append('course_description', data.course_description);
            newFormData.append('course_image', courseSettings?.course_image || '');

            if (data.course_image) {
                newFormData.append('file', data.course_image[0]);
            }
            
            const response = await updateCourseLecturer({ course_id: course_id, data: newFormData });

            if (!response) {
                throw new Error('Failed to update details');
            }
            setIsLoading(false)
            setButtonText('Save Changes')
            alert('Course updated successfully')
            handleClear()
            window.location.href = `/lecturer/dashboard/view-course/${course_id}`
        } catch (error) {
            console.error('Error occurred:', error);
            throw error;
        }
    }

    const handleClear = () => {
        reset();
    }

    useEffect(() => {
        const fetchCourseSettings = async () => {
            try {
                const courseSettingsResponse = await getCourseSettings({ course_id: course_id });
                if (!courseSettingsResponse.ok) {
                    throw new Error('Failed to fetch course settings');
                }
                const courseSettingsData = await courseSettingsResponse.json();
                setCourseSettings(courseSettingsData);
                reset({
                    course_name: courseSettingsData.course_name,
                    enrollment_key: courseSettingsData.enrollment_key,
                    course_description: courseSettingsData.course_description
                })
            } catch (error) {
                console.error('Error occurred:', error);
                setError('Error fetching course settings');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourseSettings();
    }, [course_id, reset]);

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>{error}</p>
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-5 flex items-center justify-center flex-col p-4">
            <div className="w-full md:w-8/12">
                <h1 className="text-xl font-semibold">Edit the Course</h1>
                <p className="text-sm text-slate-500">Enter new changes</p>
                
                <div className="w-full mt-10">
                    <div className="mb-4">
                        <div className="flex mt-3 gap-3 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#6CBE65" className="bi bi-cloud-download" viewBox="0 0 16 16">
                                <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383"/>
                                <path d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708z"/>
                            </svg>
                            <a href={`${courseSettings?.course_image}?sp=r&st=2024-10-11T03:23:52Z&se=2024-10-26T11:23:52Z&spr=https&sv=2022-11-02&sr=c&sig=j9bm0r%2F1ublueF5hAeTTja5w7EUdkalfzZo%2BNw0zzZM%3D`} download className="text-blue-500 underline text-sm">
                                View the file
                            </a>
                        </div>
                        <label htmlFor="file" className="block mb-1 text-sm sm:text-base">
                            Upload a new cover image
                        </label>
                        <Controller
                            name="course_image"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <div className="flex items-center p-2 border rounded-md">
                                        <input
                                            type="file"
                                            id="file"
                                            className="ml-2 text-black flex-1 outline-none text-sm"
                                            onChange={(e) => field.onChange(e.target.files)}
                                            onBlur={field.onBlur}
                                            ref={field.ref}
                                        />
                                    </div>
                                    {errors.course_image &&
                                    <div className="flex gap-2 items-center mt-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CD3C16" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                                        </svg>
                                        <p className="text-red-600 text-sm">{(errors.course_image as FieldError)?.message || 'An error occurred'}</p>
                                    </div>
                                    }
                                </>
                            )}
                        />
                        <label htmlFor="course_name" className="block mb-1 text-sm sm:text-base mt-4">
                            Course Name
                        </label>
                        <Controller
                            name="course_name"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <div className="flex items-center p-2 border border-zinc-200 rounded-md">
                                        <input
                                            type="text"
                                            id="course_name"
                                            placeholder='e.g. Week1'
                                            className="ml-2 text-black flex-1 outline-none text-sm"
                                            {...field}
                                        />
                                    </div>
                                    {errors.course_name &&
                                    <div className="flex gap-2 items-center mt-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CD3C16" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                                        </svg>
                                        <p className="text-red-600 text-sm">{errors.course_name.message}</p>
                                    </div>
                                    }
                                </>
                            )}
                        />

                        <label htmlFor="enrollment_key" className="block mb-1 text-sm sm:text-base mt-4">
                            Enrollment Key
                        </label>
                        <Controller
                            name="enrollment_key"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <div className="flex items-center p-2 border border-zinc-200 rounded-md">
                                        <input
                                            type="text"
                                            id="enrollment_key"
                                            placeholder='e.g. Week1'
                                            className="ml-2 text-black flex-1 outline-none text-sm"
                                            {...field}
                                        />
                                    </div>
                                    {errors.enrollment_key &&
                                    <div className="flex gap-2 items-center mt-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CD3C16" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                                        </svg>
                                        <p className="text-red-600 text-sm">{errors.enrollment_key.message}</p>
                                    </div>
                                    }
                                </>
                            )}
                        />

                        <label htmlFor="course_description" className="block mb-1 text-sm sm:text-base mt-4">
                            Course Description
                        </label>
                        <Controller
                            name="course_description"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <div className="flex items-center border border-zinc-200 rounded-md flex-col h-48">
                                        <div className="flex border-b border-zinc-200 gap-4 w-full p-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="cursor-pointer bi bi-type-bold" viewBox="0 0 16 16">
                                                <path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z"/>
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="cursor-pointer bi bi-type-italic" viewBox="0 0 16 16">
                                                <path d="M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z"/>
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="cursor-pointer bi bi-type-underline" viewBox="0 0 16 16">
                                                <path d="M5.313 3.136h-1.23V9.54c0 2.105 1.47 3.623 3.917 3.623s3.917-1.518 3.917-3.623V3.136h-1.23v6.323c0 1.49-.978 2.57-2.687 2.57s-2.687-1.08-2.687-2.57zM12.5 15h-9v-1h9z"/>
                                            </svg>
                                        </div>
                                        <textarea
                                            rows={5}
                                            id="course_description"
                                            placeholder="Enter description"
                                            className=" text-black outline-none text-sm w-full p-2 rounded-md block h-48 resize-none"
                                            {...field}
                                        />
                                    </div>
                                    {errors.course_description &&
                                    <div className="flex gap-2 items-center mt-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CD3C16" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                                        </svg>
                                        <p className="text-red-600 text-sm">{errors.course_description.message}</p>
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
                <div className="flex gap-2 items-center">
                    <button 
                        type="submit" 
                        className="px-5 py-2 h-fit rounded-md border border-zinc-200 font-bold text-sm"
                        disabled={isLoading}
                        >
                            {buttonText}
                    </button>
                </div>
            </div>
        </form>
    )
}