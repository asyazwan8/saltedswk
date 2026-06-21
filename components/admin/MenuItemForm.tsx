'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2 } from 'lucide-react';
import ImageUpload from './ImageUpload';
import { MenuItem, Category } from '@/lib/types';

interface VariantRow {
  id?: string;
  name: string;
  price_add: number;
}

interface Props {
  categories: Category[];
  item?: MenuItem;
}

export default function MenuItemForm({ categories, item }: Props) {
  const router = useRouter();
  const [name, setName] = useState(item?.name ?? '');
  const [description, setDescription] = useState(item?.description ?? '');
  const [basePrice, setBasePrice] = useState(String(item?.base_price ?? ''));
  const [categoryId, setCategoryId] = useState(item?.category_id ?? categories[0]?.id ?? '');
  const [imageUrl, setImageUrl] = useState<string | null>(item?.image_url ?? null);
  const [available, setAvailable] = useState(item?.available ?? true);
  const [featured, setFeatured] = useState(item?.featured ?? false);
  const [variants, setVariants] = useState<VariantRow[]>(
    item?.variants?.map((v) => ({ id: v.id, name: v.name, price_add: v.price_add })) ?? []
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  function addVariant() {
    setVariants((prev) => [...prev, { name: '', price_add: 0 }]);
  }

  function removeVariant(idx: number) {
    setVariants((prev) => prev.filter((_, i) => i !== idx));
  }

  function updateVariant(idx: number, field: keyof VariantRow, value: string | number) {
    setVariants((prev) => prev.map((v, i) => (i === idx ? { ...v, [field]: value } : v)));
  }

  function validate() {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Name is required.';
    if (!basePrice || isNaN(Number(basePrice)) || Number(basePrice) < 0)
      errs.basePrice = 'Enter a valid price.';
    if (!categoryId) errs.categoryId = 'Select a category.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);

    const payload = {
      name: name.trim(),
      description: description.trim() || null,
      base_price: parseFloat(basePrice),
      category_id: categoryId,
      image_url: imageUrl,
      available,
      featured,
      variants,
    };

    const url = item ? `/api/menu/${item.id}` : '/api/menu';
    const method = item ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    setSaving(false);
    if (res.ok) {
      router.push('/admin/menu');
      router.refresh();
    } else {
      const data = await res.json();
      setErrors({ submit: data.error || 'Save failed.' });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {errors.submit && (
        <div className="bg-red-50 text-red-700 border border-red-200 rounded-xl px-4 py-3 text-[15px]">
          {errors.submit}
        </div>
      )}

      {/* Name */}
      <div>
        <label htmlFor="item-name" className="block font-semibold text-[15px] mb-1">
          Name <span className="text-[#1A1A1A]">*</span>
        </label>
        <input
          id="item-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-[#E5E5E5] rounded-xl px-4 py-3 text-[16px] focus:outline-none focus:border-[#1A1A1A] min-h-[52px]"
        />
        {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
      </div>

      {/* Category */}
      <div>
        <label htmlFor="item-category" className="block font-semibold text-[15px] mb-1">
          Category <span className="text-[#1A1A1A]">*</span>
        </label>
        <select
          id="item-category"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full border border-[#E5E5E5] rounded-xl px-4 py-3 text-[16px] focus:outline-none focus:border-[#1A1A1A] min-h-[52px] bg-white"
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        {errors.categoryId && <p className="text-red-600 text-sm mt-1">{errors.categoryId}</p>}
      </div>

      {/* Base Price */}
      <div>
        <label htmlFor="item-price" className="block font-semibold text-[15px] mb-1">
          Base Price (RM) <span className="text-[#1A1A1A]">*</span>
        </label>
        <input
          id="item-price"
          type="number"
          step="0.01"
          min="0"
          value={basePrice}
          onChange={(e) => setBasePrice(e.target.value)}
          className="w-full border border-[#E5E5E5] rounded-xl px-4 py-3 text-[16px] focus:outline-none focus:border-[#1A1A1A] min-h-[52px]"
        />
        {errors.basePrice && <p className="text-red-600 text-sm mt-1">{errors.basePrice}</p>}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="item-desc" className="block font-semibold text-[15px] mb-1">Description</label>
        <textarea
          id="item-desc"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-[#E5E5E5] rounded-xl px-4 py-3 text-[16px] focus:outline-none focus:border-[#1A1A1A] resize-none"
        />
      </div>

      {/* Image */}
      <div>
        <p className="block font-semibold text-[15px] mb-2">Image</p>
        <ImageUpload value={imageUrl} onChange={setImageUrl} />
      </div>

      {/* Toggles */}
      <div className="flex gap-6">
        {[
          { label: 'Available', value: available, set: setAvailable },
          { label: 'Featured', value: featured, set: setFeatured },
        ].map(({ label, value, set }) => (
          <label key={label} className="flex items-center gap-3 cursor-pointer min-h-[44px]">
            <button
              type="button"
              role="switch"
              aria-checked={value}
              onClick={() => set(!value)}
              className={`w-11 h-6 rounded-full transition-colors ${value ? 'bg-[#1A1A1A]' : 'bg-gray-300'}`}
            >
              <span
                className={`block w-5 h-5 rounded-full bg-white shadow transition-transform mx-0.5 ${value ? 'translate-x-5' : 'translate-x-0'}`}
              />
            </button>
            <span className="text-[16px] font-medium">{label}</span>
          </label>
        ))}
      </div>

      {/* Variants */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="font-semibold text-[15px]">Variants</p>
          <button
            type="button"
            onClick={addVariant}
            className="flex items-center gap-1 text-[#1A1A1A] text-[15px] font-medium hover:underline min-h-[44px] px-2"
          >
            <Plus size={16} /> Add Variant
          </button>
        </div>
        {variants.length === 0 && (
          <p className="text-sm text-[#555555]">No variants — single price item.</p>
        )}
        <div className="space-y-3">
          {variants.map((v, idx) => (
            <div key={idx} className="flex gap-3 items-start">
              <input
                type="text"
                value={v.name}
                onChange={(e) => updateVariant(idx, 'name', e.target.value)}
                placeholder="Variant name (e.g. Basic)"
                className="flex-1 border border-[#E5E5E5] rounded-xl px-3 py-2 text-[16px] focus:outline-none focus:border-[#1A1A1A] min-h-[44px]"
              />
              <input
                type="number"
                step="0.01"
                min="0"
                value={v.price_add}
                onChange={(e) => updateVariant(idx, 'price_add', parseFloat(e.target.value) || 0)}
                placeholder="+ Price"
                className="w-28 border border-[#E5E5E5] rounded-xl px-3 py-2 text-[16px] focus:outline-none focus:border-[#1A1A1A] min-h-[44px]"
              />
              <button
                type="button"
                onClick={() => removeVariant(idx)}
                className="text-red-500 hover:text-red-700 p-2 min-h-[44px] flex items-center"
                aria-label="Remove variant"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="bg-[#1A1A1A] hover:bg-[#000000] text-white font-bold text-[16px] px-8 min-h-[52px] rounded-xl transition-colors disabled:opacity-60"
        >
          {saving ? 'Saving…' : item ? 'Save Changes' : 'Add Item'}
        </button>
        <a
          href="/admin/menu"
          className="border border-[#E5E5E5] hover:border-[#1A1A1A] text-[#111111] font-semibold text-[16px] px-6 min-h-[52px] rounded-xl inline-flex items-center"
        >
          Cancel
        </a>
      </div>
    </form>
  );
}
