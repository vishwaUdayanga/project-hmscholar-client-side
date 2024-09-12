'use client'

import React from 'react';
import withAuth from '@/app/protection/protect';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { useState } from 'react';
import SideNav from '@/app/ui/dashboard/sidenav';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const [toggle, setToggle] = useState(true);

    const handleToggle = () => {
        setToggle(!toggle);
    }
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
            <SideNav isToggle={toggle} actor='admin' />
        </div>
        <div className="flex-grow md:overflow-y-auto">
            <div className="w-full justify-between items-center p-4 hidden md:flex">
            <Image src="/dashboard/menu.png" alt="IHMA Menu" width={15} height={15} onClick={handleToggle} className="cursor-pointer"/>
            <div className="flex gap-6 items-center">
                <Image src="/dashboard/notification.png" alt="IHMA Notification" width={15} height={15} />
                <Link
                href="/dashboard" 
                className="flex gap-2 items-center"
                >
                <div
                    className='relative w-8 h-8 rounded-full overflow-hidden'
                >
                    <Image
                    src='/dashboard/user.jpg'
                    alt={'Amanda Peris'}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-full"
                    />
                </div>
                <p className="text-sm font-bold">Amanda Peris</p>
                </Link>
            </div>
            </div>
            {children}
        </div>
        </div>
    );
};

export default withAuth(DashboardLayout);