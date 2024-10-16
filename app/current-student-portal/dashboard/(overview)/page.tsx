import Image from "next/image"
import CurrentStudentForm from "@/app/ui/portal/current-student-form"

export default function Page() {
    return (
        <div className="flex gap-2 items-center">
            <div className="w-full md:w-1/2">
                <CurrentStudentForm />
            </div>
            <div className="hidden w-1/2 md:block">
                <Image src="/portal/main/form.jpg" alt="Right Animation" width={500} height={500} />
            </div>
        </div>
    )
}