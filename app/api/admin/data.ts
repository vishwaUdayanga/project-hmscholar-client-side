export async function getLecturers() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/admin/lecturers`);
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}

export async function getLecturer({ lecturerId }: { lecturerId: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/admin/lecturer/${lecturerId}`);
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}

export async function getCourses() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/admin/courses`);
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}

export async function getCourse({ courseId }: { courseId: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/admin/course/${courseId}`);
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}

export async function getStudents() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/admin/students`);
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}

export async function getStudent({ studentId }: { studentId: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/admin/student/${studentId}`);
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}