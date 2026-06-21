'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2, Check, X } from 'lucide-react';
import { Category } from '@/lib/types';

export default function AdminCategoriesClient({ categories: initial }: { categories: Category[] }) {
  const router = useRouter();
  const [categories, setCategories] = useState(initial);
  const [newName, setNewName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [error, setError] = useState('');

  async function addCategory() {
    if (!newName.trim()) return;
    const slug = newName.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const res = await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName.trim(), slug, order: categories.length + 1 }),
    });
    if (res.ok) {
      setNewName('');
      router.refresh();
    } else {
      const d = await res.json();
      setError(d.error || 'Failed to add category.');
    }
  }

  async function saveEdit(id: string) {
    const res = await fetch(`/api/categories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editName.trim() }),
    });
    if (res.ok) {
      setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, name: editName.trim() } : c)));
      setEditingId(null);
    }
  }

  async function deleteCategory(id: string, name: string) {
    if (!confirm(`Delete category "${name}"? Menu items in this category will be affected.`)) return;
    const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } else {
      const d = await res.json();
      setError(d.error || 'Failed to delete. Make sure no menu items use this category.');
    }
  }

  return (
    <div className="max-w-lg space-y-6">
      {error && (
        <div className="bg-red-50 text-red-700 border border-red-200 rounded-xl px-4 py-3 text-[15px]">
          {error}
        </div>
      )}

      {/* Add new */}
      <div className="flex gap-3">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addCategory()}
          placeholder="New category name"
          className="flex-1 border border-[#E5E5E5] rounded-xl px-4 py-3 text-[16px] focus:outline-none focus:border-[#1A1A1A] min-h-[52px]"
        />
        <button
          onClick={addCategory}
          className="bg-[#1A1A1A] hover:bg-[#000000] text-white font-bold px-5 min-h-[52px] rounded-xl"
        >
          Add
        </button>
      </div>

      {/* List */}
      <div className="bg-white border border-[#E5E5E5] rounded-2xl divide-y divide-[#E5E5E5]">
        {categories.map((cat) => (
          <div key={cat.id} className="flex items-center gap-3 px-4 py-3">
            {editingId === cat.id ? (
              <>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="flex-1 border border-[#E5E5E5] rounded-lg px-3 py-2 text-[16px] focus:outline-none focus:border-[#1A1A1A] min-h-[44px]"
                  autoFocus
                />
                <button
                  onClick={() => saveEdit(cat.id)}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Save"
                >
                  <Check size={18} />
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="p-2 text-[#555555] hover:bg-gray-100 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Cancel"
                >
                  <X size={18} />
                </button>
              </>
            ) : (
              <>
                <span className="flex-1 text-[16px] font-medium">{cat.name}</span>
                <span className="text-sm text-[#555555]">{cat.slug}</span>
                <button
                  onClick={() => { setEditingId(cat.id); setEditName(cat.name); }}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Edit"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => deleteCategory(cat.id, cat.name)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </>
            )}
          </div>
        ))}
        {categories.length === 0 && (
          <p className="px-4 py-6 text-[#555555] text-center">No categories yet.</p>
        )}
      </div>
    </div>
  );
}
