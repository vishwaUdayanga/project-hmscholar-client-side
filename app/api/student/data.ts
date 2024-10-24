export async function getStudentProfile({ email }: { email: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/student/profile/${email}`);
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}


//get course in current sem
export  async function getStudentCourse({student_id }: {student_id:string}) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/student/course/${student_id}`);
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
} 
//get courses in program
export  async function getProgramCourse({student_id }: {student_id:string}) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/student/course_program/${student_id}`);
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
} 
//get enrolled courses in other semesters
export  async function getEnrolledProgramCourse({student_id }: {student_id:string}) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/student/courses_not_in_semester/${student_id}`);
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
} 

export  async function getEnrolledStudents({course_id,student_id }: {course_id:string,student_id:string}) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/student/course_enrollment_student/${course_id}/${student_id}`);
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
} 

export  async function getSemesterCourse({course_id,student_id }: {course_id:string,student_id:string}) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/student/check_semester/${course_id}/${student_id}`);
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
} 

export  async function getAllEnrolledCourses({student_id }: {student_id:string}) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/student/all-enrolled-courses/${student_id}`);
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
} 

export  async function getAdminAnnoucements() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/student/admin-announcements`);
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
} 

export  async function getStudentQuiz({quiz_id }: {quiz_id:string}) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/student/quiz/${quiz_id}`);
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
} 

export  async function getStudentQuestions({quiz_id }: {quiz_id:string}) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/student/quiz/questions/${quiz_id}`);
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
} 

export  async function getStudentMcqAnswer({question_id }: {question_id:string}) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/student/quiz/mcq/${question_id}`);
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
} 

export  async function getSavedAnswersMcq({student_id,course_id,quiz_id,question_id }: {question_id:string,quiz_id:string,course_id:string,student_id:string}) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/student/quiz/given-answers/mcq/${student_id}/${course_id}/${quiz_id}/${question_id}`);
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
} 

export async function getAllLecturerDetails() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/students/download/lecturer`);
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}

export  async function getSavedAnswersWritten({student_id,course_id,quiz_id,question_id }: {question_id:string,quiz_id:string,course_id:string,student_id:string}) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/student/quiz/given-answers/written/${student_id}/${course_id}/${quiz_id}/${question_id}`);
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}

export  async function getStudentAttempt({student_id,course_id,quiz_id }: {quiz_id:string,course_id:string,student_id:string}) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/student/student-attempts/${student_id}/${course_id}/${quiz_id}`);
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}




