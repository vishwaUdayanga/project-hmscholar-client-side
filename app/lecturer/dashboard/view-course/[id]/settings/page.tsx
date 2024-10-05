import CourseSettings from "@/app/ui/lecturer/course_settings";

export default function Settings({params} : {params: {id: string}}) {
    const {id} = params;
    return (
        <CourseSettings course_id={id} />
    )
}