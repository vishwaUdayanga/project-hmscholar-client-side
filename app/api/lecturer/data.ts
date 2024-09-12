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