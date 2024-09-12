export async function getLecturer({ email }: { email: string}) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/lecturer/by-email/${email}`)
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}

export async function getLecturerCourses({ lecturerId }: { lecturerId: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/lecturer/${lecturerId}/courses`);
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}

export async function getCourseName({ courseId }: { courseId: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/courses/${courseId}`);
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}

export async function getSections({ courseId }: { courseId: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/sections/${courseId}`);
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}

export async function getSection({ sectionId }: { sectionId: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/one-section/${sectionId}`);
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}

export async function getAnnouncements({ courseId }: { courseId: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/course/announcements/${courseId}`);
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}

export async function getAnnouncement({ announcementId }: { announcementId: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/course/one-announcement/${announcementId}`);
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}