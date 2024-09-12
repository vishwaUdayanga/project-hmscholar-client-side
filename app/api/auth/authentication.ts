export async function loginLecturer({ email, password }: { email: string, password: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/lecturer/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}