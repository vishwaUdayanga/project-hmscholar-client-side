// Function to update student email
export async function updateStudentEmail({ student_id, new_email }: { student_id: string, new_email: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/student/edit-email/${student_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ new_email })
        });
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}

// Function to update student password
export async function updateStudentPassword({ student_id, old_password, new_password }: { student_id: string, old_password: string, new_password: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/student/edit-password/${student_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ old_password, new_password })
        });
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}
//function to update student image


export async function updateStudentMCQAnswer({
    student_id,
    quiz_id,
    course_id,
    question_id,
    answer_id}: { 
        student_id: string,
        course_id: string,
        quiz_id: string,
        question_id: string,
        answer_id: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/student/quiz/mcq/given-answers`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ student_id,quiz_id,course_id,question_id,answer_id })
        });
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}

export async function updateStudentWrittenAnswer({
    student_id,
    quiz_id,
    course_id,
    question_id,
    answer}: { 
        student_id: string,
        course_id: string,
        quiz_id: string,
        question_id: string,
        answer: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/student/quiz/written/given-answers`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ student_id,quiz_id,course_id,question_id,answer })
        });
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}

export async function submitStudentQuiz({
    student_id,
    quiz_id,
    course_id}: { 
        student_id: string,
        course_id: string,
        quiz_id: string,}) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/student/student-attempts/submission/${student_id}/${course_id}/${quiz_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}

