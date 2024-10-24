import AddAdminAnnouncement from "@/app/ui/admin/add-admin-announcement-form";

export default function Page({params} : {params: {id: string}}) {
    const {id} = params;
    return (
        <div className="p-4">
            <AddAdminAnnouncement />
        </div>
    )
}