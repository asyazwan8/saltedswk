import Image from 'next/image';
import Link from 'next/link';
import HalalBadge from '@/components/public/HalalBadge';
import { OPERATING_HOURS_TEXT } from '@/lib/constants';

export default function HomePage() {
  return (
    <div>
      {/* Hero banner */}
      <section className="relative w-full h-[70vh] min-h-[420px] max-h-[640px]">
        <Image
          src="/brand/banner.webp"
          alt="SALTed signature Sarawak dishes"
          fill
          priority
          className="object-cover"
        />
        {/* Dark gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />

        {/* Hero content */}
        <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-4 pb-12">
          <p className="text-[22px] md:text-3xl font-extrabold text-white mb-2 drop-shadow-lg max-w-2xl">
            Sarawak&apos;s Authentic Local Taste, Extra Delicious
          </p>
          <p className="text-[16px] md:text-[18px] text-white/90 mb-6 drop-shadow">
            Halal &bull; Authentic &bull; Petaling Jaya
          </p>
          <Link
            href="/order"
            className="inline-flex items-center justify-center bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-[18px] px-8 min-h-[52px] rounded-xl transition-colors shadow-lg"
          >
            Order for Pickup
          </Link>
        </div>
      </section>

      {/* Hours banner */}
      <section className="bg-[#EA580C] text-white py-5 px-4 text-center">
        <p className="text-[16px] font-medium">{OPERATING_HOURS_TEXT}</p>
      </section>

      {/* Halal section */}
      <section className="py-10 px-4 text-center bg-white">
        <div className="max-w-md mx-auto">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-3xl text-green-600">✓</span>
            </div>
          </div>
          <HalalBadge size="lg" />
          <p className="mt-3 text-[#555555] text-[16px]">
            Muslim-owned restaurant using halal ingredients only.
          </p>
        </div>
      </section>

      {/* Restaurant photo */}
      <section className="px-4 pb-12 bg-white">
        <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden border border-[#E5E5E5]">
          <Image
            src="/brand/restaurant.jpg"
            alt="SALTed restaurant interior"
            width={1200}
            height={400}
            className="w-full h-[250px] md:h-[400px] object-cover"
          />
        </div>
      </section>
    </div>
  );
}
