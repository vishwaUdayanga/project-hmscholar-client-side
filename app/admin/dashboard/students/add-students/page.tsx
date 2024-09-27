import AddStudent from "@/app/ui/admin/add-students-form";

export default function Page({params} : {params: {id: string}}) {
    const {id} = params;
    return (
        <div className="p-4">
            <AddStudent />
        </div>
    )
}