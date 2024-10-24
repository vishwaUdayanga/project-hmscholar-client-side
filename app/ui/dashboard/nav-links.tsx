'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react'
import { useEffect, useState } from 'react';
// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.


const student_links = [
  { name: 'Home', 
    href: '/dashboard', 
    icon: '/dashboard/home.png' },
  {
    name: 'My Courses',
    href: '/dashboard/course',
    icon: '/dashboard/course.png',
  },
  { name: 'My Account', 
    href: '/dashboard/student-profile',
    icon: '/dashboard/user.png' },
];

const lecturer_links = [
  { name: 'Home', href: '/lecturer/dashboard', icon: '/dashboard/home.png' },
  {
    name: 'My Courses',
    href: '/lecturer/dashboard/my-courses',
    icon: '/dashboard/course.png',
  },
  { name: 'My Account', href: '/lecturer/dashboard/my-account', icon: '/dashboard/user.png' },
];

const admin_links = [
  { name: 'Courses', href: '/admin/dashboard', icon: '/dashboard/home.png' },
  {
    name: 'Lecturers',
    href: '/admin/dashboard/lecturers',
    icon: '/dashboard/course.png',
  },
  { name: 'Students', href: '/admin/dashboard/students', icon: '/dashboard/user.png' },
  { name: 'Manage Content', href: '/admin/dashboard/manage-content', icon: '/dashboard/home.png' },
];

const nportal_links = [
  { name: 'Program1', 
    href: '/portal', 
    icon: '/portal/programs/1.png' },
  {
    name: 'Program2',
    href: '/portal',
    icon: '/portal/programs/2.png',
  },
  { name: 'Program3', 
    href: '/portal',
    icon: '/portal/programs/3.png' },
];


export default function NavLinks({isToggle, actor}: {isToggle: boolean, actor: string}) {
  const pathname = usePathname();
  const links = actor === 'student' ? student_links : actor === 'lecturer' ? lecturer_links : actor === 'admin' ? admin_links : nportal_links;
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
