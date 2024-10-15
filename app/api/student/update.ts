// 'use server'

// import { BlobServiceClient } from "@azure/storage-blob";

// const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING || '';
// // const AZURE_STORAGE_CONTAINER_NAME = process.env.AZURE_STORAGE_CONTAINER_NAME || '';
// const AZURE_STORAGE_LECTURER_PICTURE_NAME = process.env.AZURE_STORAGE_LECTURER_PICTURE_NAME || '';
// // const AZURE_STORAGE_COURSE_SETTINGS = process.env.AZURE_STORAGE_COURSE_SETTINGS || ''

// const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
// // const containerClient = blobServiceClient.getContainerClient(AZURE_STORAGE_CONTAINER_NAME);
// const containerClientProfilePictures = blobServiceClient.getContainerClient(AZURE_STORAGE_LECTURER_PICTURE_NAME);
// // const containerClientCourseSettings = blobServiceClient.getContainerClient(AZURE_STORAGE_COURSE_SETTINGS);

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

// Function to update student image
// export async function updateStudentImage({ student_id, image_data }: { student_id: string, image_data: FormData }) {
//     try {
//         const file: File | null = image_data.get('file') as unknown as File;
//         const file_path = image_data.get('file_path') as string | undefined;
//         let student_img = '';

//         if (file) {
//             try {
//                 // If the file path exists, delete the old image from Azure Blob Storage
//                 if (file_path) {
//                     const existingFilename = file_path.split('/').pop();
//                     if (existingFilename) {
//                         const blockBlobClient = containerClientProfilePictures.getBlockBlobClient(existingFilename);
//                         console.log('Deleting old file:', existingFilename);
//                         await blockBlobClient.delete();
//                     }
//                 }

//                 // Upload the new file to Azure Blob Storage
//                 const fileExtension = file.name.split('.').pop();
//                 const newFilename = `${student_id}-${Date.now()}.${fileExtension}`;
//                 const blockBlobClient = containerClientProfilePictures.getBlockBlobClient(newFilename);

//                 console.log('Uploading new file:', newFilename);

//                 const arrayBuffer = await file.arrayBuffer();
//                 const buffer = Buffer.from(arrayBuffer);

//                 await blockBlobClient.uploadData(buffer);

//                 const fileUrl = blockBlobClient.url;
//                 student_img = fileUrl;
//             } catch (error) {
//                 console.error('Error uploading file to Azure Blob Storage:', error);
//                 throw error;
//             }

//             // Update the student image URL in the database
//             try {
//                 console.log('Updating student image URL in API');
//                 const response = await fetch(`${process.env.NEXT_PUBLIC_API}/edit-student-image/${student_id}`, {
//                     method: 'PUT',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({ student_img })
//                 });
//                 const result = await response.json();
//                 return result;
//             } catch (error) {
//                 console.error('Error occurred while updating student image URL:', error);
//                 throw error;
//             }
//         }
//     } catch (error) {
//         console.error('General error in updateStudentImage:', error);
//         throw error;
//     }
// }

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

