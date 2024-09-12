import Lecturers from "@/app/ui/admin/lecturers";
import Image from "next/image";

export default function Page() {
    return (
        <div>
            <p className="mt-2 p-4 font-semibold text-lg">Lecturers</p>
            <Lecturers />
        </div>
    )
}