export  async function updateStudentEmail({ student_id, new_email } : { student_id: string, new_email: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/student/edit-email/${student_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ new_email})
        });
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}
export async function updateStudentPassword({student_id,old_password,new_password}:{student_id:string, old_password:string, new_password:string}){
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/student/edit-password/${student_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ old_password,new_password})
        });
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }

}