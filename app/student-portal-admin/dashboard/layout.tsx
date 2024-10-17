'use client'

import React from 'react';
import withAuth from '@/app/protection/protect';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { useEffect ,useState } from 'react';
import PortalSideNav from '@/app/ui/dashboard/portal-sidenav';
import { getUserDetails } from '@/app/api/student-portal/new-student/data';

type User = {
    name : string,
    image_path : string
}

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const [toggle, setToggle] = useState(true);
    const [user, setUser] = useState<User>({name: '', image_path: ''});
    const [loading, setLoading] = useState(true);

    const handleToggle = () => {
        setToggle(!toggle);
    }

    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.log('No token found');
            } else {
                try {
                    const decodedToken = JSON.parse(atob(token.split('.')[1]));
                    const email = decodedToken.sub;
                    if (email) {
                        const response = await getUserDetails({email});
                        const result: User = await response.json();
                        
                        setUser(result);
                        setLoading(false);
                    } else {
                        console.error('Email is undefined');
                    }
                } catch (error) {
                    console.error('Error decoding token:', error);
                    localStorage.removeItem('token');
                }
            }
        };
        verifyToken();
    }, [])
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className={
            clsx(
                'w-full transition-width duration-300 ease-in-out flex-none',
                { 'md:w-20': !toggle,
                'md:w-64': toggle
                }
            )
            } 
        >
            <PortalSideNav isToggle={toggle} actor='admin' />
        </div>
        <div className="flex-grow md:overflow-y-auto">
            <div className="w-full justify-between items-center p-4 hidden md:flex">
            <Image src="/dashboard/menu.png" alt="IHMA Menu" width={15} height={15} onClick={handleToggle} className="cursor-pointer"/>
            <div className="flex gap-6 items-center">
                <Image src="/dashboard/notification.png" alt="IHMA Notification" width={15} height={15} />
                { loading ? <p>Loading...</p> :
                    <Link
                    href="/dashboard" 
                    className="flex gap-2 items-center"
                    >
                        <div
                            className='relative w-8 h-8 rounded-full overflow-hidden'
                        >
                            <Image
                            src={user?.image_path ? `${user.image_path}?sp=r&st=2024-10-11T03:23:52Z&se=2024-10-26T11:23:52Z&spr=https&sv=2022-11-02&sr=c&sig=j9bm0r%2F1ublueF5hAeTTja5w7EUdkalfzZo%2BNw0zzZM%3D` : '/dashboard/user.jpg'}
                            alt={user.name}
                            fill
                            style={{ objectFit: 'cover' }}
                            className="rounded-full"
                            />
                        </div>
                        <p className="text-sm font-bold">{user.name}</p>
                    </Link>
                }
            </div>
            </div>
            {children}
        </div>
        </div>
    );
};

export default withAuth(DashboardLayout);