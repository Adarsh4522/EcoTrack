'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

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
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      data-collapsed={collapsed}
      className={`peer fixed left-0 top-0 z-30 flex h-screen flex-col border-r border-[#d9dfd0] bg-[#e8eddf] transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Logo */}
      <div
        className={`flex h-20 shrink-0 items-center border-b border-[#d5ddce] ${
          collapsed ? 'justify-center px-2' : 'gap-3 px-6'
        }`}
      >
        <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#315c45] text-2xl text-white shadow-sm'>
          🌿
        </div>

        {!collapsed && (
          <div>
            <h1 className='text-xl font-bold tracking-tight text-[#294936]'>
              EcoTrack
            </h1>
            <p className='text-xs text-[#71816c]'>Monitor. Detect. Respond.</p>
          </div>
        )}
      </div>

      {/* Collapse Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        aria-label={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        className={`absolute -right-3 top-24 z-40 flex h-7 w-7 items-center justify-center rounded-full border border-[#d5ddce] bg-[#f9f7ed] text-lg font-bold text-[#315c45] shadow-sm transition hover:bg-[#315c45] hover:text-white`}
      >
        {collapsed ? '›' : '‹'}
      </button>

      {/* Navigation */}
      <div
        className={`flex-1 overflow-y-auto py-7 ${collapsed ? 'px-2' : 'px-4'}`}
      >
        {!collapsed && (
          <p className='mb-4 px-3 text-xs font-bold uppercase tracking-[2px] text-[#87947e]'>
            Main Menu
          </p>
        )}

        <nav className='space-y-2'>
          {menuItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                title={collapsed ? item.name : ''}
                className={`flex items-center rounded-xl py-3.5 text-sm font-semibold transition-all duration-200 ${
                  collapsed ? 'justify-center px-2' : 'gap-4 px-4'
                } ${
                  isActive
                    ? 'bg-[#315c45] text-white shadow-md shadow-[#315c45]/15'
                    : 'text-[#52664f] hover:bg-[#dce5d5] hover:text-[#294936]'
                }`}
              >
                <span className='w-6 shrink-0 text-center text-xl'>
                  {item.icon}
                </span>

                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div
        className={`shrink-0 border-t border-[#d5ddce] ${
          collapsed ? 'p-2' : 'p-5'
        }`}
      >
        {!collapsed && (
          <div className='rounded-2xl border border-[#d4dfca] bg-[#f4f2e7] p-4'>
            <div className='mb-2 text-xl'>🌱</div>

            <p className='text-sm font-bold text-[#315c45]'>
              Protect our environment
            </p>

            <p className='mt-2 text-xs leading-5 text-[#71816c]'>
              Monitor fire observations and coordinate faster responses.
            </p>
          </div>
        )}

        {/* Admin Profile */}
        <div
          className={`flex items-center ${
            collapsed ? 'justify-center pt-3' : 'mt-5 gap-3'
          }`}
          title={collapsed ? 'Admin User' : ''}
        >
          <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d2dfc9] font-bold text-[#315c45]'>
            A
          </div>

          {!collapsed && (
            <div>
              <p className='text-sm font-bold text-[#354d3b]'>Admin User</p>
              <p className='text-xs text-[#82907b]'>Administrator</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
