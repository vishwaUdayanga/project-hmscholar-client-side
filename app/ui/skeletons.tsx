export function CoursesSkeleton() {
    return (
        <div className="flex flex-col gap-6 w-full lg:flex-row lg:gap-16">
            {Array.from({ length: 2 }).map((_, semesterIdx) => (
                <div key={semesterIdx} className="w-full lg:w-4/12">
                    <div className="bg-gray-200 animate-pulse h-4 w-3/4 rounded mb-4"></div>
                    <div className="flex flex-col gap-5">
                        {Array.from({ length: 4 }).map((_, courseIdx) => (
                            <div key={courseIdx} className="flex gap-7 items-center border-b border-b-slate-200 pb-3 justify-between">
                                <div className="flex gap-3 items-center w-80">
                                    <div className="relative w-14 h-10 rounded overflow-hidden bg-gray-300 animate-pulse"></div> 
                                    <div className="flex flex-col gap-2 w-full">
                                        <div className="bg-gray-300 animate-pulse h-4 w-3/4 rounded"></div> 
                                        <div className="bg-gray-300 animate-pulse h-3 w-1/2 rounded"></div> 
                                    </div>
                                </div>
                                <div className="bg-gray-300 animate-pulse h-4 w-24 rounded"></div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export function CourseSkeletonPortal() {
    return (
        <div className="flex flex-col gap-6 w-full lg:gap-16">
            {Array.from({ length: 2 }).map((_, semesterIdx) => (
                <div key={semesterIdx} className="w-full">
                    <div className="bg-gray-200 animate-pulse h-4 w-3/4 rounded mb-4"></div>
                    <div className="flex flex-col gap-5">
                        {Array.from({ length: 4 }).map((_, courseIdx) => (
                            <div key={courseIdx} className="flex gap-7 items-center border-b border-b-slate-200 pb-3 justify-between">
                                <div className="flex gap-3 items-center w-80">
                                    <div className="relative w-14 h-10 rounded overflow-hidden bg-gray-300 animate-pulse"></div> 
                                    <div className="flex flex-col gap-2 w-full">
                                        <div className="bg-gray-300 animate-pulse h-4 w-3/4 rounded"></div> 
                                        <div className="bg-gray-300 animate-pulse h-3 w-1/2 rounded"></div> 
                                    </div>
                                </div>
                                <div className="bg-gray-300 animate-pulse h-4 w-24 rounded"></div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export const AnnouncementSkeleton = () => {
    return (
        <div className="w-full">
            <div className="w-full flex items-center justify-between border-b-slate-300 border-b py-3 cursor-pointer flex-wrap gap-5 animate-pulse">
                <div className="flex items-center gap-4">
                    <div className="relative w-10 h-10 rounded-full bg-gray-300"></div>
                    <div>
                        <p className="text-sm font-bold text-gray-300 bg-gray-200 h-4 rounded w-40 mb-2"></p>
                        <p className="text-xs text-gray-300 bg-gray-200 h-3 rounded w-20"></p>
                    </div>
                </div>
                <div className="flex-1">
                    <p className="text-sm text-gray-300 bg-gray-200 h-4 rounded w-3/4 mb-2"></p>
                    <p className="text-xs text-gray-300 bg-gray-200 h-3 rounded w-1/2 mb-2"></p>
                    <div className="rounded-lg px-3 border border-gray-200 bg-gray-200 h-4 w-fit mt-1"></div>
                </div>
                <div>
                    <p className="text-xs text-gray-300 bg-gray-200 h-3 rounded w-20"></p>
                </div>
            </div>
            <div className="w-full flex items-center justify-between border-b-slate-300 border-b py-3 cursor-pointer flex-wrap gap-5 animate-pulse">
                <div className="flex items-center gap-4">
                    <div className="relative w-10 h-10 rounded-full bg-gray-300"></div>
                    <div>
                        <p className="text-sm font-bold text-gray-300 bg-gray-200 h-4 rounded w-40 mb-2"></p>
                        <p className="text-xs text-gray-300 bg-gray-200 h-3 rounded w-20"></p>
                    </div>
                </div>
                <div className="flex-1">
                    <p className="text-sm text-gray-300 bg-gray-200 h-4 rounded w-3/4 mb-2"></p>
                    <p className="text-xs text-gray-300 bg-gray-200 h-3 rounded w-1/2 mb-2"></p>
                    <div className="rounded-lg px-3 border border-gray-200 bg-gray-200 h-4 w-fit mt-1"></div>
                </div>
                <div>
                    <p className="text-xs text-gray-300 bg-gray-200 h-3 rounded w-20"></p>
                </div>
            </div>
        </div>
    );
}

type ProgramCardSkeletonProps = {
    key?: string; // Optional key prop if you are mapping through a list
};

const ProgramCardSkeleton = ({ key }: ProgramCardSkeletonProps) => {
    return (
        <div className="flex items-center justify-center">
            <div className="flex border rounded-lg shadow-md p-6 bg-white w-full max-w-4xl mt-4 mb-4 relative animate-pulse">
                {/* University Image Skeleton */}
                <div className="flex-shrink-0">
                    <div className="w-32 h-32 bg-gray-300 rounded-lg mr-6"></div>
                </div>

                {/* Program Details Skeleton */}
                <div className="flex flex-col justify-between flex-grow">
                    <div className="h-6 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded mb-3"></div>
                    <div className="h-4 bg-gray-300 rounded mb-3"></div>
                </div>

                {/* Button Skeleton */}
                <div className="absolute bottom-6 right-6">
                    <div className="w-24 h-10 bg-gray-300 rounded"></div>
                </div>
            </div>
        </div>
    );
};

export default ProgramCardSkeleton;