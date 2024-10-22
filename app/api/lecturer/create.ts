'use server'

import { BlobServiceClient } from "@azure/storage-blob";

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING || '';
const AZURE_STORAGE_CONTAINER_NAME = process.env.AZURE_STORAGE_CONTAINER_NAME || '';

const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient(AZURE_STORAGE_CONTAINER_NAME);

// export async function createSection({ section_name, section_description, course_id } : { section_name: string, section_description: string, course_id: string }) {
//     try {
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API}/add_section`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ section_name, section_description, course_id: course_id })
//         });
//         return response;
//     } catch (error) {
//         console.error('Error occurred:', error);
//         throw error;
//     }
// }

export async function createSection({ data, courseId }: {data: FormData, courseId: string}) {
    try {
        const section_name = data.get('title');
        const section_description = data.get('description');
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/add_section`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ section_name: section_name, section_description: section_description, course_id: courseId })
        });
        if (response.status !== 200) {
            throw new Error('Failed to create section');
        }
        const section = await response.json();

        for (let i = 0; i < 5; i++) {
            const file: File | null = data.get(`file_${i}`) as unknown as File;
            const fileName = data.get(`file_name_${i}`);

            if (file && fileName) {
                const fileExtension = file.name.split('.').pop();
                const newFilename = `${section.section_id}-${Date.now()}-${i}.${fileExtension}`;
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
                        section_id: section.section_id
                    })
                });

                if (fileResponse.status !== 200) {
                    throw new Error('Failed to create course material');
                }
            }
        }

        return section;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}

export async function createAnnouncement({ announcement_title, announcement_description, course_id } : { announcement_title: string, announcement_description: string, course_id: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/course/add_announcement`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ announcement_title, announcement_description, course_id: course_id })
        });
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}

export async function createQuiz({
        quiz_name,
        quiz_duration,
        quiz_total_marks,
        quiz_description,
        quiz_password,
        quiz_number_of_questions,
        questions, sectionId } : { quiz_name: string,
            quiz_duration: number,
            quiz_total_marks: number,
            quiz_description: string, 
            quiz_password: string, 
            quiz_number_of_questions: number, 
            questions: any[], 
            sectionId: string | null }) {
    try {
        const section_id = sectionId || '';
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/create-quiz`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quiz_name, quiz_duration, quiz_total_marks, quiz_description, quiz_password, quiz_number_of_questions, questions, section_id })
        });
        if (response.status !== 200) {
            throw new Error('Failed to create section');
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}

export async function enrollStudentToCourse({ student_id, course_id } : { student_id: string, course_id: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/enroll-student/${student_id}/${course_id}`, {
            method: 'POST',
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