import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { requireAdmin } from '@/lib/auth';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const admin = createAdminClient();
  const { data, error } = await admin
    .from('menu_items')
    .select('*, category:categories(*), variants(*)')
    .eq('id', id)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json(data);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await params;
  const body = await request.json();
  const admin = createAdminClient();
  const { variants, ...itemData } = body;

  const { error } = await admin.from('menu_items').update(itemData).eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (variants !== undefined) {
    await admin.from('variants').delete().eq('menu_item_id', id);
    if (variants.length > 0) {
      await admin.from('variants').insert(
        variants.map((v: { name: string; price_add: number }) => ({ ...v, menu_item_id: id }))
      );
    }
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await params;
  const admin = createAdminClient();
  const { error } = await admin.from('menu_items').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
