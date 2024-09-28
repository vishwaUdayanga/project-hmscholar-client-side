'use client'
import React from 'react';
import withAuth from '@/app/protection/protect';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { useState } from 'react';
import SideNav from '@/app/ui/dashboard/sidenav';
import Profile from '../ui/student/profile';

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
            <SideNav isToggle={toggle} actor='student' />
        </div>
        <div className="flex-grow md:overflow-y-auto">
            <div className="w-full justify-between items-center p-4 hidden md:flex">
            <Image src="/dashboard/menu.png" alt="IHMA Menu" width={15} height={15} onClick={handleToggle} className="cursor-pointer"/>
            <Profile/>
            </div>
            {children}
        </div>
        </div>
    );
};

export default withAuth(DashboardLayout);