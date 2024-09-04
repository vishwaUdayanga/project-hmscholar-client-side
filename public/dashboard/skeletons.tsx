export function CoursesSkeleton() {
    return (
        <div className="flex flex-col gap-6 w-full lg:flex-row lg:gap-16">
            {Array.from({ length: 2 }).map((_, semesterIdx) => (
                <div key={semesterIdx} className="w-full lg:w-4/12">
                    <div className="bg-gray-200 animate-pulse h-4 w-3/4 rounded mb-4"></div> {/* Semester name placeholder */}
                    <div className="flex flex-col gap-5">
                        {Array.from({ length: 4 }).map((_, courseIdx) => (
                            <div key={courseIdx} className="flex gap-7 items-center border-b border-b-slate-200 pb-3 justify-between">
                                <div className="flex gap-3 items-center w-80">
                                    <div className="relative w-14 h-10 rounded overflow-hidden bg-gray-300 animate-pulse"></div> {/* Image placeholder */}
                                    <div className="flex flex-col gap-2 w-full">
                                        <div className="bg-gray-300 animate-pulse h-4 w-3/4 rounded"></div> {/* Title placeholder */}
                                        <div className="bg-gray-300 animate-pulse h-3 w-1/2 rounded"></div> {/* Lecturer placeholder */}
                                    </div>
                                </div>
                                <div className="bg-gray-300 animate-pulse h-4 w-24 rounded"></div> {/* Credits placeholder */}
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