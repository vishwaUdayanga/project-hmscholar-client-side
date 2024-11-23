'use client'

import { useEffect, useState } from "react";
import { getAnnouncements } from "@/app/api/lecturer/data";
import Link from "next/link";
import { deleteAnnouncement } from "@/app/api/lecturer/delete";

type Announcement = {
    announcement_id: string;
    announcement_title: string;
    announcement_description: string;
    course_id: string;
};

export default function Announcement({course_id} : {course_id: string}) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [announcementId, setAnnouncementId] = useState<string | null>(null);

    useEffect(() => {
        const fetchSections = async () => {
            try {

                const sectionsResponse = await getAnnouncements({ courseId: course_id });
                if (!sectionsResponse.ok) {
                    throw new Error('Failed to fetch sections');
                }
                const sections: Announcement[] = await sectionsResponse.json();
                setAnnouncements(sections);
            } catch (error) {
                console.error('Error fetching announcements:', error);
                setError('Error fetching announcements');
            } finally {
                setLoading(false);
            }
        };

        fetchSections();
    }, [course_id]);

    const handleDelete = async (announcement_id: string) => {
        try {
            const response = await deleteAnnouncement({ announcement_id });
            if (!response) {
                throw new Error('Failed to delete announcement');
            }
            alert('Announcement deleted successfully');
            setAnnouncements(announcements.filter(announcement => announcement.announcement_id !== announcement_id));
        } catch (error) {
            console.error('Error deleting announcement:', error);
            setError('Error deleting announcement');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="w-full px-4 pt-0 pb-4">
            {announcements.map((announcement) => {
                return (
                    <div className="w-full flex items-center justify-between border-b-slate-200 border-b py-3 cursor-pointer flex-wrap gap-5" key={announcement.announcement_id}>
                        <div>
                            <p className="text-sm">{announcement.announcement_title}</p>
                            <p className="text-xs text-slate-400 mt-1">{announcement.announcement_description}</p>
                            <div className={`rounded-lg px-3 border-slate-200 border w-fit mt-1 text-fuchsia-600`}>
                                <p className="text-xs">10.00 p.m.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <Link href={`/lecturer/dashboard/edit-announcement/${announcement.announcement_id}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#c026d3" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                </svg>
                            </Link>
                            <button 
                                onClick={() => {
                                    setShowDeleteModal(true);
                                    setAnnouncementId(announcement.announcement_id);
                                }}
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
            { showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-lg">
                        <p>Are you sure you want to delete this section?</p>
                        <div className="flex gap-4 mt-4">
                            <button onClick={() => setShowDeleteModal(false)} className="bg-gray-200 px-4 py-2 rounded-lg">Cancel</button>
                            <button onClick={() => {
                                handleDelete(announcementId!);
                                setShowDeleteModal(false);
                            }} className="bg-red-600 text-white px-4 py-2 rounded-lg">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}