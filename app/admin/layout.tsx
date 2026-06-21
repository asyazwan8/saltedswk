import Link from 'next/link';
import { LayoutDashboard, UtensilsCrossed, Tag, Settings, LogOut } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-[#F9F9F9]">
      {/* Sidebar */}
      <aside className="w-56 bg-[#111111] text-white flex flex-col shrink-0 min-h-screen">
        <div className="px-5 py-5 border-b border-white/10">
          <Link href="/admin" className="text-xl font-bold text-[#EA580C]">
            SALTed Admin
          </Link>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {[
            { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
            { href: '/admin/menu', icon: UtensilsCrossed, label: 'Menu Items' },
            { href: '/admin/categories', icon: Tag, label: 'Categories' },
            { href: '/admin/settings', icon: Settings, label: 'Settings' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 text-[15px] transition-colors min-h-[44px]"
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-white/10">
          <form action="/api/auth" method="POST">
            <input type="hidden" name="action" value="logout" />
            <Link
              href="/api/auth/signout"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 text-[15px] min-h-[44px]"
            >
              <LogOut size={18} /> Sign Out
            </Link>
          </form>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
