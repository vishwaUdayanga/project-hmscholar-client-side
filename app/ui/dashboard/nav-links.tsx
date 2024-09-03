'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Image from 'next/image';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: '/dashboard/home.png' },
  {
    name: 'My Courses',
    href: '/dashboard/courses',
    icon: '/dashboard/course.png',
  },
  { name: 'My Account', href: '/dashboard/account', icon: '/dashboard/user.png' },
];

export default function NavLinks({isToggle}: {isToggle: boolean}) {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm hover:bg-slate-200 hover:text-black md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-slate-200 text-black font-bold': pathname === link.href,
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
