'use client';

import { useState } from 'react';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

interface Props {
  settings: Record<string, string>;
}

const FIELDS = [
  { key: 'restaurant_name', label: 'Restaurant Name', type: 'text' },
  { key: 'tagline', label: 'Tagline', type: 'text' },
  { key: 'whatsapp_number', label: 'WhatsApp Number', type: 'text', hint: 'No + or spaces. e.g. 60374935266' },
  { key: 'phone', label: 'Display Phone Number', type: 'text' },
  { key: 'email', label: 'Email', type: 'email' },
  { key: 'address', label: 'Address', type: 'text' },
  { key: 'instagram', label: 'Instagram URL', type: 'url' },
  { key: 'facebook', label: 'Facebook URL', type: 'url' },
  { key: 'operating_hours', label: 'Operating Hours Text', type: 'text' },
  { key: 'pickup_open_time', label: 'Pickup Open Time', type: 'time' },
  { key: 'pickup_close_time', label: 'Pickup Close Time', type: 'time' },
];

export default function AdminSettingsClient({ settings: initial }: Props) {
  const [fields, setFields] = useState<Record<string, string>>(initial);
  const [closedDays, setClosedDays] = useState<number[]>(
    (initial.closed_days ?? '1').split(',').map(Number)
  );
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  function handleChange(key: string, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }));
  }

  function toggleDay(day: number) {
    setClosedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day].sort()
    );
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    const payload = { ...fields, closed_days: closedDays.join(',') };
    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } else {
      const d = await res.json();
      setError(d.error || 'Save failed.');
    }
  }

  return (
    <form onSubmit={handleSave} className="max-w-2xl space-y-6">
      {error && (
        <div className="bg-red-50 text-red-700 border border-red-200 rounded-xl px-4 py-3 text-[15px]">
          {error}
        </div>
      )}

      {FIELDS.map(({ key, label, type, hint }) => (
        <div key={key}>
          <label htmlFor={`setting-${key}`} className="block font-semibold text-[15px] mb-1">
            {label}
          </label>
          <input
            id={`setting-${key}`}
            type={type}
            value={fields[key] ?? ''}
            onChange={(e) => handleChange(key, e.target.value)}
            className="w-full border border-[#E5E5E5] rounded-xl px-4 py-3 text-[16px] focus:outline-none focus:border-[#CC0000] min-h-[52px]"
          />
          {hint && <p className="text-sm text-[#555555] mt-1">{hint}</p>}
        </div>
      ))}

      {/* Closed days */}
      <div>
        <p className="font-semibold text-[15px] mb-2">Closed Days</p>
        <div className="flex flex-wrap gap-2">
          {DAYS.map((day, idx) => (
            <button
              key={day}
              type="button"
              onClick={() => toggleDay(idx)}
              className={`px-4 min-h-[44px] rounded-xl text-[15px] font-medium border transition-colors ${
                closedDays.includes(idx)
                  ? 'bg-[#CC0000] text-white border-[#CC0000]'
                  : 'border-[#E5E5E5] text-[#555555] hover:border-[#CC0000]'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={saving}
        className={`px-8 min-h-[52px] rounded-xl font-bold text-[16px] transition-colors ${
          saved
            ? 'bg-green-600 text-white'
            : 'bg-[#CC0000] hover:bg-[#990000] text-white'
        } disabled:opacity-60`}
      >
        {saved ? '✓ Saved!' : saving ? 'Saving…' : 'Save Settings'}
      </button>
    </form>
  );
}
