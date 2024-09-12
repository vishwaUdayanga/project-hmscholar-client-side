import EditAnnouncementForm from "@/app/ui/lecturer/edit-announcement-form";

export default function Page( {params} : { params: { id: string } } ) {
    const { id } = params;
    return (
        <div>
            <p className="mt-2 p-4 font-semibold">Edit Section</p>
            <EditAnnouncementForm announcement_id={id} />
        </div>
    )
}