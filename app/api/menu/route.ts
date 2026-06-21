import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { requireAdmin } from '@/lib/auth';

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('menu_items')
    .select('*, category:categories(*), variants(*)')
    .order('order', { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  await requireAdmin();
  const body = await request.json();
  const admin = createAdminClient();

  const { variants, ...itemData } = body;
  const { data: item, error } = await admin
    .from('menu_items')
    .insert(itemData)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (variants?.length) {
    const { error: vErr } = await admin
      .from('variants')
      .insert(variants.map((v: { name: string; price_add: number }) => ({ ...v, menu_item_id: item.id })));
    if (vErr) return NextResponse.json({ error: vErr.message }, { status: 500 });
  }

  return NextResponse.json(item, { status: 201 });
}
