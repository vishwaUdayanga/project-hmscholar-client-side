'use client'

import { EditMaterialSchema } from "@/app/lib/zod-schema"
import { z } from "zod"
import { useForm, Controller, useFieldArray, FieldError } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { getMaterial } from "@/app/api/lecturer/data"
import { updateMaterial } from "@/app/api/lecturer/update"
import { deleteMaterial } from "@/app/api/lecturer/delete"
import React from "react"


type FormValues = z.infer<typeof EditMaterialSchema>

type Material = {
    material_name: string;
    material_path: string;
};

export default function EditMaterialForm({material_id}: {material_id: string}) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [material, setMaterial] = useState<Material>();
    useEffect(() => {
        const fetchMaterial = async () => {
            try {

                const materialResponse = await getMaterial({ material_id: material_id });
                if (!materialResponse.ok) {
                    throw new Error('Failed to fetch material');
                }
                const material: Material = await materialResponse.json();
                setMaterial(material);
                reset({
                    material_name: material.material_name,
                });
            } catch (error) {
                console.error('Error fetching material:', error);
                setError('Error fetching material');
            } finally {
                setLoading(false);
            }
        };

        fetchMaterial();
    }, []);

    const [isLoading, setIsLoading] = useState(false)
    const [buttonText, setButtonText] = useState("Save Changes")

    const [isLoadingDelete, setIsLoadingDelete] = useState(false)
    const [buttonTextDelete, setButtonTextDelete] = useState("Delete Material")
    const [submissionType, setSubmissionType] = useState<string | null>(null)

    const { control, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
        resolver: zodResolver(EditMaterialSchema),
        mode: 'onTouched',
        defaultValues: {
            material_name: '',
            file: undefined
        }
    });
    
    const onSubmit = async (data: FormValues) => {
        if (submissionType === 'edit') {

            setIsLoading(true)
            setButtonText('Saving changes...')

            try {
                const newFormData = new FormData();
                newFormData.append('material_name', data.material_name);
                if (material?.material_path) {
                    newFormData.append('material_path', material.material_path);
                } else {
                    console.error('Material path is undefined');
                }
                if (data.file) {
                    newFormData.append('file', data.file[0]);
                }
                const response = await updateMaterial({ material_id: material_id, material_data: newFormData });
                if (response) {
                    setIsLoading(false)
                    setButtonText('Save Changes')
                    alert('Material updated successfully')
                    handleClear()
                    window.location.href = `/lecturer/dashboard/edit-material/${material_id}`
                } else {
                    setIsLoading(false)
                    setButtonText('Save Changes')
                    alert('Error occurred while updating the material')
                }
            } catch (error) {
                console.error('Error occurred:', error);
                throw error;
            }
        } else {
            setIsLoadingDelete(true)
            setButtonTextDelete('Deleting material...')

            try {
                const response = await deleteMaterial({ material_id: material_id, material_path: material?.material_path });
                if (response) {
                    setIsLoadingDelete(false)
                    setButtonTextDelete('Delete Material')
                    alert('Material deleted successfully')
                    window.location.href = `/lecturer/dashboard/edit-material/${material_id}`
                } else {
                    setIsLoadingDelete(false)
                    setButtonTextDelete('Delete Material')
                    alert('Error occurred while deleting the material')
                }
            } catch (error) {
                console.error('Error occurred:', error);
                throw error;
            }
        }
    }

    const handleClear = () => {
        reset();
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-5 flex items-center justify-center flex-col p-4">
            <div className="w-full md:w-8/12">
                <h1 className="text-xl font-semibold">Edit material</h1>
                <p className="text-sm text-slate-500">Edit the material</p>
                
                <div className="w-full mt-10">
                    <div className="mb-4">
                        <div className="flex mt-3 gap-3 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#6CBE65" className="bi bi-cloud-download" viewBox="0 0 16 16">
                                <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383"/>
                                <path d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708z"/>
                            </svg>
                            <a href={`${material?.material_path}?sp=r&st=2024-09-28T09:10:47Z&se=2024-10-10T17:10:47Z&spr=https&sv=2022-11-02&sr=c&sig=vUJds%2F0fV4LsaJf7pWI4I8OmrugoP5474viD4oKPHYI%3D`} download className="text-blue-500 underline text-sm">
                                View the file
                            </a>
                        </div>
                        <label htmlFor="file" className="block mb-1 text-sm sm:text-base">
                            Upload a new one
                        </label>
                        <Controller
                            name="file"
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
                                    {errors.file &&
                                    <div className="flex gap-2 items-center mt-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CD3C16" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                                        </svg>
                                        <p className="text-red-600 text-sm">{(errors.file as FieldError)?.message || 'An error occurred'}</p>
                                    </div>
                                    }
                                </>
                            )}
                        />
                        <label htmlFor="material_name" className="block mb-1 text-sm sm:text-base">
                            Material name
                        </label>
                        <Controller
                            name="material_name"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <div className="flex items-center p-2 border border-zinc-200 rounded-md">
                                        <input
                                            type="text"
                                            id="material_name"
                                            placeholder='e.g. Week1'
                                            className="ml-2 text-black flex-1 outline-none text-sm"
                                            {...field}
                                        />
                                    </div>
                                    {errors.material_name &&
                                    <div className="flex gap-2 items-center mt-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CD3C16" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                                        </svg>
                                        <p className="text-red-600 text-sm">{errors.material_name.message}</p>
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
                        onClick={() => setSubmissionType('delete')}
                        className="px-5 py-2 h-fit rounded-md border border-red-500 font-bold text-sm"
                        disabled={isLoadingDelete}
                        >
                            {buttonTextDelete}
                    </button>
                    <button 
                        type="submit" 
                        onClick={() => setSubmissionType('edit')}
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