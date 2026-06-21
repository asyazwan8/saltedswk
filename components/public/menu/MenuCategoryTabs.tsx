'use client';

import { Category } from '@/lib/types';

interface Props {
  categories: Category[];
  activeSlug: string;
  onChange: (slug: string) => void;
}

export default function MenuCategoryTabs({ categories, activeSlug, onChange }: Props) {
  return (
    <div className="sticky top-16 z-20 bg-white border-b border-[#E5E5E5]">
      <div className="max-w-5xl mx-auto px-4">
        <div
          className="flex gap-1 overflow-x-auto py-2 scrollbar-hide"
          role="tablist"
          aria-label="Menu categories"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeSlug === cat.slug}
              onClick={() => onChange(cat.slug)}
              className={`flex-shrink-0 px-4 min-h-[44px] rounded-lg text-[16px] font-medium transition-colors whitespace-nowrap
                ${
                  activeSlug === cat.slug
                    ? 'text-[#EA580C] border-b-2 border-[#EA580C] font-bold rounded-b-none bg-orange-50'
                    : 'text-[#555555] hover:text-[#EA580C] hover:bg-orange-50'
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
