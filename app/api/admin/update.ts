export async function updateLecturer({ lecturer_id, lecturer_name, lecturer_nic, lecturer_phone, lecturer_email, lecturer_password   } : { lecturer_id: string, lecturer_name: string, lecturer_nic: string, lecturer_phone: string, lecturer_email: string, lecturer_password: string }) {   try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/admin/edit_lecturer/${lecturer_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ lecturer_name, lecturer_nic, lecturer_phone, lecturer_email, lecturer_password })
        });
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}   

export async function updateCourse({ course_id, course_name, enrollment_key, course_description   } : { course_id: string, course_name: string, enrollment_key: string, course_description: string }) {   try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/admin/edit_course/${course_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ course_name, enrollment_key, course_description })
        });
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }   
}

export async function updateStudent({ student_id ,email, password } : {student_id: string, email: string, password: string }) {   try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/admin/edit_student/${student_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        return response;
    }
    catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}