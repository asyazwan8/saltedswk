'use client';

import { useCart } from './CartContext';
import { ShoppingCart } from 'lucide-react';

export default function FloatingCartButton({ onOpen }: { onOpen: () => void }) {
  const { count, total } = useCart();

  if (count === 0) return null;

  return (
    <div className="fixed bottom-6 left-0 right-0 z-30 flex justify-center px-4 pointer-events-none">
      <button
        onClick={onOpen}
        className="pointer-events-auto flex items-center gap-3 bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-[16px] px-6 min-h-[56px] rounded-2xl shadow-2xl transition-colors"
        aria-label={`Open cart — ${count} items, RM ${total.toFixed(2)}`}
      >
        <ShoppingCart size={20} />
        <span>{count} {count === 1 ? 'item' : 'items'}</span>
        <span className="text-orange-200">·</span>
        <span>RM {total.toFixed(2)}</span>
        <span className="ml-1">→</span>
      </button>
    </div>
  );
}
