"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { BarChart3, Package, ShoppingCart, Users, DollarSign, Settings, Home } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menuItems = [
    { label: "داشبورد", href: "/dashboard", icon: Home },
    { label: "سفارشات", href: "/dashboard/orders", icon: ShoppingCart },
    { label: "محصولات", href: "/dashboard/products", icon: Package },
    { label: "آمار فروش", href: "/dashboard/analytics", icon: BarChart3 },
    { label: "مشتریان", href: "/dashboard/customers", icon: Users },
    { label: "مالی", href: "/dashboard/finance", icon: DollarSign },
    { label: "تنظیمات", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-secondary via-background to-light-mint">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-light-grey shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">داشبورد فروشنده</h1>
                <p className="text-sm text-grey">مدیریت کسب و کار شما</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">فروشنده عزیز</p>
                <p className="text-xs text-grey">خوش آمدید</p>
              </div>
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary">ف</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Menu */}
          <aside className="hidden lg:block lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-light-grey">
              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                        isActive
                          ? "bg-primary text-white shadow-md"
                          : "text-foreground hover:bg-primary/10 hover:text-primary"
                      )}
                    >
                      <Icon className={cn(
                        "w-5 h-5",
                        isActive ? "text-white" : "text-grey group-hover:text-primary"
                      )} />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Quick Stats */}
              <div className="mt-8 pt-6 border-t border-light-grey">
                <h3 className="text-sm font-bold text-foreground mb-3">وضعیت امروز</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-grey">سفارشات</span>
                    <span className="font-bold text-primary">۱۲</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-grey">فروش</span>
                    <span className="font-bold text-primary">۲.۵M تومان</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="col-span-1 lg:col-span-10">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-light-grey">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
