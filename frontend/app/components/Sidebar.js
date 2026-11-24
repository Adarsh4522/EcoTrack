'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';


const menuItems = [
  { name: 'Dashboard', href: '/dashboard', icon: '▦' },
  { name: 'India Map', href: '/map', icon: '◎' },
  { name: 'Observations', href: '/observations', icon: '◉' },
  { name: 'Incidents', href: '/incidents', icon: '⚑' },
  { name: 'Officers', href: '/officers', icon: '♙' },
  { name: 'Reports', href: '/reports', icon: '▤' },
];

export default function Sidebar() {
  const pathname = usePathname();

    const router = useRouter();
    const [user, setUser] = useState(null);

useEffect(() => {
  const storedUser = localStorage.getItem('ecotrack_user');

  if (storedUser) {
    try {
      setUser(JSON.parse(storedUser));
    } catch (error) {
      console.error('Unable to read user details:', error);
    }
  }
}, []);

  const handleLogout = () => {
    localStorage.removeItem('ecotrack_token');
    localStorage.removeItem('ecotrack_user');

    router.replace('/login');
  };

  return (
    <aside className='fixed left-0 top-0 z-30 flex h-screen w-64 flex-col border-r border-[#d9dfd0] bg-[#e8eddf]'>
      {/* Logo */}
      <div className='flex h-20 shrink-0 items-center gap-3 border-b border-[#d5ddce] px-6'>
        <div className='flex h-11 w-11 items-center justify-center rounded-xl bg-[#315c45] text-2xl text-white shadow-sm'>
          🌿
        </div>

        <div>
          <h1 className='text-xl font-bold tracking-tight text-[#294936]'>
            EcoTrack
          </h1>
          <p className='text-xs text-[#71816c]'>Monitor. Detect. Respond.</p>
        </div>
      </div>

      {/* Navigation */}
      <div className='flex-1 overflow-y-auto px-4 py-7'>
        <p className='mb-4 px-3 text-xs font-bold uppercase tracking-[2px] text-[#87947e]'>
          Main Menu
        </p>

        <nav className='space-y-2'>
          {menuItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-4 rounded-xl px-4 py-3.5 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-[#315c45] text-white shadow-md shadow-[#315c45]/15'
                    : 'text-[#52664f] hover:bg-[#dce5d5] hover:text-[#294936]'
                }`}
              >
                <span className='w-6 text-center text-xl'>{item.icon}</span>

                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom section */}
      <div className='shrink-0 border-t border-[#d5ddce] p-5'>
        <div className='rounded-2xl border border-[#d4dfca] bg-[#f4f2e7] p-4'>
          <div className='mb-2 text-xl'>🌱</div>

          <p className='text-sm font-bold text-[#315c45]'>
            Protect our environment
          </p>

          <p className='mt-2 text-xs leading-5 text-[#71816c]'>
            Monitor fire observations and coordinate faster responses.
          </p>
        </div>

        {/* Admin profile */}
        {/* User profile */}
<div className='mt-5 flex items-center gap-3'>
  <div className='flex h-10 w-10 items-center justify-center rounded-full bg-[#d2dfc9] font-bold text-[#315c45]'>
    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
  </div>

  <div className='min-w-0'>
    <p className='truncate text-sm font-bold text-[#354d3b]'>
      {user?.name || 'Loading...'}
    </p>

    <p className='text-xs text-[#82907b]'>
      {user?.role === 'ADMIN'
        ? 'Administrator'
        : user?.role === 'DISTRICT_OFFICER'
          ? 'District Officer'
          : 'User'}
    </p>
  </div>
</div>

                <button
          onClick={handleLogout}
          className='mt-4 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-100'
        >
          <span>↪</span>
          Logout
        </button>
      </div>
    </aside>
  );
}
