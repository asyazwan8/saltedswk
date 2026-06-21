import { requireAdmin } from '@/lib/auth';
import { createAdminClient } from '@/lib/supabase/admin';
import Link from 'next/link';

export default async function AdminDashboardPage() {
  await requireAdmin();
  const admin = createAdminClient();

  const [
    { count: totalItems },
    { count: activeItems },
    { count: totalCategories },
    { data: lastUpdatedRow },
  ] = await Promise.all([
    admin.from('menu_items').select('*', { count: 'exact', head: true }),
    admin.from('menu_items').select('*', { count: 'exact', head: true }).eq('available', true),
    admin.from('categories').select('*', { count: 'exact', head: true }),
    admin.from('menu_items').select('updated_at').order('updated_at', { ascending: false }).limit(1),
  ]);

  const lastUpdated = lastUpdatedRow?.[0]?.updated_at
    ? new Date(lastUpdatedRow[0].updated_at).toLocaleString('en-MY')
    : 'N/A';

  const stats = [
    { label: 'Total Menu Items', value: totalItems ?? 0, href: '/admin/menu' },
    { label: 'Active Items', value: activeItems ?? 0, href: '/admin/menu' },
    { label: 'Categories', value: totalCategories ?? 0, href: '/admin/categories' },
    { label: 'Last Updated', value: lastUpdated, href: '/admin/menu' },
  ];

  return (
    <div className="p-8">
      <h1 className="text-[28px] font-extrabold mb-2">Dashboard</h1>
      <p className="text-[#555555] text-[16px] mb-8">Welcome back! Here&apos;s a quick overview.</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="bg-white border border-[#E5E5E5] rounded-2xl p-5 hover:border-[#CC0000] hover:shadow-sm transition-all"
          >
            <p className="text-sm text-[#555555] mb-1">{s.label}</p>
            <p className="text-2xl font-bold text-[#111111]">{s.value}</p>
          </Link>
        ))}
      </div>

      <div className="flex gap-4 flex-wrap">
        <Link
          href="/admin/menu/new"
          className="bg-[#CC0000] hover:bg-[#990000] text-white font-bold text-[16px] px-6 min-h-[52px] rounded-xl inline-flex items-center"
        >
          + Add Menu Item
        </Link>
        <Link
          href="/"
          target="_blank"
          className="border border-[#E5E5E5] hover:border-[#CC0000] text-[#111111] font-semibold text-[16px] px-6 min-h-[52px] rounded-xl inline-flex items-center"
        >
          View Live Site ↗
        </Link>
      </div>
    </div>
  );
}
