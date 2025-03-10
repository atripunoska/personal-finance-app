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
              "flex h-[48px] grow items-center justify-center gap-2 e rounded-md p-3 text-sm font-medium hover:bg-white hover:text-gray-900 hover:ml-0 hover:border-4 hover:border-l-green md:flex-none md:justify-start md:p-2 md:px-3 ",
              {
                "bg-white text-gray-900 border-4 border-l-green border-t-0 border-r-0 border-b-0":
                  pathname === link.path,
                "text-white bg-gray-900": pathname !== link.path,
              }
            )}
          >
            <Image
              src={`/${link.icon}`}
              width={24}
              height={24}
              alt={link.name}
              style={
                pathname === link.path
                  ? {
                      filter:
                        "invert(41%) sepia(35%) saturate(737%) hue-rotate(128deg) brightness(91%) contrast(66%)",
                    }
                  : {}
              }
            />
            <p className="hidden md:block text-[16px] font-public-sans font-bold ">
              {link.name}
            </p>
          </Link>
        );
      })}
    </>
  );
}
