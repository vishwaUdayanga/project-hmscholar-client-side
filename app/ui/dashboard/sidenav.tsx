import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import Image from 'next/image';
import clsx from 'clsx';

export default function SideNav({isToggle, actor}: {isToggle: boolean, actor: string}) {
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
        {/* <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form> */}
      </div>
    </div>
  );
}