import AdminAnnouncements from "@/app/ui/admin/admin-announcements";
import Image from "next/image";

export default function Page() {
    return (
        <div>
            <p className="mt-2 p-4 font-semibold text-lg">Admin Announcements</p>
            <AdminAnnouncements />
        </div>
    )
}