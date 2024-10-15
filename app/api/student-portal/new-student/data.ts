// export default async function getProgramDetails() {
//     try {
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API}/student-portal/programs`);
//         return response;
//     } catch (error) {
//         console.error('Error occurred:', error);
//         throw error;
//     }
// }

export async function getProgramDetails({program_id}: {program_id: string}) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/student-portal/program-details/${program_id}`);
        return response;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}


// export default async function getProgramDetails() {
//     try {
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API}/student-portal/programs`);

//         // Check if the response was successful

//         // Parse the JSON and return it
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Error occurred:', error);
//         throw error;
//     }
// }

