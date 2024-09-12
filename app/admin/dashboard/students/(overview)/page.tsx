import Students from "@/app/ui/admin/students";
import Image from "next/image";

export default function Page() {
    return (
        <div>
            <p className="mt-2 p-4 font-semibold text-lg">Students</p>
            <Students />
        </div>
    )
}