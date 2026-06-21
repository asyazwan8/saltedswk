'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';

export default function AdminMenuActions({ itemId }: { itemId: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm('Delete this menu item? This cannot be undone.')) return;
    setDeleting(true);
    await fetch(`/api/menu/${itemId}`, { method: 'DELETE' });
    setDeleting(false);
    router.refresh();
  }

  return (
    <div className="flex gap-2 justify-end">
      <Link
        href={`/admin/menu/${itemId}/edit`}
        className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 min-h-[44px] min-w-[44px] flex items-center justify-center"
        aria-label="Edit"
      >
        <Pencil size={16} />
      </Link>
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="p-2 rounded-lg hover:bg-red-50 text-red-600 min-h-[44px] min-w-[44px] flex items-center justify-center disabled:opacity-50"
        aria-label="Delete"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
