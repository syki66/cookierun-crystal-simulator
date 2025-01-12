'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

type NavItemProps = {
  href: string;
  color: string;
  children: ReactNode;
};

export default function NavItem({ href, color, children }: NavItemProps) {
  const path = usePathname();

  return (
    <Link
      href={href}
      className={`text-white font-bold text-xs sm:text-lg sm:px-4 sm:py-2 rounded-md ${
        path.startsWith(href) ? 'bg-white/10' : ''
      } hover:bg-white/10 hover:${color} transition-colors duration-200 break-keep `}
    >
      {children}
    </Link>
  );
}
