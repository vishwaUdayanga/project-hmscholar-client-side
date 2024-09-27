//Login function for all users

export async function loginToLms({ user_name, password }: { user_name: string, password: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/login-to-lms`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_name, password }),
        });
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}

export async function loginToPortal({ user_name, password }: { user_name: string, password: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/login-to-portal`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_name, password }),
        });
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}

//Validating token for all users

export async function validateLoginToLms({ user_name, password }: { user_name: string, password: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/validate-login-to-lms`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_name, password }),
        });
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}
