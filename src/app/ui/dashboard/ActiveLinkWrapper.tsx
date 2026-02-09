'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Image from 'next/image';

export default function ActiveLinkWrapper({
  link,
}: {
  link: { name: string; path: string; icon: string };
}) {
  const pathname = usePathname();
  const isActive = pathname === link.path;

  return (
    <Link
      href={link.path}
      className={clsx(
        'flex flex-col md:flex-row h-[48px] grow items-center justify-center gap-2 rounded-t-md md:rounded-none p-2 md:p-3 text-sm font-medium hover:bg-white dark:hover:bg-grey-500 hover:text-gray-900 dark:hover:text-foreground hover:ml-0 md:rounded-tr-md md:rounded-br-md md:flex-none md:justify-start md:p-4 hover:border-t-0 md:mr-4 md:mb-3 md:hover:border-l-4 md:hover:border-l-green hover:border-b-4 hover:border-b-green md:hover:border-b-0',
        {
          'bg-white dark:bg-grey-500 text-gray-900 dark:text-foreground border-b-4 border-b-green md:border-t-0 md:border-r-0 md:border-b-0 md:rounded-l-none md:border-l-4 md:border-l-green':
            isActive,
          'text-gray-300 bg-gray-900 dark:bg-grey-900': !isActive,
        }
      )}
    >
      <Image
        src={`/${link.icon}`}
        width={24}
        height={24}
        alt={`${link.name} icon`}
        loading="lazy"
        style={
          isActive
            ? {
                filter:
                  'invert(41%) sepia(35%) saturate(737%) hue-rotate(128deg) brightness(91%) contrast(66%)',
              }
            : {}
        }
        className="w-4 h-4 md:w-6 md:h-6"
      />
      <p className="hidden sm:block text-xs md:text-[16px] font-bold">
        {link.name}
      </p>
    </Link>
  );
}
