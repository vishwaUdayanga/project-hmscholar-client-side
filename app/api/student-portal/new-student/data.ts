export async function getProgramDetails({program_id}: {program_id: string}) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/student-portal/program-details/${program_id}`);
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}

export async function getUserDetails({email} : {email: string}) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/user-details-for-student-portal/${email}`);
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}

export async function getStudentDetails({email} : {email: string}) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/student-details/${email}`);
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}

export async function getPaymentDetailsById({student_id} : {student_id: string}) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/is_in_payment/${student_id}`);
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}
