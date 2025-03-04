"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { fetchPages } from "@/lib/data";
import { useState, useEffect } from "react";

export default function NavLinks() {
  const pathname = usePathname();

  const [pages, setPages] = useState<{ name: string; path: string }[]>([]);

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
              "flex h-[48px] grow items-center justify-center gap-2 e rounded-md p-3 text-sm font-medium hover:bg-white hover:text-gray-900 md:flex-none md:justify-start md:p-2 md:px-3 ",
              {
                "bg-white text-gray-900": pathname === link.path,
                "text-white bg-gray-900": pathname !== link.path,
              }
            )}
          >
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
