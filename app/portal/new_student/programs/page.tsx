'use client';
import getProgramDetails from "@/app/api/student-portal/new-student/data";
import { useEffect, useState } from "react";
import ProgramCard from '@/app/ui/portal/programCard';
import ProgramCardSkeleton from '@/app/ui/skeletons';

type Program = {
    program_id: string;
    program_name: string;
    duration: string;
};

export default function Programs() {
    const [programDetails, setProgramDetails] = useState<Program[]>([]); // Update state to handle an array of programs
    const [loading, setLoading] = useState(true); // Add a loading state

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const response = await getProgramDetails();
                console.log('API Status:', response.status); // Log status

                if (!response.ok) {
                    throw new Error(`Error fetching data: ${response.statusText}`);
                }

                const data: Program[] = await response.json(); // Expect an array of programs
                
                // Log the response to see what is being returned
                console.log('API Response:', data);

                setProgramDetails(data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch program details:", error);
                setLoading(false); // Stop loading even on error
            }
        };

        fetchPrograms();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center">
            <div className="grid grid-cols-1 gap-1 w-1/2">
                    <ProgramCardSkeleton/>
                    <ProgramCardSkeleton/>
                    <ProgramCardSkeleton/>
            </div>
    </div>

    );

    return (
        <div className="flex items-center justify-center">
            {loading ? (
                <></>
                
            ) : programDetails.length > 0 ? (
                <div className="grid grid-cols-1 gap-1 w-1/2">
                    {programDetails.map((program) => (
                        <ProgramCard
                            key={program.program_id}
                            program_id={program.program_id}
                            program_name={program.program_name}
                            duration={program.duration}
                            universityImage="/portal/universities/logo1.jpg" // Add the image URL here
                            //universityImage={program.universityImage}
                        />
                    ))}
                </div>
            ) : (
                <p>No programs available.</p>
            )}
        </div>
    );
}
