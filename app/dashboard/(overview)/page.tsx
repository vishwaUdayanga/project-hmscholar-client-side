'use client'

import Search from "@/app/ui/dashboard/search"
import { keyCourses } from "@/app/lib/placeholders"
import { useState } from "react"
import Courses from "@/app/ui/dashboard/courses"

export default function Page() {
    const [search, setSearch] = useState('')
    const handleSearch = (term: string) => {
        setSearch(term)
    }

    return (
        <div className="flex flex-col px-4">
            <p className="text-lg mb-3">Welcome to the <span className="font-bold">IHMA</span> dashboard</p>
            <div className="flex gap-4 items-center flex-col lg:flex-row mb-5">
                <Search placeholder="Search for courses" value={search} />
                <div className="flex gap-4 flex-wrap">
                    {keyCourses.map((course) => {
                        return (
                            <div key={course.id} className={`px-3 py-1 ${course.background} ${course.text} rounded-xl text-xs cursor-pointer`} onClick={() => handleSearch(course.title)}>
                               <p>{course.title}</p>     
                            </div>
                        )
                    })}
                </div>
            </div>
            <Courses />
        </div>
    )
} 