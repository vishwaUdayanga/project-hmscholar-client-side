export async function createSection({ section_name, section_description, course_id } : { section_name: string, section_description: string, course_id: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/add_section`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ section_name, section_description, course_id: course_id })
        });
        return response;
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