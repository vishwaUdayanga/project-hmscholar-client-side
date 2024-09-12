import AddAnnouncementForm from "@/app/ui/lecturer/add-announcement-form";

export default function Page({params} : {params: {id: string}}) {
    const {id} = params;
    return (
        <div className="p-4">
            <AddAnnouncementForm course_id={id} />
        </div>

    )
}