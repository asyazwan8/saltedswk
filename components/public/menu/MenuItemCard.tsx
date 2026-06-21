'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { MenuItem } from '@/lib/types';
import { useCart } from '../cart/CartContext';

function Initials({ name }: { name: string }) {
  const words = name.trim().split(/\s+/);
  const initials = words.slice(0, 2).map((w) => w[0].toUpperCase()).join('');
  return (
    <div className="w-full h-full bg-[#1A1A1A] flex items-center justify-center">
      <span className="text-white text-3xl font-bold">{initials}</span>
    </div>
  );
}

export default function MenuItemCard({ item }: { item: MenuItem }) {
  const { addItem } = useCart();
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const variants = item.variants ?? [];
  const selectedVariant = variants[selectedVariantIdx];
  const price = item.base_price + (selectedVariant?.price_add ?? 0);

  function handleAdd() {
    addItem({
      menuItemId: item.id,
      name: item.name,
      imageUrl: item.image_url,
      variantId: selectedVariant?.id,
      variantName: selectedVariant?.name,
      unitPrice: price,
      quantity,
      note: '',
    });
    setAdded(true);
    setQuantity(1);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="bg-white border border-[#E5E5E5] rounded-2xl overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative w-full h-[140px] bg-[#F9F9F9]">
        {item.image_url ? (
          <Image
            src={item.image_url}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <Initials name={item.name} />
        )}
        {item.featured && (
          <span className="absolute top-2 left-2 bg-[#1A1A1A] text-white text-xs font-bold px-2 py-0.5 rounded-full">
            ★ Popular
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-serif text-[19px] font-medium leading-snug">{item.name}</h3>
          <span className="text-[17px] font-semibold text-[#9A2A2A] whitespace-nowrap">
            RM {price.toFixed(2)}
          </span>
        </div>

        {item.description && (
          <p className="text-sm text-[#555555] leading-relaxed">{item.description}</p>
        )}

        {variants.length > 1 && (
          <div>
            <label
              htmlFor={`variant-${item.id}`}
              className="sr-only"
            >
              Choose variant for {item.name}
            </label>
            <select
              id={`variant-${item.id}`}
              value={selectedVariantIdx}
              onChange={(e) => setSelectedVariantIdx(Number(e.target.value))}
              className="w-full border border-[#E5E5E5] rounded-xl px-3 py-2 text-[16px] focus:outline-none focus:border-[#1A1A1A] bg-white min-h-[44px]"
            >
              {variants.map((v, idx) => (
                <option key={v.id} value={idx}>
                  {v.name}{v.price_add > 0 ? ` (+RM ${v.price_add.toFixed(2)})` : ''}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Quantity + Add */}
        <div className="flex items-center gap-3 mt-auto">
          <div className="flex items-center gap-2 border border-[#E5E5E5] rounded-xl overflow-hidden">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-11 h-11 flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            <span className="text-[16px] font-semibold w-7 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-11 h-11 flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>

          <button
            onClick={handleAdd}
            className={`flex-1 flex items-center justify-center gap-2 min-h-[44px] rounded-xl text-[16px] font-bold transition-colors ${
              added
                ? 'bg-green-600 text-white'
                : 'bg-[#1A1A1A] hover:bg-[#000000] text-white'
            }`}
          >
            {added ? (
              <>✓ Added</>
            ) : (
              <>
                <ShoppingCart size={16} />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
