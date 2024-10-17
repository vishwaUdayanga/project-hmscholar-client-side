'use client'

import { useState, useEffect } from 'react';
import { getAssignedLecturers, getAllLecturers } from '@/app/api/admin/data';
import { deleteAssignedLecturer } from '@/app/api/admin/delete';
import { assignLecturerToCourse } from '@/app/api/admin/create';
import Link from 'next/link';

type AssignedLecturer = {
    lecturer_id: string;
    lecturer_name: string;
}

type Lecturer = {
    lecturer_id: string;
    lecturer_name: string;
}

export default function AssignLecturers({ params } : { params: { id: string } }) {
    const { id } = params;

    //Setup for already assigned lecturers
    const [assignedLecturers, setAssignedLecturers] = useState<AssignedLecturer[]>([]);
    const [loading, setLoading] = useState(true);

    //State for removing lecturer
    const [isRemoving, setIsRemoving] = useState(false);

    //Getting lecturers
    const [lecturers, setLecturers] = useState<Lecturer[]>([]);
    const [loadingLecturers, setLoadingLecturers] = useState(true);
    const [selectedLecturer, setSelectedLecturer] = useState('');
    const [isAssigning, setIsAssigning] = useState(false);

    //Fetching all lecturers

    useEffect(() => {
        const fetchLecturers = async () => {
            try {
                const response = await getAllLecturers();
                const result: Lecturer[] = await response.json();
                setLecturers(result);
                setLoadingLecturers(false);
            } catch (error) {
                console.error('Error occurred:', error);
            } finally {
                setLoadingLecturers(false);
            }
        };
        fetchLecturers();
    }, []);


    //Fetching assigned lecturers
    useEffect(() => {
        const fetchAssignedLecturers = async () => {
            try {
                const response = await getAssignedLecturers({ course_id: id });
                const result: AssignedLecturer[] = await response.json();
                setAssignedLecturers(result);
                setLoading(false);
            } catch (error) {
                console.error('Error occurred:', error);
            }
        };
        fetchAssignedLecturers();
    }, [id]);

    
    //Removing lecturers
    const removeLecture = (lecturer_id: string) => async () => {
        setIsRemoving(true);
        try {
            const response = await deleteAssignedLecturer({ course_id: id, lecturer_id: lecturer_id });
            if (response) {
                alert('Lecturer removed successfully');
                window.location.reload();
            } else {
                alert('Error occurred while removing lecturer');
            }
        } catch (error) {
            console.error('Error occurred:', error);
        } finally {
            setIsRemoving(false);
        }
    }

    //Assigning lecturers
    const assignLecturer = (lecturer_id: string) => async () => {
        setIsAssigning(true);
        try {
            if (!lecturer_id) {
                alert('Please select a lecturer');
                return;
            }

            //Check if lecturer is already assigned using the assignedLecturers state
            const isAssigned = assignedLecturers.find((lecturer) => lecturer.lecturer_id === lecturer_id);
            if (isAssigned) {
                alert('Lecturer is already assigned');
                return;
            }

            const response = await assignLecturerToCourse({ course_id: id, lecturer_id: lecturer_id });
            if (response) {
                alert('Lecturer assigned successfully');
                window.location.reload();
            } else {
                alert('Error occurred while assigning lecturer');
            }
        } catch (error) {
            console.error('Error occurred:', error);
        } finally {
            setIsAssigning(false);
        }
    }

    return (
        <div className="w-full p-4">
            <div>
                <h1 className="text-xl font-bold">Add a lecturer</h1>
                <div className='flex items-center p-2 border border-zinc-200 rounded-md mt-4'>
                    <select className="w-full outline-none" onChange={(e) => setSelectedLecturer(e.target.value)} >
                        <option value="">
                            { loadingLecturers ? 'Loading...' : 'Select a lecturer'}
                        </option>
                        {lecturers.map((lecturer) => (
                            <option key={lecturer.lecturer_id} value={lecturer.lecturer_id}>{lecturer.lecturer_name}</option>
                        ))}
                    </select>
                </div>
                <button className='mt-3 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded' disabled={isAssigning} onClick={assignLecturer(selectedLecturer)}>
                    Assign
                </button>
            </div>

            <div className="flex justify-between items-center mt-5">
                <h1 className="text-xl font-bold">Assigned Lecturers</h1>
            </div>
            <div className="mt-8">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2">Lecturer Name</th>
                                    <th className="border px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {assignedLecturers.map((lecturer) => (
                                    <tr key={lecturer.lecturer_id}>
                                        <td className="border px-4 py-2">{lecturer.lecturer_name}</td>
                                        <td className="border px-5 py-5">
                                            <button className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded' disabled={isRemoving} onClick={removeLecture(lecturer.lecturer_id)}>
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