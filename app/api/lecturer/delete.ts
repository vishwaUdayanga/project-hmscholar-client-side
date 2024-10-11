'use server'

import { BlobServiceClient } from "@azure/storage-blob";

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING || '';
const AZURE_STORAGE_CONTAINER_NAME = process.env.AZURE_STORAGE_CONTAINER_NAME || '';

const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient(AZURE_STORAGE_CONTAINER_NAME);

export async function deleteSection({ section_id } : { section_id: string | null }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/delete-section/${section_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.json();
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}

export async function deleteQuiz({ quiz_id } : { quiz_id: string | null }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/delete-quiz/${quiz_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.json();
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}

export async function deleteAnnouncement({ announcement_id } : { announcement_id: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/course/delete-announcement/${announcement_id}`, {
            method: 'DELETE',
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

export async function deleteMaterial({ material_id, material_path } : { material_id: string, material_path: string | undefined }) {
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
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API}/delete-material/${material_id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
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