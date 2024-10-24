'use client'

import { AddAdminAnnouncementSchema } from "@/app/lib/zod-schema"
import { z } from "zod"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { getAdminAnnouncements } from "@/app/api/admin/data"
import { getAdminAnnouncement } from "@/app/api/admin/data"
import { updateAdminAnnouncement } from "@/app/api/admin/update"
import { announcements } from "@/app/lib/placeholders"
import AdminAnnouncements from "./admin-announcements"
import { get } from "http"

type FormValues = z.infer<typeof AddAdminAnnouncementSchema>

type Announcement = {
    announcement_id: string;
    title: string;
    description: string;
    admin_id: string;
};

export default function EditAdminAnnouncementForm({ announcement_id }: { announcement_id: string }) {
    const id = announcement_id
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [announcement, setAnnouncement] = useState<Announcement>();
    


    const [isLoading, setIsLoading] = useState(false)
    const [buttonText, setButtonText] = useState("Save Changes")

    const { control, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
        resolver: zodResolver(AddAdminAnnouncementSchema),
        mode: 'onTouched',
        defaultValues: {
            title: '',
            description: ''
        }
    });

    useEffect(() => {
        const fetchAnnouncement = async () => {
            try {

                const announcementResponse = await getAdminAnnouncement({ announcement_id: id });
                if (!announcementResponse.ok) {
                    throw new Error('Failed to fetch announcement');
                }
                const announcement: Announcement = await announcementResponse.json();
                setAnnouncement(announcement);
                reset({
                    title: announcement.title,
                    description: announcement.description
                });
            } catch (error) {
                console.error('Error fetching announcement:', error);
                setError('Error fetching announcement');
            } finally {
                setLoading(false);
            }
        };

        fetchAnnouncement();
    }, [id, reset]);

    const onSubmit = async (data: FormValues) => {
        setIsLoading(true)
        setButtonText('Saving announcement...')

        

        try {
            const response = await updateAdminAnnouncement({
                announcement_id: announcement_id,
                title: data.title,
                description: data.description
            });
            if (response.ok) {
                setIsLoading(false)
                setButtonText('Save Changes')
                alert('Announcement updated successfully')
                handleClear()
                window.location.href = '/admin/dashboard/manage-content'
            } else {
                setIsLoading(false)
                setButtonText('Save Changes')
                alert('Error occurred while updating announcement')
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
                <h1 className="text-xl font-semibold">Add Announcement</h1>
                <p className="text-sm text-slate-500">Enter the details that needs to be appeared in a new announcement.</p>
                
                <div className="w-full mt-10">
                    <div className="mb-4">
                        <label htmlFor="title" className="block mb-1 text-sm sm:text-base">
                            Announcement Title
                        </label>
                        <Controller
                            name="title"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <div className="flex items-center p-2 border border-zinc-200 rounded-md">
                                        <input
                                            type="text"
                                            id="title"
                                            placeholder='e.g. Exam schedule'
                                            className="ml-2 text-black flex-1 outline-none text-sm"
                                            {...field}
                                        />
                                    </div>
                                    {errors.title &&
                                    <div className="flex gap-2 items-center mt-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CD3C16" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                                        </svg>
                                        <p className="text-red-600 text-sm">{errors.title.message}</p>
                                    </div>
                                    }
                                </>
                            )}
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="description" className="block mb-1 text-sm sm:text-base">
                            Announcement Description
                        </label>
                        <Controller
                            name="description"
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
                                    {errors.description &&
                                    <div className="flex gap-2 items-center mt-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CD3C16" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                                        </svg>
                                        <p className="text-red-600 text-sm">{errors.description.message}</p>
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