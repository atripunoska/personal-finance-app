import NavLinks from '@/app/ui/dashboard/NavLinks';
import Image from 'next/image';
import { logout } from '@/app/(auth)/logout/actions';
import { Suspense } from 'react';
import NavLinksSkeleton from './NavLinksSkeleton';

export default function Sidemenu() {
  return (
    <div className="flex h-full md:flex-col pt-3 md:pt-0 md:py-4  bg-gray-900 rounded-br-md rounded-tr-md">
      <Image
        src="/./assets/images/logo-large.svg"
        height={22}
        width={121}
        alt="Finance Logo"
        className="pb-8 pt-4 pl-4 px-3 hidden md:block"
        loading="lazy"
      />
      <Suspense fallback={<NavLinksSkeleton />}>
        <NavLinks />
      </Suspense>
      <div className="hidden h-auto w-full grow rounded-md bg-gray-900 md:block"></div>
      {/* <form>
        <button
          className="mx-3 flex  h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-bold hover:bg-white hover:text-gray-900 md:flex-none md:justify-start md:p-2 md:px-3 cursor-pointer"
          aria-label="Sign out"
          formAction={logout}
        >
          <div className="text-xs md:text-sm">Sign Out</div>
        </button>
      </form> */}
    </div>
  );
}
