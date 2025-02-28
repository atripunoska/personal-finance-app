import React from "react";

export default function Login() {
  return (
    <div className="flex flex-row items-center justify-center h-screen bg-amber-50 gap-2">
      <div className="w-20">
        <img src="/images/Sidebar.png" alt="Sidebar" className="h-full" />
      </div>
      <div className="w-80">
        <div className="bg-white w-auto p-3">
          <input type="text" className="border" />
        </div>
      </div>
    </div>
  );
}
