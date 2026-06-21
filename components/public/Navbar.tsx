'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '/order', label: 'Order' },
  { href: '/booking', label: 'Book Table' },
  { href: '/chat', label: 'Chat' },
  { href: '/about', label: 'About' },
];

function Wordmark() {
  return (
    <span className="font-serif text-2xl tracking-tight text-[#1A1A1A] leading-none">
      SALTed<span className="text-[#9A2A2A]">.</span>
    </span>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[#E2E2E2]">
      <nav className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center min-h-[52px]" aria-label="SALTed Home">
          <Wordmark />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-7">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-[15px] tracking-wide transition-colors min-h-[44px] inline-flex items-center border-b ${
                  pathname === link.href
                    ? 'text-[#1A1A1A] border-[#9A2A2A]'
                    : 'text-[#6B6B6B] border-transparent hover:text-[#1A1A1A]'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 min-h-[52px] min-w-[52px] flex items-center justify-center text-[#1A1A1A]"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[#E2E2E2] bg-white">
          <ul className="px-5 py-2 flex flex-col">
            {links.map((link) => (
              <li key={link.href} className="border-b border-[#E2E2E2] last:border-0">
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block py-3.5 text-[16px] tracking-wide min-h-[52px] flex items-center ${
                    pathname === link.href ? 'text-[#9A2A2A]' : 'text-[#1A1A1A]'
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
