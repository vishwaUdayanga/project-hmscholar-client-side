export async function deleteSection({ section_id } : { section_id: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/delete-section/${section_id}`, {
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