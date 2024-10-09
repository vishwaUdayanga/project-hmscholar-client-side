'use server'

import { BlobServiceClient } from "@azure/storage-blob";

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING || '';
const AZURE_STORAGE_CONTAINER_NAME = process.env.AZURE_STORAGE_CONTAINER_NAME || '';
// const AZURE_STORAGE_LECTURER_PICTURE_NAME = process.env.AZURE_STORAGE_LECTURER_PICTURE_NAME || '';
// const AZURE_STORAGE_COURSE_SETTINGS = process.env.AZURE_STORAGE_COURSE_SETTINGS || ''

const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient(AZURE_STORAGE_CONTAINER_NAME);
// const containerClientProfilePictures = blobServiceClient.getContainerClient(AZURE_STORAGE_LECTURER_PICTURE_NAME);
// const containerClientCourseSettings = blobServiceClient.getContainerClient(AZURE_STORAGE_COURSE_SETTINGS);



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

export async function updateStudentImage({student_id, image_data} : {student_id: string, image_data: FormData}) {
    try {
        const file: File | null = image_data.get('file') as unknown as File;
        const file_path = image_data.get('file_path') as string | undefined;
        let student_img = '';
        if (file) {
            try {
                if (file_path) {
                    try {
                        const existingFilename = file_path.split('/').pop();
                        if (existingFilename) {
                            const blockBlobClient = containerClient.getBlockBlobClient(existingFilename);
                            await blockBlobClient.delete();
                        }
                    } catch (error) {
                        console.error('Error deleting old file:', error);
                        throw error;
                    }
                }

                const fileExtension = file.name.split('.').pop();
                const newFilename = `${student_id}-${Date.now()}.${fileExtension}`;
                const blockBlobClient = containerClient.getBlockBlobClient(newFilename);

                const arrayBuffer = await file.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);

                await blockBlobClient.uploadData(buffer);

                const fileUrl = blockBlobClient.url;
                student_img = fileUrl;
            } catch (error) {
                console.error('Error uploading file:', error);
                throw error;
            }
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API}/edit-student-image/${student_id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ student_img })
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