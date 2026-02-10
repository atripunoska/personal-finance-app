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
import { ThemeToggle } from '@/components/ThemeToggle';

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
        <div className="flex justify-end items-center gap-2">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="font-bold text-muted-foreground cursor-pointer bg-secondary hover:bg-accent hover:text-foreground"
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
