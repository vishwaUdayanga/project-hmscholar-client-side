'use client'

import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import Image from 'next/image';
import clsx from 'clsx';

export default function SideNav({isToggle, actor}: {isToggle: boolean, actor: string}) {
  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  }
  return (
    <div className="flex h-full flex-col px-3 py-2 md:px-2 ease-in-out">
      <Link
        className="mb-2 flex h-10 items-center rounded-md p-2 md:h-16"
        href="/"
      >
        <div className="w-32 text-white md:w-40 flex items-center gap-3">
            <Image src="/landing-page/logo.svg" alt="IHMA Logo" width={27} height={27} />
            <p className={clsx(
              'text-black font-bold ease-in-out duration-300 flex-none',
              {
                'md:hidden': !isToggle
              }
            )}>IHMA <span className='text-slate-400'>LMS</span></p>
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks isToggle={isToggle} actor={actor} />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
            {/* logout */}
            <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm hover:bg-slate-200 hover:text-black md:flex-none md:justify-start md:p-2 md:px-3" onClick={logout} >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#DD3545" className="bi bi-power" viewBox="0 0 16 16">
                  <path d="M7.5 1v7h1V1z"/>
                  <path d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812"/>
                </svg>
                <p className={clsx(
                    'text-black font-bold ease-in-out duration-300 flex-none',
                    {
                        'md:hidden': !isToggle
                    }
                )}>Logout</p>
            </button> 
      </div>
    </div>
  );
}