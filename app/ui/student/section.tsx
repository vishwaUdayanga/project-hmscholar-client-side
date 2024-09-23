'use client'

import { useEffect, useState } from "react";
import { getSections } from "@/app/api/lecturer/data";
import Link from "next/link";
import { deleteSection } from "@/app/api/lecturer/delete";

type Section = {
    section_id: string;
    section_name: string;
    section_description: string;
    course_id: string;
};

export default function StudentSections({course_id} : {course_id: string}) {
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
                            <p className="text-sm">{section.section_name}</p>
                            <p className="text-xs text-slate-400 mt-1">{section.section_description}</p>
                            <div className={`rounded-lg px-3 border-slate-200 border w-fit mt-1 text-fuchsia-600`}>
                                <p className="text-xs">10.00 p.m.</p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}