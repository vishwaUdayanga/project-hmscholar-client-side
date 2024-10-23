import { useRouter } from "next/router"; //import useRouter to programmatically navigate

type ProgramCardProps = {
    program_id: string;
    program_name: string;
    duration: string;
    universityImage: string; // Path to the university image
};

const ProgramCard = ({ program_id, program_name, duration, universityImage }: ProgramCardProps) => {
    // const router = useRouter(); //initialize router

    return (
        <div className="flex flex-col sm:flex-row items-center justify-center">
            <div className="flex border rounded-lg shadow-md p-6 bg-white w-full sm:max-w-md md:max-w-lg lg:max-w-2xl  xl:max-w-4xl mt-4 mb-4 relative">
                {/* University Image */}
                <div className="flex-shrink-0 mb-4 sm:mb-0">
                    {/* <img
                        src={universityImage}
                        alt="University"
                        className="w-32 h-32 object-cover rounded-lg mr-0 sm:mr-6"
                    /> */}
                </div>

                {/* Program Details */}
                <div className="flex flex-col justify-betweenr flex-grow">
                    <h3 className="font-bold  text-xl md:text-2xl text-gray-800 mb-2">{program_name}</h3>
                    <p className="text-gray-600 mb-3">{program_name}</p>
                    <p className="text-gray-600 mb-3">Duration: {duration}</p>
                </div>

                {/* Read More Button */}
                <div className="mt-4 sm:mt-0 sm:absolute sm:bottom-6 sm:right-6">
                    <button
                            onClick={() => {
                                console.log(`Read more about ${program_name}`);
                            }} className="flex items-center bg-gray-500 text-white text-s px-4 py-2 rounded hover:bg-gray-800 hover:text-yellow-400" >
                                <span>Read More</span> 
                                <svg
                                    className="w-4 h-4 ml-1" // Added margin to the left of the arrow
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
                                </svg>
                    </button>
                </div>
                
            </div>
        </div>
    );
};

export default ProgramCard;
