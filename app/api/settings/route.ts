import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { requireAdmin } from '@/lib/auth';

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('settings').select('*');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  const map = Object.fromEntries(data.map((s) => [s.key, s.value]));
  return NextResponse.json(map);
}

export async function PUT(request: NextRequest) {
  await requireAdmin();
  const body = await request.json() as Record<string, string>;
  const admin = createAdminClient();

  const entries = Object.entries(body).map(([key, value]) => ({ key, value }));
  const { error } = await admin.from('settings').upsert(entries, { onConflict: 'key' });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
