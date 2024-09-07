export async function loginLecturer({ email, pass }: { email: string, pass: string }) {
    const response = await fetch(`${process.env.API}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, pass })
    })

    return response.json()
    
}