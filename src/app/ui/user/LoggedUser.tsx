"use client";

import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function LoggedUser() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function getUser() {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        console.log("No user, redirecting to login...");
        router.push("/login"); // Redirect to login if not authenticated
      } else {
        setUser(data.user);
      }
    }
    getUser();
  }, [router]);

  if (!user) {
    return null; // Render nothing while redirecting
  }

  return (
    <div className="font-light">
      Hello, <span className="font-semibold text-green">{user?.email}</span>
    </div>
  );
}
