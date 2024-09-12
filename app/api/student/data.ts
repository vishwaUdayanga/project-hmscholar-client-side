export default async function getStudentProfile({ email }: { email: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/student/profile/${email}`);
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}