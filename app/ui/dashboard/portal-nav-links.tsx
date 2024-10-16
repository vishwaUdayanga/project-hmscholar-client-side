'use client';
import Link from 'next/link';
import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';
import React from 'react';


const student_links = [
  { name: 'Upcoming semester', 
    href: '/current-student-portal/dashboard', 
    icon: '/dashboard/home.png'},
];

const admin_links = [
  {
    name: 'New students',
    href: '/admin-portal/dashboard',
    icon: '/dashboard/course.png',
  },
  {
    name: 'Current students',
    href: '/admin-portal/dashboard/current-students',
    icon: '/dashboard/user.png',
  },
  {
    name: 'Programs',
    href: '/admin-portal/dashboard/programs',
    icon: '/dashboard/home.png',
  },
];


export default function PortalNavLinks({isToggle, actor}: {isToggle: boolean, actor: string}) {
  const links = actor === 'student' ? student_links : admin_links;
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      {links.map((link, index) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            onClick={() => setActiveIndex(index)}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm hover:bg-slate-200 hover:text-black md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-slate-200 text-black font-bold': index === activeIndex,
                'md:items-center md:justify-center': !isToggle
              },
            )}
          >
            <Image src={link.icon} alt={link.name} width={15} height={15} />
            <p className={clsx(
              "hidden md:block ease-in-out duration-300 flex-none",
              {
                'md:hidden': !isToggle
              }
            )}>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
