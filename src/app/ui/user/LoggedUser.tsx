// 'use client';

// import { User } from '@supabase/supabase-js';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function LoggedUser() {
//   const [loggedUser, setLoggedUser] = useState<User | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     async function getUser() {
//       const supabase = await createClient();

//       const {
//         data: { user },
//         error,
//       } = await supabase.auth.getUser();

//       if (error || !user?.id) {
//         console.log('No user, redirecting to login...');
//         router.push('/login'); // Redirect to login if not authenticated
//       } else {
//         setLoggedUser(user);
//       }
//     }
//     getUser();
//   }, [router]);

//   if (!loggedUser) {
//     return null; // Render nothing while redirecting
//   }

//   return (
//     <div className="font-light">
//       Hello,{' '}
//       <span className="font-semibold text-green">{loggedUser.email}</span>
//     </div>
//   );
// }
