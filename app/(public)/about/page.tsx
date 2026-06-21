import Image from 'next/image';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import HalalBadge from '@/components/public/HalalBadge';
import { RESTAURANT } from '@/lib/constants';

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

function FacebookIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

export default function AboutPage() {
  const mapsUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY&q=30-1+Jalan+PJU+7%2F16A+Mutiara+Damansara+Petaling+Jaya+Selangor`;

  return (
    <div>
      {/* Hero photo */}
      <div className="w-full h-[250px] relative bg-[#F9F9F9]">
        <Image
          src="/brand/restaurant.jpg"
          alt="SALTed restaurant"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10 space-y-10">
        {/* About text */}
        <section>
          <h1 className="text-[28px] font-extrabold mb-4">About SALTed</h1>
          <p className="text-[16px] text-[#555555] leading-relaxed mb-4">
            <strong>SALTed</strong> stands for <em>Sarawak&apos;s Authentic Local Taste, Extra Delicious</em> —
            and that&apos;s exactly what we deliver. Founded by a passionate Sarawakian couple, SALTed brings
            the rich, bold flavours of Sarawak right to the heart of Petaling Jaya.
          </p>
          <p className="text-[16px] text-[#555555] leading-relaxed mb-4">
            From our signature Sarawak Laksa — with its heady coconut milk broth and sambal belacan —
            to the beloved Mee Kolok, Kolo Kueh Tiaw, and Belacan Beehoon, every dish is crafted using
            authentic recipes and ingredients sourced from Sarawak.
          </p>
          <p className="text-[16px] text-[#555555] leading-relaxed mb-6">
            We&apos;re a Muslim-owned restaurant using halal ingredients only, so everyone can enjoy the
            taste of Sarawak with confidence.
          </p>
          <HalalBadge size="lg" />
        </section>

        <hr className="border-[#E5E5E5]" />

        {/* Location */}
        <section>
          <h2 className="text-[22px] font-bold mb-4 flex items-center gap-2">
            <MapPin className="text-[#1A1A1A]" size={22} /> Location
          </h2>
          <address className="not-italic text-[16px] text-[#555555] leading-relaxed mb-4">
            {RESTAURANT.address.split(', ').map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </address>
          <div className="rounded-xl overflow-hidden border border-[#E5E5E5] h-[280px] bg-[#F9F9F9] flex items-center justify-center">
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(RESTAURANT.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#000000] text-white font-bold text-[16px] px-6 min-h-[52px] rounded-xl"
            >
              <MapPin size={18} /> Open in Google Maps
            </a>
          </div>
        </section>

        {/* Hours */}
        <section>
          <h2 className="text-[22px] font-bold mb-4 flex items-center gap-2">
            <Clock className="text-[#1A1A1A]" size={22} /> Opening Hours
          </h2>
          <table className="text-[16px] border-collapse w-full max-w-sm">
            <tbody>
              {[
                ['Tuesday', '12:00 PM – 6:00 PM'],
                ['Wednesday', '12:00 PM – 6:00 PM'],
                ['Thursday', '12:00 PM – 6:00 PM'],
                ['Friday', '12:00 PM – 6:00 PM'],
                ['Saturday', '10:00 AM – 6:00 PM'],
                ['Sunday', '10:00 AM – 6:00 PM'],
                ['Monday', 'CLOSED'],
              ].map(([day, hours]) => (
                <tr key={day} className="border-b border-[#E5E5E5]">
                  <td className="py-2 pr-8 font-medium text-[#111111]">{day}</td>
                  <td className={`py-2 ${hours === 'CLOSED' ? 'text-[#1A1A1A] font-semibold' : 'text-[#555555]'}`}>
                    {hours}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-[22px] font-bold mb-4">Contact</h2>
          <ul className="space-y-3 text-[16px]">
            <li>
              <a
                href={`tel:${RESTAURANT.phone}`}
                className="flex items-center gap-3 text-[#555555] hover:text-[#1A1A1A] min-h-[52px]"
              >
                <Phone size={18} className="text-[#1A1A1A] shrink-0" />
                {RESTAURANT.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${RESTAURANT.email}`}
                className="flex items-center gap-3 text-[#555555] hover:text-[#1A1A1A] min-h-[52px]"
              >
                <Mail size={18} className="text-[#1A1A1A] shrink-0" />
                {RESTAURANT.email}
              </a>
            </li>
          </ul>
        </section>

        {/* Social */}
        <section>
          <h2 className="text-[22px] font-bold mb-4">Follow Us</h2>
          <ul className="space-y-3 text-[16px]">
            <li>
              <a
                href={RESTAURANT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#555555] hover:text-[#1A1A1A] min-h-[52px]"
              >
                <span className="text-[#1A1A1A]"><InstagramIcon size={20} /></span>
                {RESTAURANT.handle} on Instagram
              </a>
            </li>
            <li>
              <a
                href={RESTAURANT.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#555555] hover:text-[#1A1A1A] min-h-[52px]"
              >
                <span className="text-[#1A1A1A]"><FacebookIcon size={20} /></span>
                SALTed on Facebook
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
