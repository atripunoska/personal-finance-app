import NavLinks from "@/app/ui/dashboard/NavLinks";
import { signOut } from "../../../../auth";
import Image from "next/image";

export default function Sidenav() {
  return (
    <div className="flex h-full md:flex-col pt-3 md:pt-0 md:py-4  bg-gray-900 rounded-br-md rounded-tr-md">
      <Image
        src="/./assets/images/logo-large.svg"
        height={22}
        width={121}
        alt="Finance Logo"
        className="pb-8 pt-4 pl-4 px-3 hidden md:block"
      />
      <NavLinks />
      <div className="hidden h-auto w-full grow rounded-md bg-gray-900 md:block"></div>

      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/login" });
        }}
      >
        <button
          className="mx-3 flex  h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-bold hover:bg-white hover:text-gray-900 md:flex-none md:justify-start md:p-2 md:px-3"
          aria-label="Sign out"
        >
          <div className="text-xs md:text-sm">Sign Out</div>
        </button>
      </form>
    </div>
  );
}
