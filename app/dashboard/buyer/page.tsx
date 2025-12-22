"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/apiProvider";
import { PaginatedOrders } from "@/types/api.types";
import {
  ShoppingCart,
  Heart,
  Package,
  DollarSign,
  TrendingUp,
  Clock,
  ArrowLeft,
  Star,
  Gift,
  Wallet,
} from "lucide-react";
import {
  formatNumber,
  formatCurrency,
  formatDate,
  getStatusLabel,
  getStatusColor,
} from "@/utils/formatters";

interface BuyerStats {
  totalOrders: number;
  pendingOrders: number;
  deliveredOrders: number;
  totalSpent: number;
  wishlistItems: number;
  loyaltyPoints: number;
}

export default function BuyerDashboard() {
  const [stats, setStats] = useState<BuyerStats | null>(null);
  const [orders, setOrders] = useState<PaginatedOrders | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch buyer stats and recent orders
        // Note: These endpoints should be created in the API
        const [ordersResponse] = await Promise.all([
          api.get<{ data: PaginatedOrders }>("/orders", {
            params: { limit: 5, sortBy: "createdAt", sortOrder: "desc" },
          }),
        ]);

        setOrders(ordersResponse.data.data);

        // Calculate stats from orders (temporary until API provides buyer stats endpoint)
        const ordersData = ordersResponse.data.data.data;
        const calculatedStats: BuyerStats = {
          totalOrders: ordersResponse.data.data.total,
          pendingOrders: ordersData.filter(
            (o) => o.status === "pending" || o.status === "confirmed"
          ).length,
          deliveredOrders: ordersData.filter((o) => o.status === "delivered")
            .length,
          totalSpent: ordersData.reduce((sum, o) => sum + o.totalAmount, 0),
          wishlistItems: 0, // TODO: Get from wishlist API
          loyaltyPoints: 0, // TODO: Get from user profile API
        };
        setStats(calculatedStats);
      } catch (err: any) {
        setError(err?.response?.data?.message || "خطا در بارگذاری اطلاعات");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6"></div>
        <p className="text-lg font-medium text-foreground">
          در حال بارگذاری داشبورد...
        </p>
        <p className="text-sm text-grey mt-2">لطفا کمی صبر کنید</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6">
          <ShoppingCart className="w-8 h-8 text-red-600 dark:text-red-400" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-2">
          خطا در بارگذاری
        </h2>
        <p className="text-grey mb-6 max-w-md">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-primary text-text-color font-medium rounded-xl hover:bg-primary/90 transition-colors shadow-lg"
        >
          تلاش مجدد
        </button>
      </div>
    );
  }

  const dashboardStats = [
    {
      label: "کل سفارشات",
      value: formatNumber(stats?.totalOrders || 0),
      icon: ShoppingCart,
      color: "from-blue-500 to-blue-600",
      bgColor:
        "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-light-grey/70 dark:border-gray-700/70",
    },
    {
      label: "در حال پردازش",
      value: formatNumber(stats?.pendingOrders || 0),
      icon: Clock,
      color: "from-yellow-500 to-yellow-600",
      bgColor:
        "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-light-grey/70 dark:border-gray-700/70",
    },
    {
      label: "تحویل شده",
      value: formatNumber(stats?.deliveredOrders || 0),
      icon: Package,
      color: "from-green-500 to-green-600",
      bgColor:
        "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-light-grey/70 dark:border-gray-700/70",
    },
    {
      label: "کل خرید",
      value: formatCurrency(stats?.totalSpent || 0),
      icon: DollarSign,
      color: "from-purple-500 to-purple-600",
      bgColor:
        "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-light-grey/70 dark:border-gray-700/70",
    },
    {
      label: "علاقه‌مندی‌ها",
      value: formatNumber(stats?.wishlistItems || 0),
      icon: Heart,
      color: "from-pink-500 to-pink-600",
      bgColor:
        "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-light-grey/70 dark:border-gray-700/70",
    },
    {
      label: "امتیاز من",
      value: formatNumber(stats?.loyaltyPoints || 0),
      icon: Star,
      color: "from-primary to-primary",
      bgColor:
        "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-light-grey/70 dark:border-gray-700/70",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center py-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          خوش آمدید به داشبورد خریدار
        </h1>
        <p className="text-grey text-lg">
          سفارشات و اطلاعات خرید شما در یک نگاه
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`${stat.bgColor} rounded-2xl p-6 transition-colors duration-300`}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}
                >
                  <Icon className="w-6 h-6 text-text-color" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-grey">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">
                    {stat.value}
                  </p>
                </div>
              </div>
              <div className="w-full bg-light-grey/60 dark:bg-gray-700/60 rounded-full h-2">
                <div
                  className={`h-2 bg-gradient-to-r ${stat.color} rounded-full`}
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-light-grey/70 dark:border-gray-700/70">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <ShoppingCart className="w-6 h-6 text-primary" />
                سفارشات اخیر
              </h2>
              <Link
                href="/dashboard/buyer/orders"
                className="text-primary hover:text-primary/80 font-medium text-sm flex items-center gap-1"
              >
                مشاهده همه
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>

            {orders && orders.data.length > 0 ? (
              <div className="space-y-4">
                {orders.data.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 bg-light-mint/50 dark:bg-gray-700/40 rounded-xl hover:bg-light-mint dark:hover:bg-gray-700/60 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center">
                        <ShoppingCart className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          سفارش #{order.orderNumber}
                        </p>
                        <p className="text-sm text-grey flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-foreground text-lg">
                        {formatCurrency(order.totalAmount)}
                      </p>
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)} mt-1`}
                      >
                        {getStatusLabel(order.status)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-grey mx-auto mb-4" />
                <p className="text-foreground font-medium">
                  هنوز سفارشی ثبت نشده است
                </p>
                <p className="text-sm text-grey/70 mt-1">
                  سفارشات شما در اینجا نمایش داده می‌شوند
                </p>
                <Link
                  href="/"
                  className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-primary text-text-color font-medium rounded-xl hover:bg-primary/90 transition-colors shadow-lg"
                >
                  <ShoppingCart className="w-5 h-5" />
                  شروع خرید
                </Link>
              </div>
            )}
          </div>

          {/* Recommended Products Placeholder */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-light-grey/70 dark:border-gray-700/70 mt-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-primary" />
                پیشنهاد ویژه
              </h2>
              <span className="text-sm text-foreground bg-light-mint/80 dark:bg-gray-700/50 px-3 py-1 rounded-full">
                بر اساس علاقه‌مندی‌ها
              </span>
            </div>
            <div className="h-64 flex flex-col items-center justify-center bg-gradient-to-br from-light-mint to-white dark:from-gray-900 dark:to-gray-800 rounded-xl border-2 border-dashed border-light-grey/70 dark:border-gray-700/70">
              <Package className="w-12 h-12 text-grey mb-4" />
              <p className="text-foreground font-medium">محصولات پیشنهادی</p>
              <p className="text-sm text-grey/70 mt-1">
                به زودی در دسترس خواهد بود
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 text-text-color shadow-lg">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Gift className="w-5 h-5" />
              دسترسی سریع
            </h3>
            <div className="space-y-3">
              <Link
                href="/dashboard/buyer/orders"
                className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 flex items-center gap-3 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="font-medium">سفارشات من</span>
              </Link>
              <Link
                href="/dashboard/buyer/wishlist"
                className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 flex items-center gap-3 transition-colors"
              >
                <Heart className="w-5 h-5" />
                <span className="font-medium">لیست علاقه‌مندی‌ها</span>
              </Link>
              <Link
                href="/dashboard/buyer/wallet"
                className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 flex items-center gap-3 transition-colors"
              >
                <Wallet className="w-5 h-5" />
                <span className="font-medium">کیف پول</span>
              </Link>
            </div>
          </div>

          {/* Wallet Balance */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-light-grey/70 dark:border-gray-700/70">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Wallet className="w-5 h-5 text-primary" />
              کیف پول
            </h3>
            <div className="bg-gradient-to-br from-primary to-primary/80 rounded-xl p-5 text-text-color mb-4">
              <p className="text-sm opacity-90 mb-2">موجودی کیف پول</p>
              <p className="text-3xl font-bold">۰ تومان</p>
            </div>
            <Link
              href="/dashboard/buyer/wallet"
              className="w-full block text-center px-4 py-2 bg-light-mint dark:bg-gray-700 hover:bg-light-mint/80 dark:hover:bg-gray-600 text-foreground font-medium rounded-xl transition-colors"
            >
              شارژ کیف پول
            </Link>
          </div>

          {/* Loyalty Points */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-light-grey/70 dark:border-gray-700/70">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" />
              امتیاز وفاداری
            </h3>
            <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/40 rounded-lg mb-4">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-300" />
              </div>
              <div>
                <p className="font-bold text-foreground text-2xl">۰</p>
                <p className="text-xs text-grey">امتیاز فعلی</p>
              </div>
            </div>
            <p className="text-sm text-grey text-center">
              با هر خرید امتیاز کسب کنید و از تخفیف‌های ویژه بهره‌مند شوید
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
