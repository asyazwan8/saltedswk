import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  const { action, password } = await request.json();
  const supabase = await createClient();

  if (action === 'login') {
    const email = process.env.ADMIN_EMAIL!;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
    return NextResponse.json({ success: true });
  }

  if (action === 'logout') {
    await supabase.auth.signOut();
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
}
