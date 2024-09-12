import EditStudentForm from "@/app/ui/admin/edit-student-form";

export default function Page( {params} : { params: { id: string } } ) {
    const { id } = params;
    return (
        <div className="pb-4">
            <p className="mt-2 p-4 font-semibold">Edit Student</p>
            <EditStudentForm student_id={id} />
        </div>
    )
}