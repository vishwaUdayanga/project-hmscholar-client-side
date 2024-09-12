import Sections from "@/app/ui/lecturer/sections";
import Image from "next/image";
import Announcement from "@/app/ui/lecturer/announcements";

export default function Page({ params } : { params: { id: string } }) {
    const { id } = params;
    return (
        <div>
            <p className="mt-2 p-4 font-semibold text-lg">Major content</p>
            <Sections course_id={id} />
            <div className="flex items-center w-fit justify-center gap-6 mt-6 px-4">
                <p className="font-bold text-lg">Announcements</p>
                <Image src="/dashboard/announcements/bell.svg" alt="Announcement" width={20} height={20} />
            </div>
            <Announcement course_id={id} />
        </div>
        
    )
}