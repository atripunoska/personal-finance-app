import Sidemenu from '../ui/dashboard/Sidemenu';
import LoggedUser from '../ui/user/LoggedUser';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex md:h-screen flex-col-reverse md:flex-row md:overflow-hidden'>
      <div className='w-full flex-none md:w-64'>
        <Sidemenu />
      </div>
      <div className='flex-grow p-6 md:overflow-y-auto md:p-12'>
        <div className='text-right'>
          <LoggedUser />
        </div>
        {children}
      </div>
    </div>
  );
}
