import { requireAdmin } from '@/lib/auth';
import { createAdminClient } from '@/lib/supabase/admin';
import MenuItemForm from '@/components/admin/MenuItemForm';
import { Category } from '@/lib/types';
import Link from 'next/link';

export default async function NewMenuItemPage() {
  await requireAdmin();
  const admin = createAdminClient();
  const { data: categories } = await admin
    .from('categories')
    .select('*')
    .order('order', { ascending: true });

  return (
    <div className="p-8">
      <div className="mb-6">
        <Link href="/admin/menu" className="text-[#555555] hover:text-[#EA580C] text-sm mb-2 inline-block">
          ← Back to Menu
        </Link>
        <h1 className="text-[28px] font-extrabold">Add Menu Item</h1>
      </div>
      <MenuItemForm categories={(categories as Category[]) ?? []} />
    </div>
  );
}
