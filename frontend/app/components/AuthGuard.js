
'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function AuthGuard({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const publicPaths = ['/login', '/signup', '/forgot-password'];

    // Allow public pages without authentication
    if (publicPaths.includes(pathname)) {
      setChecking(false);
      return;
    }

    const token = localStorage.getItem('ecotrack_token');
    const storedUser = localStorage.getItem('ecotrack_user');

    // Redirect users who are not logged in
    if (!token || !storedUser) {
      router.replace('/login');
      return;
    }

    try {
      const user = JSON.parse(storedUser);

      // District officers cannot access the admin dashboard
      if (
        user.role === 'DISTRICT_OFFICER' &&
        (pathname === '/dashboard' || pathname === '/')
      ) {
        router.replace('/incidents');
        return;
      }

      setChecking(false);
    } catch (error) {
      localStorage.removeItem('ecotrack_token');
      localStorage.removeItem('ecotrack_user');
      router.replace('/login');
    }
  }, [pathname, router]);

  if (checking) {
    return null;
  }

  return children;
}
