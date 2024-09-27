import EditCourseForm from "@/app/ui/admin/edit-course-form";

export default function Page( {params} : { params: { id: string } } ) {
    const { id } = params;
    return (
        <div>
            <p className="mt-2 p-4 font-semibold">Edit Course</p>
            <EditCourseForm course_id={id} />
        </div>
    )
}