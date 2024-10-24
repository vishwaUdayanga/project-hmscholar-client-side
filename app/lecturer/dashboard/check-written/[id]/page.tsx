'use client'

import WrittenAnswersForm from "@/app/ui/lecturer/quiz/written-answers-form";

export default function CheckWritten({params} : {params: {id: string}}) {
    const student_id = params.id.split('_')[0];
    const quiz_id = params.id.split('_')[1];
    return(
        <div>
            <WrittenAnswersForm student_id={student_id} quiz_id={quiz_id} />
        </div>
    )
}