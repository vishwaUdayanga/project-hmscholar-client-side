import AddLecturer from "@/app/ui/admin/add-lecturer-form";

export default function Page({params} : {params: {id: string}}) {
    const {id} = params;
    return (
        <div className="p-4">
            <AddLecturer />
        </div>
    )
}