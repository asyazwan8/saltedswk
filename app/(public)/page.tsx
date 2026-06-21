import Image from 'next/image';
import Link from 'next/link';
import HalalBadge from '@/components/public/HalalBadge';
import Logo from '@/components/public/Logo';
import { OPERATING_HOURS_TEXT } from '@/lib/constants';

const features = [
  {
    icon: '🍜',
    title: 'Order for Pickup',
    desc: 'Browse our menu, add to cart, and send your order via WhatsApp.',
    href: '/order',
  },
  {
    icon: '🪑',
    title: 'Book a Table',
    desc: 'Reserve your seats in advance — no waiting.',
    href: '/booking',
  },
  {
    icon: '💬',
    title: 'Chat With Us',
    desc: 'Quick questions? WhatsApp us directly — we reply fast.',
    href: '/chat',
  },
  {
    icon: '📖',
    title: 'About SALTed',
    desc: 'Our story and the Sarawakian flavours we bring to PJ.',
    href: '/about',
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-white text-center px-4 py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6 flex justify-center">
            <Logo size={100} className="shadow-md" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#111111] mb-3 leading-tight">
            SALTed
          </h1>
          <p className="text-[22px] font-semibold text-[#CC0000] mb-2">
            Sarawak&apos;s Authentic Local Taste, Extra Delicious
          </p>
          <p className="text-[18px] text-[#555555] mb-8">
            Halal &bull; Authentic &bull; Petaling Jaya
          </p>
          <Link
            href="/order"
            className="inline-flex items-center justify-center bg-[#CC0000] hover:bg-[#990000] text-white font-bold text-[18px] px-8 min-h-[52px] rounded-xl transition-colors shadow-sm"
          >
            Order for Pickup
          </Link>
        </div>
      </section>

      {/* Feature cards */}
      <section className="bg-[#F9F9F9] py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="bg-white rounded-2xl p-5 border border-[#E5E5E5] hover:border-[#CC0000] hover:shadow-md transition-all group flex flex-col items-start gap-2"
            >
              <span className="text-3xl">{f.icon}</span>
              <span className="text-[16px] font-semibold text-[#111111] group-hover:text-[#CC0000]">
                {f.title}
              </span>
              <span className="text-sm text-[#555555]">{f.desc}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Hours banner */}
      <section className="bg-[#CC0000] text-white py-5 px-4 text-center">
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
