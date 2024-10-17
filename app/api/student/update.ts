'use server'

import { BlobServiceClient } from "@azure/storage-blob";

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING || '';
const AZURE_STORAGE_LECTURER_PICTURE_NAME = process.env.AZURE_STORAGE_LECTURER_PICTURE_NAME || '';
const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
const containerClientProfilePictures = blobServiceClient.getContainerClient(AZURE_STORAGE_LECTURER_PICTURE_NAME);

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
export async function updateStudentImage({lecturer_id, image_data} : {lecturer_id: string, image_data: FormData}) {
    try {
        const file: File | null = image_data.get('file') as unknown as File;
        const file_path = image_data.get('file_path') as string | undefined;
        let lecturer_image = '';
        if (file) {
            try {
                if (file_path) {
                    try {
                        const existingFilename = file_path.split('/').pop();
                        if (existingFilename) {
                            const blockBlobClient = containerClientProfilePictures.getBlockBlobClient(existingFilename);
                            await blockBlobClient.delete();
                        }
                    } catch (error) {
                        console.error('Error deleting old file:', error);
                        throw error;
                    }
                }

                const fileExtension = file.name.split('.').pop();
                const newFilename = `${lecturer_id}-${Date.now()}.${fileExtension}`;
                const blockBlobClient = containerClientProfilePictures.getBlockBlobClient(newFilename);

                const arrayBuffer = await file.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);

                await blockBlobClient.uploadData(buffer);

                const fileUrl = blockBlobClient.url;
                lecturer_image = fileUrl;
            } catch (error) {
                console.error('Error uploading file:', error);
                throw error;
            }
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API}/edit-student-image/${lecturer_id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ lecturer_image })
                });
                const result = await response.json();
                return result;
            } catch (error) {
                console.error('Error occurred:', error);
                throw error;
            }
        }
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}

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

