import Link from 'next/link';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { RESTAURANT, OPERATING_HOURS_TEXT } from '@/lib/constants';
import HalalBadge from './HalalBadge';

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-white mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <div className="font-serif text-2xl mb-2 text-white">SALTed<span className="text-[#9A2A2A]">.</span></div>
          <p className="text-sm text-gray-400 mb-4">{RESTAURANT.tagline}</p>
          <HalalBadge size="sm" />
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-[16px] mb-3">Contact</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a href={`tel:${RESTAURANT.phone}`} className="flex items-center gap-2 hover:text-white min-h-[44px]">
                <Phone size={14} /> {RESTAURANT.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${RESTAURANT.email}`} className="flex items-center gap-2 hover:text-white min-h-[44px]">
                <Mail size={14} /> {RESTAURANT.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={14} className="mt-0.5 shrink-0" />
              <span>{RESTAURANT.address}</span>
            </li>
          </ul>
        </div>

        {/* Hours & Social */}
        <div>
          <h3 className="font-semibold text-[16px] mb-3">Hours</h3>
          <div className="text-sm text-gray-300 mb-4 flex items-start gap-2">
            <Clock size={14} className="mt-0.5 shrink-0" />
            <span>{OPERATING_HOURS_TEXT.replace(/\|/g, '\n').split('\n').map((line, i) => (
              <span key={i} className="block">{line.trim()}</span>
            ))}</span>
          </div>
          <div className="flex gap-3">
            <a
              href={RESTAURANT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 bg-white/10 rounded-full hover:bg-[#1A1A1A] transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon size={18} />
            </a>
            <a
              href={RESTAURANT.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 bg-white/10 rounded-full hover:bg-[#1A1A1A] transition-colors"
              aria-label="Facebook"
            >
              <FacebookIcon size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 text-center py-4 text-xs text-gray-500">
        © {new Date().getFullYear()} SALTed. All rights reserved.
        <span className="mx-2">·</span>
        <Link href="/admin" className="hover:text-gray-300">Admin</Link>
      </div>
    </footer>
  );
}
