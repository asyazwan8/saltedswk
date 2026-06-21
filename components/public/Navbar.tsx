'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const links = [
  { href: '/order', label: 'Order' },
  { href: '/booking', label: 'Book Table' },
  { href: '/chat', label: 'Chat' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b-2 border-[#EA580C]">
      <nav className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 min-h-[52px]" aria-label="SALTed Home">
          <Logo size={40} />
          <span className="text-xl font-bold text-[#EA580C] tracking-tight">SALTed</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`px-4 py-2 rounded-lg text-[16px] font-medium transition-colors min-h-[44px] inline-flex items-center ${
                  pathname === link.href
                    ? 'text-[#EA580C] bg-orange-50'
                    : 'text-[#555555] hover:text-[#EA580C] hover:bg-orange-50'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 min-h-[52px] min-w-[52px] flex items-center justify-center text-[#111111]"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[#E5E5E5] bg-white">
          <ul className="px-4 py-2 flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-[16px] font-medium min-h-[52px] flex items-center ${
                    pathname === link.href
                      ? 'text-[#EA580C] bg-orange-50'
                      : 'text-[#555555] hover:text-[#EA580C] hover:bg-orange-50'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
