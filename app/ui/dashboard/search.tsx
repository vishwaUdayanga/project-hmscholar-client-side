'use client';
import { useDebouncedCallback } from 'use-debounce';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Search({ placeholder, value }: { placeholder: string, value: string }) {
    const [inputValue, setInputValue] = useState(value || '');
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
    
    useEffect(() => {
    setInputValue(value);
    }, [value]);
  
    return (
        <div className="flex flex-col gap-4 items-center md:flex-row w-full lg:w-6/12">
            <input
                className="block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-slate-200 placeholder:text-gray-500 bg-transparent"
                placeholder={placeholder}
                value={inputValue} 
                onChange={handleChange}
            />
        </div>
    );
}
