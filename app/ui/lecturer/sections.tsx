'use client'

import { useEffect, useState } from "react";
import { getSections } from "@/app/api/lecturer/data";
import Link from "next/link";
import { deleteSection } from "@/app/api/lecturer/delete";

type Material = {
    material_name: string;
    material_path: string;
};

type Section = {
    section_id: string;
    section_name: string;
    section_description: string;
    materials: Material[];
};

export default function Sections({course_id} : {course_id: string}) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sections, setSections] = useState<Section[]>([]);
    useEffect(() => {
        const fetchSections = async () => {
            try {

                const sectionsResponse = await getSections({ courseId: course_id });
                if (!sectionsResponse.ok) {
                    throw new Error('Failed to fetch sections');
                }
                const sections: Section[] = await sectionsResponse.json();
                setSections(sections);
            } catch (error) {
                console.error('Error fetching courses:', error);
                setError('Error fetching courses');
            } finally {
                setLoading(false);
            }
        };

        fetchSections();
    }, []);

    const handleDelete = async (section_id: string) => {
        try {
            const response = await deleteSection({ section_id });
            if (!response.ok) {
                throw new Error('Failed to delete section');
            }
            setSections(sections.filter(section => section.section_id !== section_id));
        } catch (error) {
            console.error('Error deleting section:', error);
            setError('Error deleting section');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="w-full px-4 pt-0 pb-4">
            {sections.map((section) => {
                return (
                    <div className="w-full flex items-center justify-between border-b-slate-200 border-b py-3 cursor-pointer flex-wrap gap-5" key={section.section_id}>
                        <div>
                            <p className="text-sm font-bold text-slate-600">{section.section_name}</p>
                            <p className="text-xs text-slate-400 mt-1">{section.section_description}</p>
                            <div className={`rounded-lg px-3 border-slate-200 border w-fit mt-1 text-fuchsia-600`}>
                                <p className="text-xs">10.00 p.m.</p>
                            </div>
                            {section.materials && section.materials.length > 0 && (
                                <div className="mt-2">
                                    <ul className="list-disc pl-5">
                                        {section.materials.map((material, index) => (
                                            <li key={index} className="flex gap-3 items-center justify-center list-none mt-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#6CBE65" className="bi bi-cloud-download" viewBox="0 0 16 16">
                                                    <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383"/>
                                                    <path d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708z"/>
                                                </svg>
                                                <a href={`${material.material_path}?sp=r&st=2024-09-19T17:19:24Z&se=2024-09-27T01:19:24Z&spr=https&sv=2022-11-02&sr=c&sig=DmvdzB90dUK8nEPYVgu5%2Bp%2FAD0Zg5MtcH6UUMYfFLv8%3D`} download className="text-blue-500 underline text-sm">
                                                    {material.material_name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className="flex gap-4">
                            <Link href={`/lecturer/dashboard/edit-section/${section.section_id}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#c026d3" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                </svg>
                            </Link>
                            <button 
                                onClick={() => handleDelete(section.section_id)} 
                                className="text-red-600"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-rose-600" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}