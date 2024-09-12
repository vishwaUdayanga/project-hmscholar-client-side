export async function updateSection({ section_id, section_name, section_description } : { section_id: string, section_name: string, section_description: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/edit-section/${section_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ section_name, section_description })
        });
        return response;
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