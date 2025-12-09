'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { label: 'پروفایل', href: '/admin/profile', icon: '👤' },
  { label: 'جزو کاربی', href: '/admin/dashboard', icon: '📊' },
  { label: 'محصولات', href: '/admin/products', icon: '📦' },
  { label: 'سفارشات', href: '/admin/orders', icon: '🛒' },
  { label: 'تبلیغات عروضه', href: '/admin/promotions', icon: '🎁' },
  { label: 'پیک‌ها', href: '/admin/deliveries', icon: '🚚' },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-700 text-white min-h-screen fixed right-0 top-0">
      {/* Profile Section */}
      <div className="p-6 bg-gray-600 text-center">
        <h2 className="text-xl font-bold">پروفایل</h2>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-6">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-6 py-4 hover:bg-gray-600 transition-colors ${
              pathname === item.href ? 'bg-gray-800' : ''
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-base">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="absolute bottom-0 w-full">
        <button className="w-full px-6 py-4 text-right hover:bg-gray-600 transition-colors text-red-400">
          خروج از پنل
        </button>
      </div>
    </aside>
  );
}
