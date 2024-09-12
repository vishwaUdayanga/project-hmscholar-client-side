import Search from "@/app/ui/dashboard/search"
import Announcements from "@/app/ui/dashboard/announcements"
import React, { Suspense } from 'react';
import Image from 'next/image';
import { CoursesSkeleton, AnnouncementSkeleton } from "@/app/ui/skeletons"
import dynamic from "next/dynamic";

// const Courses = dynamic(() => import('@/app/ui/lecturer/courses'), {
//     suspense: true
// });

export default function Page() {

    return (
        <div className="flex flex-col px-4">
            <p className="text-lg mb-3">Welcome to the <span className="font-bold">IHMA</span> Admin dashboard</p>
            <div className="flex gap-4 items-center flex-col lg:flex-row mb-5">
                <Suspense fallback={<div>Loading...</div>}>
                    <Search placeholder="Search for courses" />
                </Suspense>
            </div>
            {/* <Suspense fallback={<CoursesSkeleton />}>
                <Courses />
            </Suspense> */}
            <div className="flex items-center w-fit justify-center gap-6 mt-6">
                <p className="font-bold text-lg">Announcements</p>
                <Image src="/dashboard/announcements/bell.svg" alt="Announcement" width={20} height={20} />
            </div>
            <Suspense fallback={<AnnouncementSkeleton />}>
                <Announcements />
            </Suspense>
        </div>
    )
} 