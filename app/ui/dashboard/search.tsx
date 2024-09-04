'use client';
import { useDebouncedCallback } from 'use-debounce';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { keyCourses } from '@/app/lib/placeholders';

export default function Search({ placeholder }: { placeholder: string }) {
    const [inputValue, setInputValue] = useState('');
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        handleSearch(newValue);
    };

    const handleTagClick = (term: string) => {
        setInputValue(term);
        handleSearch(term);
    };

    return (
        <div className='flex gap-4 items-center flex-col lg:flex-row mb-5 w-full'>
            <div className="flex flex-col gap-4 items-center md:flex-row w-full lg:w-6/12">
                <input
                    className="block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-slate-200 placeholder:text-gray-500 bg-transparent"
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={handleChange}
                />
            </div>
            <div className="flex gap-4 flex-wrap">
                {keyCourses.map((course) => (
                    <div
                        key={course.id}
                        className={`px-3 py-1 ${course.background} ${course.text} rounded-xl text-xs cursor-pointer`}
                        onClick={() => handleTagClick(course.title)}
                    >
                        <p>{course.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}