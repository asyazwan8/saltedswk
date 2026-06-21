import Image from 'next/image';
import Link from 'next/link';
import { OPERATING_HOURS_TEXT } from '@/lib/constants';

export default function HomePage() {
  return (
    <div>
      {/* Hero banner */}
      <section className="relative w-full h-[78vh] min-h-[460px] max-h-[700px]">
        <Image
          src="/brand/banner.webp"
          alt="SALTed signature Sarawak dishes"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

        {/* Hero content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          {/* Thin red accent line */}
          <span className="block w-12 h-px bg-[#9A2A2A] mb-6" aria-hidden="true" />

          <p className="font-serif text-[15px] md:text-[16px] tracking-[0.35em] uppercase text-white/80 mb-4">
            Sarawak &middot; Petaling Jaya
          </p>
          <h1 className="font-serif text-white text-4xl md:text-6xl font-medium leading-tight max-w-3xl mb-5">
            Sarawak&apos;s Authentic Local Taste,
            <span className="italic"> Extra Delicious</span>
          </h1>
          <p className="text-[15px] md:text-[16px] text-white/75 mb-9 tracking-wide">
            Halal &nbsp;&middot;&nbsp; Authentic &nbsp;&middot;&nbsp; Muslim-Owned
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/order"
              className="inline-flex items-center justify-center bg-white text-[#1A1A1A] font-medium text-[16px] px-8 min-h-[52px] rounded-full transition-colors hover:bg-white/90"
            >
              Order for Pickup
            </Link>
            <Link
              href="/booking"
              className="inline-flex items-center justify-center border border-white/70 text-white font-medium text-[16px] px-8 min-h-[52px] rounded-full transition-colors hover:bg-white/10"
            >
              Book a Table
            </Link>
          </div>
        </div>
      </section>

      {/* Hours strip — minimal hairline */}
      <section className="border-y border-[#E2E2E2] bg-white py-5 px-4 text-center">
        <p className="text-[14px] md:text-[15px] text-[#6B6B6B] tracking-wide">
          {OPERATING_HOURS_TEXT}
        </p>
      </section>

      {/* Story / Halal — elegant editorial block */}
      <section className="py-20 px-6 text-center bg-white">
        <div className="max-w-2xl mx-auto">
          <span className="block w-10 h-px bg-[#9A2A2A] mx-auto mb-6" aria-hidden="true" />
          <h2 className="font-serif text-3xl md:text-4xl font-medium mb-5">
            A Taste of Sarawak in PJ
          </h2>
          <p className="text-[16px] md:text-[17px] text-[#6B6B6B] leading-relaxed mb-8">
            From our signature Sarawak Laksa to springy Kolo Mee, every dish is made with
            authentic recipes and ingredients brought from Sarawak — prepared with care in
            Mutiara Damansara. Muslim-owned, halal ingredients only.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-[#1A1A1A] font-medium text-[15px] border-b border-[#9A2A2A] pb-0.5 hover:text-[#9A2A2A] transition-colors min-h-[44px]"
          >
            Our Story
          </Link>
        </div>
      </section>
    </div>
  );
}
