'use client'

import { useEffect, useState } from "react";
import { getAnnouncements } from "@/app/api/lecturer/data";

type Announcement = {
    announcement_id: string;
    announcement_title: string;
    announcement_description: string;
    course_id: string;
};

export default function StudentAnnouncement({course_id} : {course_id: string}) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
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
                    </div>
                )
            })}
        </div>
    );
}