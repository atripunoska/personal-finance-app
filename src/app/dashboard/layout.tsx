import Sidemenu from '../ui/dashboard/Sidemenu';
import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { logout } from '@/lib/actions';
import { ModalType } from '@/lib/definitions';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="flex md:h-screen flex-col-reverse md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <Sidemenu />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
        <div className="text-right ">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="font-bold text-grey-500 cursor-pointer bg-gray-200 hover:bg-grey-100 hover:text-grey-900"
                variant="secondary"
                aria-label="Open Dropdown"
              >
                Welcome, {session?.user?.name}!
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-20">
              <DropdownMenuItem className="cursor-pointer">
                <form action={logout}>
                  <button type="submit" className="cursor-pointer">
                    Log out
                  </button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {children}
      </div>
    </div>
  );
}
