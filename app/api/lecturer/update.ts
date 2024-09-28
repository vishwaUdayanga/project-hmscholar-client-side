'use server'

import { BlobServiceClient } from "@azure/storage-blob";

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING || '';
const AZURE_STORAGE_CONTAINER_NAME = process.env.AZURE_STORAGE_CONTAINER_NAME || '';
const AZURE_STORAGE_LECTURER_PICTURE_NAME = process.env.AZURE_STORAGE_LECTURER_PICTURE_NAME || '';

const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient(AZURE_STORAGE_CONTAINER_NAME);
const containerClientProfilePictures = blobServiceClient.getContainerClient(AZURE_STORAGE_LECTURER_PICTURE_NAME);

export async function updateSection({ section_id, section_data, } : { section_id: string, section_data: FormData }) {
    try {
        const section_name = section_data.get('title');
        const section_description = section_data.get('description');
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/edit-section/${section_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ section_name, section_description })
        });

        const result = await response.json();

        if (response.status !== 200) {
            throw new Error('Failed to create section');
        }

        for (let i = 0; i < 5; i++) {
            const file: File | null = section_data.get(`file_${i}`) as unknown as File;
            const fileName = section_data.get(`file_name_${i}`);

            if (file && fileName) {
                const fileExtension = file.name.split('.').pop();
                const newFilename = `${section_id}-${Date.now()}-${i}.${fileExtension}`;
                const blockBlobClient = containerClient.getBlockBlobClient(newFilename);

                const arrayBuffer = await file.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);

                await blockBlobClient.uploadData(buffer);

                const fileUrl = blockBlobClient.url;
                const fileResponse = await fetch(`${process.env.NEXT_PUBLIC_API}/add_course_material`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        material_name: fileName,
                        material_path: fileUrl,
                        section_id: section_id
                    })
                });

                if (fileResponse.status !== 200) {
                    throw new Error('Failed to create course material');
                }
            }
        }
        return result;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
} 

export async function updateAnnouncement({ announcement_id, announcement_title, announcement_description } : { announcement_id: string, announcement_title: string, announcement_description: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/course/edit-announcement/${announcement_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ announcement_title, announcement_description })
        });
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}

export async function updateMaterial({material_id, material_data} : {material_id: string, material_data: FormData}) {
    try {
        const material_name = material_data.get('material_name');
        let material_path = material_data.get('material_path') as string | undefined;
        const file: File | null = material_data.get('file') as unknown as File;

        if (file) {
            try {
                if (material_path) {
                    try {
                        const existingFilename = material_path.split('/').pop();
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
                const newFilename = `${material_id}-${Date.now()}.${fileExtension}`;
                const blockBlobClient = containerClient.getBlockBlobClient(newFilename);

                const arrayBuffer = await file.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);

                await blockBlobClient.uploadData(buffer);

                const fileUrl = blockBlobClient.url;
                material_path = fileUrl;
            } catch (error) {
                console.error('Error uploading file:', error);
                throw error;
            }
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/edit-material/${material_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ material_name, material_path })
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}

export async function updateQuiz({
    quiz_id,
    quiz_name,
    quiz_duration,
    quiz_total_marks,
    quiz_description,
    quiz_password,
    quiz_number_of_questions,
    questions,
    section_id } : { 
        quiz_id: string,
        quiz_name: string,
        quiz_duration: number,
        quiz_total_marks: number,
        quiz_description: string, 
        quiz_password: string,
        quiz_number_of_questions: number,
        questions: any[], 
        section_id: string | undefined }) {
try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/edit-quiz/${quiz_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quiz_name, quiz_duration, quiz_total_marks, quiz_description, quiz_password, quiz_number_of_questions, questions, section_id })
    });
    if (response.status !== 200) {
        throw new Error('Failed to update quiz');
    }
    const result = await response.json();
    return result;
} catch (error) {
    console.error('Error occurred:', error);
    throw error;
}
}

export async function updateLecturerImage({lecturer_id, image_data} : {lecturer_id: string, image_data: FormData}) {
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
                const response = await fetch(`${process.env.NEXT_PUBLIC_API}/edit-lecturer-image/${lecturer_id}`, {
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

export async function updateLecturer({lecturer_id, lecturer_data} : {lecturer_id: string, lecturer_data: FormData}) {
    try {
        const lecturer_name = lecturer_data.get('lecturer_name');
        const lecturer_nic = lecturer_data.get('lecturer_nic');
        const lecturer_phone = lecturer_data.get('lecturer_phone');
        const lecturer_email = lecturer_data.get('lecturer_email');
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/edit-lecturer/${lecturer_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ lecturer_name, lecturer_nic, lecturer_phone, lecturer_email })
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}