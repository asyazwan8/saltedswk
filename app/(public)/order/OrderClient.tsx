'use client';

import { useState } from 'react';
import { MenuItem, Category } from '@/lib/types';
import { CartProvider } from '@/components/public/cart/CartContext';
import MenuCategoryTabs from '@/components/public/menu/MenuCategoryTabs';
import MenuItemCard from '@/components/public/menu/MenuItemCard';
import FloatingCartButton from '@/components/public/cart/FloatingCartButton';
import CartDrawer from '@/components/public/cart/CartDrawer';

interface Props {
  items: MenuItem[];
  categories: Category[];
  takeawayNote?: string;
}

function OrderContent({ items, categories, takeawayNote }: Props) {
  const [activeSlug, setActiveSlug] = useState(categories[0]?.slug ?? '');
  const [cartOpen, setCartOpen] = useState(false);

  const filteredItems = items.filter((item) => item.category?.slug === activeSlug);

  return (
    <div className="pb-28">
      {/* Page header */}
      <div className="bg-white px-4 py-8 border-b border-[#E2E2E2]">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-serif text-3xl md:text-4xl font-medium">Order for Pickup</h1>
          <p className="text-[16px] text-[#6B6B6B] mt-2">
            Choose your items, then send your order via WhatsApp.
          </p>
          {takeawayNote && (
            <p className="mt-3 inline-flex items-center gap-2 text-[14px] text-[#9A2A2A] border border-[#E2E2E2] rounded-full px-4 py-1.5">
              <span aria-hidden="true">🥡</span> {takeawayNote}
            </p>
          )}
        </div>
      </div>

      {/* Category tabs */}
      <MenuCategoryTabs
        categories={categories}
        activeSlug={activeSlug}
        onChange={setActiveSlug}
      />

      {/* Menu items */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        {filteredItems.length === 0 ? (
          <p className="text-[#6B6B6B] text-center py-12 text-[16px]">
            No items available in this category right now.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      {/* Floating cart */}
      <FloatingCartButton onOpen={() => setCartOpen(true)} />

      {/* Cart drawer */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}

export default function OrderClient({ items, categories, takeawayNote }: Props) {
  return (
    <CartProvider>
      <OrderContent items={items} categories={categories} takeawayNote={takeawayNote} />
    </CartProvider>
  );
}
