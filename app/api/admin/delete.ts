export async function deleteLecturer({ lecturerId }: { lecturerId: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/admin/delete_lecturer/${lecturerId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}

export async function deleteCourse({ courseId }: { courseId: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/admin/delete_course/${courseId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}

export async function deleteStudent({ studentId }: { studentId: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/admin/delete_student/${studentId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}

//delete admin announcements
export async function deleteAdminAnnouncement({ announcementId }: { announcementId: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/admin/delete_announcement/${announcementId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}