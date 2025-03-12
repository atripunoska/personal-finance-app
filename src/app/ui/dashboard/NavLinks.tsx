"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { fetchPages } from "@/lib/data";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function NavLinks() {
  const pathname = usePathname();

  const [pages, setPages] = useState<
    { name: string; path: string; icon: string }[]
  >([]);

  useEffect(() => {
    async function fetchSidebarPages() {
      const res = await fetchPages();
      setPages(res);
    }
    fetchSidebarPages();
  }, []);

  return (
    <>
      {pages?.map((link) => {
        return (
          <Link
            key={link?.name}
            href={link?.path}
            className={clsx(
              "flex flex-col md:flex-row h-[48px] grow items-center justify-center gap-2 rounded-t-md md:rounded-none p-2 md:p-3 text-sm font-medium hover:bg-white hover:text-gray-900 hover:ml-0 hover:border-b-4 hover:border-b-green md:flex-none md:justify-start md:p-4 hover:border-t-0 md:mr-4 md:mb-3",
              {
                "bg-white text-gray-900 border-b-4 border-b-green md:border-l-4 md:border-l-green md:border-t-0 md:border-r-0 md:border-b-0 md:rounded-l-none":
                  pathname === link.path,
                "text-gray-300 bg-gray-900": pathname !== link.path,
              }
            )}
          >
            <Image
              src={`/${link.icon}`}
              width={24}
              height={24}
              alt={link.name + " icon"}
              style={
                pathname === link.path
                  ? {
                      filter:
                        "invert(41%) sepia(35%) saturate(737%) hue-rotate(128deg) brightness(91%) contrast(66%)",
                    }
                  : {}
              }
              className="w-4 h-4 md:w-6 md:h-6"
            />
            <p className="hidden sm:block text-xs md:text-[16px] font-public-sans font-bold ">
              {link.name}
            </p>
          </Link>
        );
      })}
    </>
  );
}
