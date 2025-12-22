"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/apiProvider";
import { SellerStats, PaginatedOrders } from "@/types/api.types";
import {
  TrendingUp,
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  Eye,
  Clock,
  Plus,
  ArrowLeft,
  BarChart3,
} from "lucide-react";

export default function SellerDashboard() {
  const [stats, setStats] = useState<SellerStats | null>(null);
  const [orders, setOrders] = useState<PaginatedOrders | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch seller stats and recent orders in parallel
        const [statsResponse, ordersResponse] = await Promise.all([
          api.get<SellerStats>("/orders/seller-stats"),
          api.get<PaginatedOrders>("/orders/seller-orders", {
            params: { limit: 5, sortBy: "createdAt", sortOrder: "desc" },
          }),
        ]);

        setStats(statsResponse.data);
        setOrders(ordersResponse.data);
      } catch (err: any) {
        setError(err?.response?.data?.message || "خطا در بارگذاری اطلاعات");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("fa-IR").format(num);
  };

  const formatCurrency = (amount: number) => {
    return `${formatNumber(amount)} تومان`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 1) return "چند دقیقه پیش";
    if (hours < 24) return `${formatNumber(hours)} ساعت پیش`;
    const days = Math.floor(hours / 24);
    return `${formatNumber(days)} روز پیش`;
  };

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, { label: string; color: string }> = {
      pending: {
        label: "در انتظار",
        color:
          "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300",
      },
      confirmed: {
        label: "تایید شده",
        color:
          "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
      },
      processing: {
        label: "در حال پردازش",
        color:
          "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300",
      },
      shipped: {
        label: "ارسال شده",
        color:
          "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300",
      },
      delivered: {
        label: "تحویل داده شده",
        color:
          "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
      },
      cancelled: {
        label: "لغو شده",
        color: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
      },
      refunded: {
        label: "بازگشت داده شده",
        color: "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200",
      },
    };
    return (
      statusMap[status] || {
        label: status,
        color: "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200",
      }
    );
  };

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
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <BarChart3 className="w-8 h-8 text-red-600" />
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
      label: "کل فروش",
      value: formatCurrency(stats?.totalSales || 0),
      icon: DollarSign,
      color: "from-green-500 to-green-600",
      bgColor:
        "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-light-grey/70 dark:border-gray-700/70",
    },
    {
      label: "سفارشات",
      value: formatNumber(stats?.totalOrders || 0),
      icon: ShoppingCart,
      color: "from-blue-500 to-blue-600",
      bgColor:
        "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-light-grey/70 dark:border-gray-700/70",
    },
    {
      label: "محصولات",
      value: formatNumber(stats?.totalProducts || 0),
      icon: Package,
      color: "from-purple-500 to-purple-600",
      bgColor:
        "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-light-grey/70 dark:border-gray-700/70",
    },
    {
      label: "مشتریان",
      value: formatNumber(stats?.totalCustomers || 0),
      icon: Users,
      color: "from-orange-500 to-orange-600",
      bgColor:
        "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-light-grey/70 dark:border-gray-700/70",
    },
    {
      label: "درآمد امروز",
      value: formatCurrency(stats?.todayRevenue || 0),
      icon: TrendingUp,
      color: "from-primary to-primary",
      bgColor:
        "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-light-grey/70 dark:border-gray-700/70",
    },
    {
      label: "بازدیدها",
      value: formatNumber(stats?.totalViews || 0),
      icon: Eye,
      color: "from-cyan-500 to-cyan-600",
      bgColor:
        "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-light-grey/70 dark:border-gray-700/70",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center py-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          خوش آمدید به داشبورد فروشنده
        </h1>
        <p className="text-grey text-lg">
          آمار و اطلاعات کسب و کار شما در یک نگاه
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
                href="/dashboard/orders"
                className="text-primary hover:text-primary/80 font-medium text-sm flex items-center gap-1"
              >
                مشاهده همه
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>

            {orders && orders.data.length > 0 ? (
              <div className="space-y-4">
                {orders.data?.length > 0 &&
                  orders.data?.map((order) => {
                    const statusInfo = getStatusLabel(order.status);
                    return (
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
                              #{order.orderNumber}
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
                            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color} mt-1`}
                          >
                            {statusInfo.label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-grey mx-auto mb-4" />
                <p className="text-foreground font-medium">
                  هنوز سفارشی ثبت نشده است
                </p>
                <p className="text-sm text-grey/70 mt-1">
                  سفارشات جدید در اینجا نمایش داده می‌شوند
                </p>
              </div>
            )}
          </div>

          {/* Sales Chart Placeholder */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-light-grey/70 dark:border-gray-700/70 mt-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-primary" />
                نمودار فروش
              </h2>
              <span className="text-sm text-foreground bg-light-mint/80 dark:bg-gray-700/50 px-3 py-1 rounded-full">
                ۳۰ روز گذشته
              </span>
            </div>
            <div className="h-64 flex flex-col items-center justify-center bg-gradient-to-br from-light-mint to-white dark:from-gray-900 dark:to-gray-800 rounded-xl border-2 border-dashed border-light-grey/70 dark:border-gray-700/70">
              <BarChart3 className="w-12 h-12 text-grey mb-4" />
              <p className="text-foreground font-medium">نمودار فروش ماهانه</p>
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
              <Plus className="w-5 h-5" />
              اقدامات سریع
            </h3>
            <div className="space-y-3">
              <Link
                href="/dashboard/products"
                className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 flex items-center gap-3 transition-colors"
              >
                <Package className="w-5 h-5" />
                <span className="font-medium">افزودن محصول جدید</span>
              </Link>
              <Link
                href="/dashboard/orders"
                className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 flex items-center gap-3 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="font-medium">مدیریت سفارشات</span>
              </Link>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-light-grey/70 dark:border-gray-700/70">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" />
              اعلانات
            </h3>
            <div className="space-y-4">
              {stats?.pendingOrders ? (
                <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/40 rounded-lg">
                  <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                    <Clock className="w-4 h-4 text-yellow-600 dark:text-yellow-300" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">
                      {formatNumber(stats.pendingOrders)} سفارش در انتظار
                    </p>
                    <p className="text-xs text-grey">نیاز به تایید دارد</p>
                  </div>
                </div>
              ) : null}
              <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/40 rounded-lg">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-300" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">
                    فروش شما در حال رشد است
                  </p>
                  <p className="text-xs text-grey">
                    ۲۰% افزایش نسبت به هفته گذشته
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-light-grey/70 dark:border-gray-700/70">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              فعالیت اخیر
            </h3>
            <div className="space-y-3">
              {orders &&
                orders.data?.length > 0 &&
                orders.data?.slice(0, 4).map((order, index) => (
                  <div key={order.id} className="flex items-start gap-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        index === 0
                          ? "bg-primary"
                          : index === 1
                            ? "bg-blue-500"
                            : "bg-grey"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        سفارش {order.orderNumber}
                      </p>
                      <p className="text-xs text-grey">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
