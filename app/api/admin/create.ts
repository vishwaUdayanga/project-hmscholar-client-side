export async function createLecturer({ lecturer_name, lecturer_nic, lecturer_phone, lecturer_email, lecturer_password } : { lecturer_name: string, lecturer_nic: string, lecturer_phone: string, lecturer_email: string, lecturer_password: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/admin/create_lecturer`, {
            method: 'POST',
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

export async function createCourse({ course_name, enrollment_key, course_description } : { course_name: string, enrollment_key: string, course_description: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/admin/create_course`, {
            method: 'POST',
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

export async function createStudent({email, password } : { email: string, password: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/admin/create_student`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}

export async function createAdminAnnouncement({ title, description, admin_id } : { title: string, description: string, admin_id: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/admin/create_admin_announcement`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, admin_id })
        });
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}

export async function assignLecturerToCourse({ course_id, lecturer_id } : { course_id: string, lecturer_id: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/admin/assign_lecturer/${course_id}/${lecturer_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ course_id, lecturer_id })
        });
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}