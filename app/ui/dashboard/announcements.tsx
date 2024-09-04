import { announcements } from "@/app/lib/placeholders"
import Image from "next/image"

export default async function Announcements() {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return (
        <div className="w-full">
            {announcements.map((announcement) => {
                return (
                    <div className="w-full flex items-center justify-between border-b-slate-300 border-b py-3 cursor-pointer flex-wrap gap-5" key={announcement.id}>
                        <div className="flex items-center gap-4">
                            <div className="relative w-10 h-10 rounded-full overflow-hidden">
                                <Image src={announcement.image} alt={announcement.title} fill style={{ objectFit: 'cover' }} className="rounded-full" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-zinc-700">{announcement.lecturer}</p>
                                <p className="text-xs text-slate-400">{announcement.date}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm">{announcement.title}</p>
                            <p className="text-xs text-slate-400 mt-1">{announcement.description}</p>
                            <div className={`rounded-lg px-3 border-slate-200 border w-fit mt-1 ${announcement.color}`}>
                                <p className="text-xs">{announcement.tag}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs">{announcement.time}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}