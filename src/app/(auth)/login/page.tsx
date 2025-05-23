import React, { Suspense } from 'react';

import Image from 'next/image';
import LoginForm from '@/app/ui/LoginForm';

export default function Login() {
  return (
    <div className="flex flex-row items-center justify-center h-screen bg-amber-50 lg:gap-2">
      <div className="lg:w-1/3 gap-3">
        <Image
          src="/assets/images/Sidebar.png"
          alt="Sidebar"
          width={1400}
          height={200}
          className="hidden lg:flex"
          loading="lazy"
        />
      </div>
      <div className="lg:w-2/3">
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
