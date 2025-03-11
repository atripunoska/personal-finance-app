import NavLinks from "@/app/ui/dashboard/nav-links";
import { signOut } from "../../../../auth";
import Image from "next/image";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-gray-900 rounded-br-md rounded-tr-md">
      <Image
        src="/./assets/images/logo-large.svg"
        height={22}
        width={121}
        alt="Finance Logo"
        className="pb-8 pt-4 pl-4"
      />
      <NavLinks />
      <div className="hidden h-auto w-full grow rounded-md bg-gray-900 md:block"></div>

      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/login" });
        }}
      >
        <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
          <div className="hidden md:block">Sign Out</div>
        </button>
      </form>
    </div>
  );
}
