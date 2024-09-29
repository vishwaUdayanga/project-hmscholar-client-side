import Link from "next/link";

export default async function Layout({ children }: { children: React.ReactNode }) {

    return (
        <>
            <div className="p-4 flex justify-between items-center flex-wrap gap-5">
                <h1 className="text-xl">Manage Content</h1>
                <div className="flex gap-3 flex-wrap">
                    <Link href={`/admin/dashboard/manage-content`} className="px-3 py-2 h-fit bg-fuchsia-200 text-fuchsia-600 rounded-md text-xs cursor-pointer">Announcements</Link>
                    <Link href={`/admin/dashboard/manage-content/add-announcements`} className="px-3 py-2 h-fit bg-fuchsia-200 text-fuchsia-600 rounded-md text-xs cursor-pointer">Add Announcement</Link>
                </div>
            </div>
            {children}
        </>
    );
}
