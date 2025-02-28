"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { name: "Overview", href: "/dashboard" },
  {
    name: "Transactions",
    href: "/dashboard/transactions",
  },
  {
    name: "Budgets",
    href: "/dashboard/budgets",
  },

  { name: "Pots", href: "/dashboard/pots" },
  {
    name: "Recurring Bills",
    href: "/dashboard/recurring-bills",
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 e rounded-md p-3 text-sm font-medium hover:bg-white hover:text-gray-900 md:flex-none md:justify-start md:p-2 md:px-3 ",
              {
                "bg-white text-gray-900": pathname === link.href,
                "text-white bg-gray-900": pathname !== link.href,
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
