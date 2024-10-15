import Image from "next/image";
import React from "react";
import EnrollmentForm from "@/app/ui/portal/enrollment-form";

export default function Enroll({params} : {params: {id: string}}) {
    const id = params.id;

    return (
        <div className="flex gap-5 w-full items-center">
            <div className="w-full md:w-1/2">
                <EnrollmentForm program_id={id} />
            </div>
            <div className="hidden w-1/2 md:block">
                <Image src={'/portal/main/form.jpg'} alt="Enroll" width={500} height={500} className="rounded-md" />
            </div>
        </div>
    )
}