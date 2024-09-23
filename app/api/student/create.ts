//enroll students in courses
export default async function enrollIncourses({ course_id, student_id,enrollment_key } : { course_id: string, student_id: string,enrollment_key:string}) {
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

