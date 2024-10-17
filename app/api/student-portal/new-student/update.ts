export async function confirmNewStudent({newStudent_id} : {newStudent_id: string}) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/confirm-new-student/${newStudent_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({newStudent_id}),
        });
        return response.json();
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}

export async function confirmCurrentStudentPayment({payment_id} : {payment_id: string}) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/confirm-current-student-payment/${payment_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({payment_id}),
        });
        return response.json();
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}