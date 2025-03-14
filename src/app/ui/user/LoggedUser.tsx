"use client";

import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export default function LoggedUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function getUser() {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        console.log("no user");
      } else {
        setUser(data.user);
      }
    }
    getUser();
  }, []);

  return (
    <div className="font-light">
      Hello, <span className="font-semibold text-green">{user?.email}</span>
    </div>
  );
}
