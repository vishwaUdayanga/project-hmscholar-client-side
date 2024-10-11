'use client'

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { useState } from 'react';
import SideNavPortal from '@/app/ui/dashboard/sidenavportal';

const NstudentdLayout = ({ children }: { children: React.ReactNode }) => {
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
            <SideNavPortal isToggle={toggle} actor='new_student' />
        </div>
        <div className="flex-grow md:overflow-y-auto">
            <div className="w-full justify-between items-center p-4 hidden md:flex">
            <Image src="/dashboard/menu.png" alt="IHMA Menu" width={15} height={15} onClick={handleToggle} className="cursor-pointer"/>
            <div className="flex gap-6 items-center">
            <Link
                href="/portal" 
                className="flex gap-2 items-center">
            </Link>   
            </div>
            </div>
            {children}
        </div>
        </div>
    );
};

export default(NstudentdLayout);