export async function deleteLecturer({ lecturerId }: { lecturerId: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/admin/delete_lecturer/${lecturerId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}