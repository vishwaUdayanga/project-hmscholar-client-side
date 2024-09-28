'use client'

import { useEffect, useState } from "react";
import { getLecturerDetails } from "@/app/api/lecturer/data";
import Link from "next/link";
import Image from "next/image";
import { useForm, Controller, FieldError, useFieldArray } from "react-hook-form"
import { EditProfilePictureSchema, EditProfileSchema } from "@/app/lib/zod-schema";
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateLecturerImage, updateLecturer } from "@/app/api/lecturer/update";

type FormValues = z.infer<typeof EditProfilePictureSchema>
type EditFormValues = z.infer<typeof EditProfileSchema>

type Lecturer = {
    lecturer_id: string;
    lecturer_name: string;
    lecturer_nic: string;
    lecturer_phone: string;
    lecturer_email: string;
    lecturer_image: string;
}

export default function Account() {
    const [error, setError] = useState<string | null>(null);
    const [lecturer, setLecturer] = useState<Lecturer | null>(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [ isUploadingDetails, setIsUploadingDetails ] = useState(false);

    const { control, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
        resolver: zodResolver(EditProfilePictureSchema),
        mode: 'onTouched',
        defaultValues: {
            image: null,
        }
    });

    const { control: editControl, handleSubmit: editHandleSubmit, formState: { errors: editErrors }, reset: editReset } = useForm<EditFormValues>({
        resolver: zodResolver(EditProfileSchema),
        mode: 'onTouched',
        defaultValues: {
            lecturer_name: lecturer?.lecturer_name,
            lecturer_nic: lecturer?.lecturer_nic,
            lecturer_phone: lecturer?.lecturer_phone,
            lecturer_email: lecturer?.lecturer_email,
        }
    });

    useEffect(() => {
        const fetchLecturer = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('No token found');
                    window.location.href = 'lecturer/login';
                    return;
                }

                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                const email = decodedToken.sub;

                const lecturerResponse = await getLecturerDetails({ email });
                if (!lecturerResponse) {
                    throw new Error('Failed to fetch lecturer');
                }
                
                const lecturer : Lecturer = await lecturerResponse;
                setLecturer(lecturer);
                editReset(
                    {
                        lecturer_name: lecturer.lecturer_name,
                        lecturer_nic: lecturer.lecturer_nic,
                        lecturer_phone: lecturer.lecturer_phone,
                        lecturer_email: lecturer.lecturer_email,
                    }
                )
            } catch (error) {
                console.error('Error fetching lecturer:', error);
                setError('Error fetching lecturer');
            } finally {
                setLoading(false);
            }
        };

        fetchLecturer();
    }, []);

    const onSubmit = async (data: FormValues) => {
        setIsUploadingImage(true);
        try {
            const image_data = new FormData();
            image_data.append('file', data.image[0]);
            image_data.append('file_path', lecturer?.lecturer_image || '');

            const response = await updateLecturerImage({ lecturer_id: lecturer?.lecturer_id || '', image_data });
            if (!response) {
                throw new Error('Failed to update image');
            }
            setLecturer(response)
            setShowModal(false);
        } catch (error) {
            console.error('Error updating image:', error);
            setError('Error updating image');
        } finally {
            setIsUploadingImage(false);
        }
    }

    const onEditSubmit = async (data: EditFormValues) => {
        setIsUploadingDetails(true);
        try {
            const lecturer_data = new FormData();
            lecturer_data.append('lecturer_name', data.lecturer_name);
            lecturer_data.append('lecturer_nic', data.lecturer_nic);
            lecturer_data.append('lecturer_phone', data.lecturer_phone);
            lecturer_data.append('lecturer_email', data.lecturer_email);
            const response = await updateLecturer({ lecturer_id: lecturer?.lecturer_id || '', lecturer_data });
            if (!response) {
                throw new Error('Failed to update details');
            }
            setLecturer(response);
            setShowEditModal(false);
        } catch (error) {
            console.error('Error updating details:', error);
            setError('Error updating details');
        } finally {
            setIsUploadingDetails(false);
        }
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>No details to show...</p>;

    return (
        <div className="w-full h-[80vh] flex items-center justify-center gap-3 p-4 flex-col">
            <div className="w-full p-4 border rounded-lg border-zinc-200 md:w-1/2 flex items-center gap-5 relative">
                <div
                        className='relative w-20 h-20 rounded-full overflow-hidden'
                    >
                        <Image
                        src={(lecturer?.lecturer_image) ? `${lecturer?.lecturer_image}?sp=r&st=2024-09-28T21:44:46Z&se=2024-10-10T05:44:46Z&spr=https&sv=2022-11-02&sr=c&sig=OW4XAvKoGyoSRPZ7oVaj3ylp%2FpK22jVJypMOawi%2FZOM%3D` : '/dashboard/announcements/user.jpg'}
                        alt="Profile Picture"
                        fill
                        style={{ objectFit: 'cover' }}
                        className="rounded-full"
                        />
                </div>
                <div>
                    <p className="font-bold">{lecturer?.lecturer_name}</p>
                    <p className="mt-1 text-sm text-slate-600">{lecturer?.lecturer_email}</p>
                    <p className="mt-1 text-sm text-slate-600">{lecturer?.lecturer_phone}</p>
                </div>
                <div className="h-fit px-2 py-1 flex items-center justify-center gap-1 border rounded-md border-slate-300 cursor-pointer absolute top-4 right-4" onClick={() => setShowModal(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                    </svg>
                    <p className="text-sm text-slate-600">Edit</p>
                </div>
            </div>
            <div className="w-full p-4 border rounded-lg border-zinc-200 md:w-1/2">
                <div className="w-full flex justify-between">
                    <p className="font-bold mb-6">Personal details</p>
                    <div className="h-fit px-2 py-1 flex items-center justify-center gap-1 border rounded-md border-slate-300 cursor-pointer" onClick={() => setShowEditModal(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                        </svg>
                        <p className="text-sm text-slate-600">Edit</p>
                    </div>
                </div>
                <ul>
                    <li className="w-full flex gap-3 flex-wrap">
                        <p className="text-sm w-72 mb-3 text-slate-600">Name</p>
                        <p className="text-sm ml-3 text-slate-600">{lecturer?.lecturer_name}</p>
                    </li>
                    <li className="w-full flex gap-3 flex-wrap">
                        <p className="text-sm w-72 mb-3 text-slate-600">NIC</p>
                        <p className="text-sm ml-3 text-slate-600">{lecturer?.lecturer_nic}</p>
                    </li>
                    <li className="w-full flex gap-3 flex-wrap">
                        <p className="text-sm w-72 mb-3 text-slate-600">Phone</p>
                        <p className="text-sm ml-3 text-slate-600">{lecturer?.lecturer_phone}</p>
                    </li>
                    <li className="w-full flex gap-3 flex-wrap">
                        <p className="text-sm w-72 text-slate-600">Email</p>
                        <p className="text-sm ml-3 text-slate-600">{lecturer?.lecturer_email}</p>
                    </li>
                </ul>
            </div>
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-md w-96">
                        <h2 className="text-lg font-bold mb-4">Edit Profile Picture</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <Controller
                                    name="image"
                                    control={control}
                                    render={({ field }) => (
                                        <>
                                            <div className="flex items-center p-2 border border-zinc-200 rounded-md">
                                                <input
                                                    type="file"
                                                    id="file"
                                                    className="ml-2 text-black flex-1 outline-none text-sm" outline-none
                                                    onChange={(e) => field.onChange(e.target.files)}
                                                    onBlur={field.onBlur}
                                                    ref={field.ref}
                                                />
                                            </div>
                                            {errors.image &&
                                            <div className="flex gap-2 items-center mt-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CD3C16" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                                                </svg>
                                                <p className="text-red-600 text-sm">{(errors.image as FieldError)?.message || 'An error occurred'}</p>
                                            </div>
                                            }
                                        </>
                                    )}
                                />
                            </div>
                            <div className="mt-4 flex justify-end">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded-md mr-2"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                type="submit"
                            >
                                {isUploadingImage ? 'Uploading...' : 'Save'}
                            </button>
                        </div>
                        </form>
                    </div>
                </div>
            )}
            {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-md w-96">
                        <h2 className="text-lg font-bold mb-4">Edit Profile</h2>
                        <form onSubmit={editHandleSubmit(onEditSubmit)}>
                            <div className="mb-4">
                                <Controller
                                    name="lecturer_name"
                                    control={editControl}
                                    render={({ field }) => (
                                        <>
                                            <input
                                                type="text"
                                                placeholder="Name"
                                                className="w-full p-2 border border-zinc-200 rounded-md outline-none text-sm text-zinc-600"
                                                {...field}
                                            />
                                            {editErrors.lecturer_name &&
                                            <div className="flex gap-2 items-center mt-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CD3C16" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                                                </svg>
                                                <p className="text-red-600 text-sm">{(editErrors.lecturer_name as FieldError)?.message || 'An error occurred'}</p>
                                            </div>
                                            }
                                        </>
                                    )}
                                />
                            </div>
                            <div className="mb-4">
                                <Controller
                                    name="lecturer_nic"
                                    control={editControl}
                                    render={({ field }) => (
                                        <>
                                            <input
                                                type="text"
                                                placeholder="NIC"
                                                className="w-full p-2 border border-zinc-200 rounded-md outline-none text-sm text-zinc-600"
                                                {...field}
                                            />
                                            {editErrors.lecturer_nic &&
                                            <div className="flex gap-2 items-center mt-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CD3C16" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                                                </svg>
                                                <p className="text-red-600 text-sm">{(editErrors.lecturer_nic as FieldError)?.message || 'An error occurred'}</p>
                                            </div>
                                            }
                                        </>
                                    )}
                                />
                            </div>
                            <div className="mb-4">
                                <Controller
                                    name="lecturer_phone"
                                    control={editControl}
                                    render={({ field }) => (
                                        <>
                                            <input
                                                type="text"
                                                placeholder="Phone"
                                                className="w-full p-2 border border-zinc-200 rounded-md outline-none text-sm text-zinc-600"
                                                {...field}
                                            />
                                            {editErrors.lecturer_phone &&
                                            <div className="flex gap-2 items-center mt-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CD3C16" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                                                </svg>
                                                <p className="text-red-600 text-sm">{(editErrors.lecturer_phone as FieldError)?.message || 'An error occurred'}</p>
                                            </div>
                                            }
                                        </>
                                    )}
                                />
                            </div>
                            <div className="mb-4">
                                <Controller
                                    name="lecturer_email"
                                    control={editControl}
                                    render={({ field }) => (
                                        <>
                                            <input
                                                type="email"
                                                placeholder="Email"
                                                className="w-full p-2 border border-zinc-200 rounded-md outline-none text-sm text-zinc-600"
                                                {...field}
                                            />
                                            {editErrors.lecturer_email &&
                                            <div className="flex gap-2 items-center mt-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CD3C16" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                                                </svg>
                                                <p className="text-red-600 text-sm">{(editErrors.lecturer_email as FieldError)?.message || 'An error occurred'}</p>
                                            </div>
                                            }
                                        </>
                                    )}
                                />
                            </div>
                            <div className="mt-4 flex justify-end">
                                <button
                                    className="px-4 py-2 bg-gray-300 rounded-md mr-2"
                                    onClick={() => setShowEditModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                    type="submit"
                                >
                                    {isUploadingDetails ? 'Uploading...' : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )

}