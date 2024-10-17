'use client'

import Link from "next/link"
import Image from "next/image"

export default function page() {
    return (
        <div className="flex flex-col h-[90vh] p-3">
            <div className="h-1/2 bg-[url('/portal/main/main-bg-low.png')] bg-center bg-cover flex items-center justify-center p-1 flex-col bg-slate-500 text-center rounded-md">
                <h1 className="text-white text-4xl font-extrabold">Welcome to the student portal</h1>
                <p className="text-slate-300 text-sm">Find the best path that fit for you!</p>
            </div>
            <div className="w-full flex items-center gap-3 flex-wrap justify-center mt-4 md:-mt-28">
                <Link href='/student-portal-admin/dashboard' className="p-4 w-60 h-44 flex items-center justify-center bg-white border rounded-lg border-orange-500">
                    <Image src="/portal/main/p-1.png" alt="Student Portal" width={150} height={150} />
                </Link>
                <Link href='/student-portal-admin/dashboard/current-student-payments' className="p-4 w-60 h-44 flex items-center justify-center bg-white border rounded-lg border-orange-500">
                    <Image src="/portal/main/p-2.png" alt="Student Portal" width={150} height={150} />
                </Link>
                <Link href='/student-portal-admin/dashboard' className="p-4 w-60 h-44 flex items-center justify-center bg-white border rounded-lg border-orange-500">
                    <Image src="/portal/main/p-3.png" alt="Student Portal" width={100} height={100} />
                </Link>
            </div>
            <h1 className="w-full text-center text-2xl font-bold mt-5">Select a specific program to see semester registration of current students</h1>
        </div>
    )
}