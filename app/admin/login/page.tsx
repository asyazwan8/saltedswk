'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'login', password }),
    });
    setLoading(false);
    if (res.ok) {
      router.push('/admin');
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || 'Incorrect password.');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#F9F9F9]">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-sm">
        <h1 className="text-[22px] font-bold mb-1">Admin Login</h1>
        <p className="text-[#555555] text-sm mb-6">SALTed Restaurant Dashboard</p>

        {error && (
          <div className="bg-red-50 text-red-700 border border-red-200 rounded-xl px-4 py-3 text-[15px] mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block font-semibold text-[15px] mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-[#E5E5E5] rounded-xl px-4 py-3 text-[16px] focus:outline-none focus:border-[#1A1A1A] min-h-[52px]"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1A1A1A] hover:bg-[#000000] text-white font-bold text-[16px] min-h-[52px] rounded-xl transition-colors disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
