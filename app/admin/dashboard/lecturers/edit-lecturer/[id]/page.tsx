import EditLecturerForm from "@/app/ui/admin/edit-lecturer-form";

export default function Page( {params} : { params: { id: string } } ) {
    const { id } = params;
    return (
        <div className="pb-4">
            <p className="mt-2 p-4 font-semibold">Edit Section</p>
            <EditLecturerForm lecturer_id={id} />
        </div>
    )
}