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
  const isActive = href.startsWith('/') && path.startsWith(href);

  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className={`flex min-h-9 items-center justify-center break-keep rounded-xl border-2 px-2 py-1.5 text-center text-[11px] font-black transition-all duration-150 sm:min-h-10 sm:px-3 sm:text-sm ${
        isActive
          ? 'border-amber-200 bg-amber-100 text-amber-950 shadow-[0_4px_0_#d97706]'
          : 'border-white/30 bg-white/10 text-white shadow-[0_3px_0_rgb(74_37_18_/_70%)] hover:-translate-y-0.5 hover:bg-white/20'
      } ${color} select-none`}
    >
      {children}
    </Link>
  );
}
