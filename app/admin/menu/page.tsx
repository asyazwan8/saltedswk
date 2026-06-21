import { requireAdmin } from '@/lib/auth';
import { createAdminClient } from '@/lib/supabase/admin';
import Link from 'next/link';
import Image from 'next/image';
import { MenuItem } from '@/lib/types';
import AdminMenuActions from './AdminMenuActions';

export default async function AdminMenuPage() {
  await requireAdmin();
  const admin = createAdminClient();
  const { data: items } = await admin
    .from('menu_items')
    .select('*, category:categories(*), variants(*)')
    .order('order', { ascending: true });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[28px] font-extrabold">Menu Items</h1>
        <Link
          href="/admin/menu/new"
          className="bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-[15px] px-5 min-h-[44px] rounded-xl inline-flex items-center"
        >
          + Add Item
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden">
        <table className="w-full text-[15px]">
          <thead className="bg-[#F9F9F9] border-b border-[#E5E5E5]">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-[#555555]">Item</th>
              <th className="text-left px-4 py-3 font-semibold text-[#555555] hidden sm:table-cell">Category</th>
              <th className="text-left px-4 py-3 font-semibold text-[#555555]">Price</th>
              <th className="text-left px-4 py-3 font-semibold text-[#555555] hidden md:table-cell">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E5E5]">
            {(items as MenuItem[])?.map((item) => (
              <tr key={item.id} className="hover:bg-[#F9F9F9]">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-10 rounded-lg overflow-hidden bg-[#F9F9F9] shrink-0 flex items-center justify-center">
                      {item.image_url ? (
                        <Image
                          src={item.image_url}
                          alt={item.name}
                          width={48}
                          height={40}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <span className="text-[#EA580C] text-xs font-bold">
                          {item.name.split(' ').slice(0, 2).map((w) => w[0]).join('')}
                        </span>
                      )}
                    </div>
                    <span className="font-medium">{item.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-[#555555] hidden sm:table-cell">
                  {item.category?.name ?? '—'}
                </td>
                <td className="px-4 py-3 font-semibold text-[#EA580C]">
                  RM {Number(item.base_price).toFixed(2)}
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span
                    className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                      item.available ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {item.available ? 'Active' : 'Hidden'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <AdminMenuActions itemId={item.id} />
                </td>
              </tr>
            ))}
            {!items?.length && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-[#555555]">
                  No menu items yet.{' '}
                  <Link href="/admin/menu/new" className="text-[#EA580C] font-medium underline">
                    Add one
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
