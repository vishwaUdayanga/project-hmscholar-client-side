'use client'

import { useState, useEffect } from 'react';
import { getEnrolledStudents, getAllStudents } from '@/app/api/lecturer/data';
import { deleteEnrolledStudent } from '@/app/api/lecturer/delete'
import { enrollStudentToCourse } from '@/app/api/lecturer/create';
import Link from 'next/link';

type Student = {
    student_id: string;
    email: string;
}

type EnrolledStudent = {
    student_id: string;
    email: string;
}

export default function AddStudents({ params } : { params: { id: string } }) {
    const { id } = params;

    //Setup for already enrolled lecturers
    const [enrolledStudents, setEnrolledStudents] = useState<EnrolledStudent[]>([]);
    const [loading, setLoading] = useState(true);

    //State for removing students
    const [isRemoving, setIsRemoving] = useState(false);

    //Getting students
    const [students, setStudents] = useState<Student[]>([]);
    const [loadingStudents, setLoadingStudents] = useState(true);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [isEnrolling, setIsEnrolling] = useState(false);

    //Fetching all students

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await getAllStudents();
                const result: Student[] = await response.json();
                setStudents(result);
                setLoadingStudents(false);
            } catch (error) {
                console.error('Error occurred:', error);
            } finally {
                setLoadingStudents(false);
            }
        };
        fetchStudents();
    }, []);


    //Fetching enrolled students
    useEffect(() => {
        const fetchEnrolledStudents = async () => {
            try {
                const response = await getEnrolledStudents({ courseId: id });
                const result: EnrolledStudent[] = await response.json();
                setEnrolledStudents(result);
                setLoading(false);
            } catch (error) {
                console.error('Error occurred:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchEnrolledStudents();
    }, [id]);

    
    //Removing students
    const removeStudent = (student_id: string) => async () => {
        setIsRemoving(true);
        try {
            const response = await deleteEnrolledStudent({ student_id, course_id: id });
            if (response) {
                alert('Student removed successfully');
                window.location.reload();
            } else {
                alert('Error occurred while removing student');
            }
        } catch (error) {
            console.error('Error occurred:', error);
        } finally {
            setIsRemoving(false);
        }
    }

    //Enrolling students
    const enrollingStudent = (student_id: string) => async () => {
        setIsEnrolling(true);
        try {
            if (!student_id) {
                alert('Please select a student');
                return;
            }

            //Check if student is already enrolled using the enrolledStudents state
            const isEnrolled = enrolledStudents.find((student) => student.student_id === student_id);
            if (isEnrolled) {
                alert('Student is already enrolled');
                return;
            }

            const response = await enrollStudentToCourse({ student_id, course_id: id });
            if (response) {
                alert('Student enrolled successfully');
                window.location.reload();
            } else {
                alert('Error occurred while enrolling student');
            }
        } catch (error) {
            console.error('Error occurred:', error);
        } finally {
            setIsEnrolling(false);
        }
    }

    return (
        <div className="w-full p-4">
            <div>
                <h1 className="text-xl font-bold">Add a student</h1>
                <div className='flex items-center p-2 border border-zinc-200 rounded-md mt-4'>
                    <select className="w-full outline-none" onChange={(e) => setSelectedStudent(e.target.value)} >
                        <option value="">
                            { loadingStudents ? 'Loading...' : 'Select a student'}
                        </option>
                        {students.map((student) => (
                            <option key={student.student_id} value={student.student_id}>{student.email}</option>
                        ))}
                    </select>
                </div>
                <button className='mt-3 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded' disabled={isEnrolling} onClick={enrollingStudent(selectedStudent)}>
                    Enroll
                </button>
            </div>

            <div className="flex justify-between items-center mt-5">
                <h1 className="text-xl font-bold">Enrolled students</h1>
            </div>
            <div className="mt-8">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2">Student Name</th>
                                    <th className="border px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {enrolledStudents.map((student) => (
                                    <tr key={student.student_id}>
                                        <td className="border px-4 py-2">{student.email}</td>
                                        <td className="border px-5 py-5">
                                            <button className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded' disabled={isRemoving} onClick={removeStudent(student.student_id)}>
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}