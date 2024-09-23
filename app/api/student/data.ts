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

