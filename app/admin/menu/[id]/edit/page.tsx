import { requireAdmin } from '@/lib/auth';
import { createAdminClient } from '@/lib/supabase/admin';
import MenuItemForm from '@/components/admin/MenuItemForm';
import { Category, MenuItem } from '@/lib/types';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function EditMenuItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const admin = createAdminClient();

  const [{ data: item }, { data: categories }] = await Promise.all([
    admin.from('menu_items').select('*, variants(*), category:categories(*)').eq('id', id).single(),
    admin.from('categories').select('*').order('order', { ascending: true }),
  ]);

  if (!item) notFound();

  return (
    <div className="p-8">
      <div className="mb-6">
        <Link href="/admin/menu" className="text-[#555555] hover:text-[#CC0000] text-sm mb-2 inline-block">
          ← Back to Menu
        </Link>
        <h1 className="text-[28px] font-extrabold">Edit: {item.name}</h1>
      </div>
      <MenuItemForm
        categories={(categories as Category[]) ?? []}
        item={item as MenuItem}
      />
    </div>
  );
}
