"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  ShoppingCart,
  Heart,
  MapPin,
  Wallet,
  Bell,
  Settings,
  Home,
  Menu,
  X,
  User,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export default function BuyerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: "داشبورد", href: "/dashboard/buyer", icon: Home },
    { label: "سفارشات من", href: "/dashboard/buyer/orders", icon: ShoppingCart },
    { label: "علاقه‌مندی‌ها", href: "/dashboard/buyer/wishlist", icon: Heart },
    { label: "آدرس‌ها", href: "/dashboard/buyer/addresses", icon: MapPin },
    { label: "کیف پول", href: "/dashboard/buyer/wallet", icon: Wallet },
    { label: "اعلانات", href: "/dashboard/buyer/notifications", icon: Bell },
    { label: "تنظیمات", href: "/dashboard/buyer/settings", icon: Settings },
  ];

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gradient-to-br from-secondary via-background to-light-mint"
    >
      {/* Header */}
      <header className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Mobile menu button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/70 dark:bg-gray-800/70 text-foreground"
                aria-label="باز کردن منو"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-text-color" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  داشبورد خریدار
                </h1>
                <p className="text-sm text-grey">پنل کاربری شما</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">
                  کاربر عزیز
                </p>
                <p className="text-xs text-grey">خوش آمدید</p>
              </div>
              <div className="w-10 h-10 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary">ک</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <button
            type="button"
            className="absolute inset-0 bg-black/30"
            aria-label="بستن منو"
            onClick={() => setMobileMenuOpen(false)}
          />

          <aside className="absolute right-0 top-0 h-full w-[86%] max-w-sm bg-white/95 dark:bg-gray-900/95 backdrop-blur-md p-5">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-text-color" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">منو</p>
                  <p className="text-xs text-grey">داشبورد خریدار</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-foreground"
                aria-label="بستن"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors",
                      isActive
                        ? "text-primary"
                        : "text-foreground hover:text-primary"
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-5 h-5",
                        isActive ? "text-primary" : "text-grey"
                      )}
                    />
                    <span
                      className={cn("font-medium", isActive && "font-bold")}
                    >
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Menu */}
          <aside className="hidden lg:block lg:col-span-2">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6">
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
                          ? "text-primary"
                          : "text-foreground hover:text-primary"
                      )}
                    >
                      <Icon
                        className={cn(
                          "w-5 h-5",
                          isActive
                            ? "text-primary"
                            : "text-grey group-hover:text-primary"
                        )}
                      />
                      <span
                        className={cn("font-medium", isActive && "font-bold")}
                      >
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </nav>

              {/* User Info Card */}
              <div className="mt-8 pt-6 border-t border-light-grey/60 dark:border-gray-700/60">
                <h3 className="text-sm font-bold text-foreground mb-3">
                  اطلاعات حساب
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-grey">امتیاز</span>
                    <span className="font-bold text-primary">۱۲۰</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-grey">کیف پول</span>
                    <span className="font-bold text-primary">۵۰۰K تومان</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="col-span-1 lg:col-span-10">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
