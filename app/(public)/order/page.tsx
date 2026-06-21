import { createClient } from '@/lib/supabase/server';
import OrderClient from './OrderClient';
import { MenuItem, Category } from '@/lib/types';

export const revalidate = 60;

export default async function OrderPage() {
  const supabase = await createClient();

  const [{ data: items }, { data: categories }, { data: settingsRows }] = await Promise.all([
    supabase
      .from('menu_items')
      .select('*, variants(*), category:categories(*)')
      .eq('available', true)
      .order('order', { ascending: true }),
    supabase
      .from('categories')
      .select('*')
      .order('order', { ascending: true }),
    supabase.from('settings').select('key, value').eq('key', 'takeaway_note'),
  ]);

  const takeawayNote = settingsRows?.[0]?.value ?? '';

  return (
    <OrderClient
      items={(items as MenuItem[]) ?? []}
      categories={(categories as Category[]) ?? []}
      takeawayNote={takeawayNote}
    />
  );
}
