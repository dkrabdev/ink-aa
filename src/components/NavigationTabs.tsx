'use client';

import Link from 'next/link';
import { clsx } from 'clsx';
import { usePathname } from 'next/navigation';

const tabs = [
  { name: 'Wallet', href: '/' },
  { name: 'Send Transactiom', href: '/send-transaction' },
  { name: 'Session Keys', href: '/session-keys' },
];

export const NaigationTabs = () => {
  const pathname = usePathname();

  console.log(pathname);

  return (
    <nav
      aria-label="Tabs"
      className="isolate flex divide-x divide-gray-200 rounded-lg shadow"
    >
      {tabs.map((tab, tabIdx) => {
        const isCurrent = tab.href === pathname;

        return (
          <Link
            key={tab.name}
            href={tab.href}
            aria-current={pathname === tab.href ? 'page' : undefined}
            className={clsx(
              'font-bold group relative min-w-0 flex-1 overflow-hidden bg-white px-4 py-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10',
              {
                'rounded-l-lg': tabIdx === 0,
                'rounded-r-lg': tabIdx === tabs.length - 1,
              },
              {
                'text-inkPurple': isCurrent,
                'text-gray-500 hover:text-gray-700': !isCurrent,
              }
            )}
          >
            <span>{tab.name}</span>
            <span
              aria-hidden="true"
              className={clsx('absolute inset-x-0 bottom-0 h-0.5', {
                'bg-inkPurple': isCurrent,
                'bg-transparent': !isCurrent,
              })}
            />
          </Link>
        );
      })}
    </nav>
  );
};
