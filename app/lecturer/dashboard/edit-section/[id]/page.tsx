import EditSectionForm from "@/app/ui/lecturer/edit-section-form";

export default function Page( {params} : { params: { id: string } } ) {
    const { id } = params;
    return (
        <div>
            <p className="mt-2 p-4 font-semibold">Edit Section</p>
            <EditSectionForm section_id={id} />
        </div>
    )
}