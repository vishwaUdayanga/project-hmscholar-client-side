import AddCourseForm from "@/app/ui/admin/add-course";

export default function Page({params} : {params: {id: string}}) {
    const {id} = params;
    return (
        <div className="p-4">
            <AddCourseForm />
        </div>
    )
}