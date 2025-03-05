import React, { Suspense } from "react";
import LoginForm from "../ui/login-form";
import Image from "next/image";

export default function Login() {
  return (
    <div className="flex flex-row items-center justify-center h-screen bg-amber-50 gap-2">
      <div className="w-1/3 gap-3">
        <Image
          src="/./assets/images/Sidebar.png"
          alt="Sidebar"
          width={1400}
          height={200}
        />
      </div>
      <div className="w-2/3">
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
