'use client';
import Image from "next/image";
import { getAdminAnnoucements } from "@/app/api/student/data";
import { useEffect, useState } from 'react';

type Announcement = {
    admin_id: string;
    admin_name: string;
    title: string;
    description: string;
    admin_image: number;
};

export default function Announcements() {

    const [error, setError] = useState<string | null>(null);
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('No token found');
                    window.location.href = '';
                    return;
                }

                const announcementResponse = await getAdminAnnoucements();
                if (!announcementResponse.ok) {
                    throw new Error('Failed to fetch announcements');
                }

                const announcementData: Announcement[] = await announcementResponse.json();
                setAnnouncements(announcementData);
            } catch (error) {
                console.error('Error fetching announcements:', error);
                setError('Error fetching announcements');
            }
        };

        fetchAnnouncements();
    }, []);

    return (
        <div className="w-full px-4 pt-0 pb-4">
            {announcements.map((announcement) => (
                <div
                    className="w-full flex items-center justify-between border-b-slate-300 border-b py-3 cursor-pointer flex-wrap gap-5"
                    key={announcement.admin_id}
                >
                    <div className="flex items-center gap-4">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden">
                            <Image
                                src={announcement.admin_image.toString()}
                                alt={announcement.title}
                                fill
                                style={{ objectFit: 'cover' }}
                                className="rounded-full"
                            />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-zinc-700">{announcement.admin_name}</p>
                        </div>
                    </div>
                    <div className="ml-10 flex-1 min-w-[200px]">
                        <p className="text-sm font-bold text-zinc-700">{announcement.title}</p>
                        <p className="text-xs text-slate-400">{announcement.description}</p>
                    </div>
                </div>
            ))}
        </div>

    );
    
}
