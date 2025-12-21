"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { label: "دیدکلی", href: "/visitor" },
  { label: "لیست مقادیر", href: "/visitor/values" },
  { label: "کالکشن‌ها", href: "/visitor/collections" },
  { label: "مشتریان", href: "/visitor/customers" },
  { label: "سطح بندی", href: "/visitor/categorization" },
  { label: "تیکت‌ها", href: "/visitor/tickets" },
];

export default function VisitorSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-primary text-text-color min-h-screen fixed right-0 top-0">
      {/* Logo Section */}
      <div className="p-6 text-text-color text-right">
        <h2 className="text-xl font-bold">لوگو</h2>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-6">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-6 py-4 hover:bg-dark-blue transition-colors ${
              pathname === item.href ? "bg-dark-blue" : ""
            }`}
          >
            <span className="text-base">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="absolute bottom-0 w-full">
        <button className="w-full px-6 py-4 text-right hover:bg-dark-blue transition-colors text-red-400">
          خروج از پنل
        </button>
      </div>
    </aside>
  );
}
