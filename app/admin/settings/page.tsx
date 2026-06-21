import { requireAdmin } from '@/lib/auth';
import { createAdminClient } from '@/lib/supabase/admin';
import AdminSettingsClient from './AdminSettingsClient';

export default async function AdminSettingsPage() {
  await requireAdmin();
  const admin = createAdminClient();
  const { data } = await admin.from('settings').select('*');
  const settings = Object.fromEntries((data ?? []).map((s) => [s.key, s.value]));

  return (
    <div className="p-8">
      <h1 className="text-[28px] font-extrabold mb-6">Settings</h1>
      <AdminSettingsClient settings={settings} />
    </div>
  );
}
