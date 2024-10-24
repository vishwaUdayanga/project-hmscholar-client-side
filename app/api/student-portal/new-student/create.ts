'use server'

import { BlobServiceClient } from "@azure/storage-blob";

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING || '';
const AZURE_STORAGE_NEW_STUDENT_MATERIALS = process.env.AZURE_STORAGE_NEW_STUDENT_MATERIALS || '';

const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
const newStudentMaterialsContainerClient = blobServiceClient.getContainerClient(AZURE_STORAGE_NEW_STUDENT_MATERIALS);

export async function enrollStudent({data, program_id} : {data: FormData, program_id: string}) {
    try {
        const name = data.get('name');
        const address = data.get('address');
        const email = data.get('email');
        const OL_doc = data.get('OL_doc');
        const AL_doc = data.get('AL_doc');
        const payment_doc = data.get('payment_doc');

        let OL_path = '';
        let AL_path = '';
        let payment_path = '';

        if (OL_doc) {
            const file: File = OL_doc as unknown as File;
            const fileExtension = file.name.split('.').pop();
            const newFilename = `${name}-OL-${Date.now()}.${fileExtension}`;
            const blockBlobClient = newStudentMaterialsContainerClient.getBlockBlobClient(newFilename);

            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            await blockBlobClient.uploadData(buffer);

            OL_path = blockBlobClient.url;
        }

        if (AL_doc) {
            const file: File = AL_doc as unknown as File;
            const fileExtension = file.name.split('.').pop();
            const newFilename = `${name}-AL-${Date.now()}.${fileExtension}`;
            const blockBlobClient = newStudentMaterialsContainerClient.getBlockBlobClient(newFilename);

            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            await blockBlobClient.uploadData(buffer);

            AL_path = blockBlobClient.url;
        }

        if (payment_doc) {
            const file: File = payment_doc as unknown as File;
            const fileExtension = file.name.split('.').pop();
            const newFilename = `${name}-payment-${Date.now()}.${fileExtension}`;
            const blockBlobClient = newStudentMaterialsContainerClient.getBlockBlobClient(newFilename);

            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            await blockBlobClient.uploadData(buffer);

            payment_path = blockBlobClient.url;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/enroll_new_student`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                address,
                email,
                OL_path,
                AL_path,
                payment_path,
                program_id
            })
        });

        if (response.status !== 200) {
            throw new Error('Failed to enroll new student');
        }

        return await response.json();
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}

export async function registerCurrentStudent({data, student_id} : {data: FormData, student_id: string}) {
    try {
        const receipt_doc = data.get('receipt_doc');

        let receipt_path = '';

        if (receipt_doc) {
            const file: File = receipt_doc as unknown as File;
            const fileExtension = file.name.split('.').pop();
            const newFilename = `${student_id}-receipt-${Date.now()}.${fileExtension}`;
            const blockBlobClient = newStudentMaterialsContainerClient.getBlockBlobClient(newFilename);

            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            await blockBlobClient.uploadData(buffer);

            receipt_path = blockBlobClient.url;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/register_current_student_to_semester`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                student_id,
                receipt_path
            })
        });

        if (response.status !== 200) {
            throw new Error('Failed to register current student');
        }

        return await response.json();
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}