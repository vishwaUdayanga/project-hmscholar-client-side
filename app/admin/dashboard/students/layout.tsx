import Link from "next/link";

export default async function Layout({ children }: { children: React.ReactNode }) {

    return (
        <>
            <div className="p-4 flex justify-between items-center flex-wrap gap-5">
                <h1 className="text-xl">Students</h1>
                <div className="flex gap-3 flex-wrap">
                    <Link href={`/admin/dashboard/students`} className="px-3 py-2 h-fit bg-blue-200 text-blue-600 rounded-md text-xs cursor-pointer">Students</Link>
                    <Link href={`/admin/dashboard/students/add-students`} className="px-3 py-2 h-fit bg-fuchsia-200 text-fuchsia-600 rounded-md text-xs cursor-pointer">Add Students</Link>
                </div>
            </div>
            {children}
        </>
    );
}
