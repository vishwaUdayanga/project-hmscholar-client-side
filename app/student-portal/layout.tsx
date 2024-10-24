'use client'

import React from 'react';
import Image from 'next/image'; 

const NewStudentPortalLayout = ({children} : {children: React.ReactNode}) => {
    return (
        <div>
            <div className="flex items-center flex-col">
                <div className='w-full flex justify-between p-5 md:w-10/12'>
                    <div className='flex gap-3 items-center'>
                        <Image src="/landing-page/logo.svg" alt="IHMA Logo" width={30} height={32} />
                        <h2 className='text-lg font-bold'><span className='text-slate-900'>IHMA</span> Student Portal</h2>
                    </div>
                    <div className='hidden md:block'>
                        <p>Find the best path that you seek!</p>
                    </div>
                </div>
                <div className='w-full md:w-10/12 p-5'>
                    {children}
                </div>
                
            </div>
        </div>
    )
}

export default NewStudentPortalLayout;