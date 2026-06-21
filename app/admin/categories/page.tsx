import { requireAdmin } from '@/lib/auth';
import { createAdminClient } from '@/lib/supabase/admin';
import AdminCategoriesClient from './AdminCategoriesClient';
import { Category } from '@/lib/types';

export default async function AdminCategoriesPage() {
  await requireAdmin();
  const admin = createAdminClient();
  const { data: categories } = await admin
    .from('categories')
    .select('*')
    .order('order', { ascending: true });

  return (
    <div className="p-8">
      <h1 className="text-[28px] font-extrabold mb-6">Categories</h1>
      <AdminCategoriesClient categories={(categories as Category[]) ?? []} />
    </div>
  );
}
