import AddSectionForm from "@/app/ui/lecturer/add-section-form";

export default function Page({params} : {params: {id: string}}) {
    const {id} = params;
    return (
        <div className="p-4">
            <AddSectionForm course_id={id} />
        </div>

    )
}