import { CourseList } from "@/app/lib/placeholders";
import Image from "next/image";

export default async function Courses() {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    return (
        <div className="flex flex-col gap-6 w-full lg:flex-row lg:gap-16">
            {CourseList.map((semester) => {
                return (
                    <div key={semester.id} className="w-full lg:w-4/12">
                        <p className="text-sm mb-4 text-gray-400">{semester.semester}</p>
                        <div className="flex flex-col gap-5">
                            {
                                semester.courses.map((course) => {
                                    return (
                                        <div key={course.id} className="flex gap-7 items-center border-b border-b-slate-200 pb-3 justify-between">
                                            <div className="flex gap-3 items-center w-80">
                                                <div className="relative w-14 h-10 rounded overflow-hidden">
                                                    <Image src={course.image} alt={course.title} fill style={{ objectFit: 'cover' }} className="rounded" />
                                                </div>
                                                <div>
                                                    <p className="text-sm max-w-72 text-slate-800">{course.title}</p>
                                                    <p className="text-xs max-w-72 text-slate-500">{course.lecturer}</p>
                                                </div>
                                            </div>
                                            <p className="text-sm flex gap-2">{course.credits} <span className="text-slate-300">credits</span></p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                )
            })}
        </div>
    )
}