export async function getLecturers() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/admin/lecturers`);
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}