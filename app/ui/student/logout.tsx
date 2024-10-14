import React from 'react';
import { useRouter } from 'next/navigation';

const LogoutButton: React.FC = () => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/');
    };

    return (
        <button onClick={handleLogout} className='rounded-xl text-xs border-white border cursor-pointer px-3 py-1 text-white bg-black hover:bg-white hover:text-black hover:border-black'>
            Logout
        </button>

    );
};

export default LogoutButton;
