//enroll students in courses
export async function enrollIncourses({ course_id, student_id,enrollment_key } : { course_id: string, student_id: string,enrollment_key:string}) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/student/course_enrollment/${course_id}/${student_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ enrollment_key})
        });
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}

export  async function attemptQuiz({ course_id, quiz_id,student_id,quiz_password } : { course_id: string,quiz_id:string, student_id: string, quiz_password:string}) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/student/quiz/attempt/${course_id}/${quiz_id}/${student_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({quiz_password })
        });
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}


