import { MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER, OPERATING_HOURS_TEXT } from '@/lib/constants';

export default function ChatPage() {
  const url = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-16 text-center">
      <div className="bg-green-100 text-green-700 w-20 h-20 rounded-full flex items-center justify-center mb-6">
        <MessageCircle size={40} />
      </div>
      <h1 className="text-[28px] font-extrabold mb-2">Chat With Us</h1>
      <p className="text-[18px] text-[#555555] mb-6 max-w-sm">
        Have a question? We&apos;re happy to help! Send us a message on WhatsApp and we usually reply
        within a few minutes during opening hours.
      </p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white font-bold text-[18px] px-10 min-h-[56px] rounded-xl transition-colors mb-8 shadow-sm"
      >
        <MessageCircle size={22} />
        Chat on WhatsApp
      </a>
      <div className="text-[16px] text-[#555555] space-y-1">
        <p className="font-semibold text-[#111111]">Operating Hours</p>
        {OPERATING_HOURS_TEXT.split('|').map((line, i) => (
          <p key={i}>{line.trim()}</p>
        ))}
      </div>
    </div>
  );
}
