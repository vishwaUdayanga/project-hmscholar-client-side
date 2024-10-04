import EditAdminAnnouncementForm from "@/app/ui/admin/edit-admin-announcement-form";

export default function Page( {params} : { params: { id: string } } ) {
    const { id } = params;
    return (
        <div className="pb-4">
            <p className="mt-2 p-4 font-semibold">Edit Announcement</p>
            <EditAdminAnnouncementForm announcement_id={id} />
        </div>
    )
}