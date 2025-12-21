"use client";

import { useEffect, useState } from "react";
import api from "@/lib/apiProvider";
import { SellerStats, PaginatedOrders } from "@/types/api.types";

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
            params: { limit: 4, sortBy: "createdAt", sortOrder: "desc" },
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
    const statusMap: Record<string, string> = {
      pending: "در انتظار",
      confirmed: "تایید شده",
      processing: "در حال پردازش",
      shipped: "ارسال شده",
      delivered: "تحویل داده شده",
      cancelled: "لغو شده",
      refunded: "بازگشت داده شده",
    };
    return statusMap[status] || status;
  };

  if (loading) {
    return (
      <div dir="rtl" className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div dir="rtl" className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <p className="text-sm text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gray-900 text-white text-xs hover:bg-gray-700 transition-colors"
          >
            تلاش مجدد
          </button>
        </div>
      </div>
    );
  }

  const dashboardStats = [
    { label: "کل فروش", value: formatCurrency(stats?.totalSales || 0) },
    { label: "سفارشات", value: formatNumber(stats?.totalOrders || 0) },
    { label: "محصولات", value: formatNumber(stats?.totalProducts || 0) },
    { label: "مشتریان", value: formatNumber(stats?.totalCustomers || 0) },
    { label: "درآمد امروز", value: formatCurrency(stats?.todayRevenue || 0) },
    { label: "بازدیدها", value: formatNumber(stats?.totalViews || 0) },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-2xl font-light text-gray-900">داشبورد</h1>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Menu */}
          <aside className="hidden lg:block lg:col-span-2">
            <nav className="space-y-1">
              <a href="#" className="block px-3 py-2 text-sm text-gray-900 hover:text-gray-600 transition-colors">
                آمار
              </a>
              <a href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                سفارشات
              </a>
              <a href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                محصولات
              </a>
              <a href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                مشتریان
              </a>
              <a href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                مالی
              </a>
              <a href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                تنظیمات
              </a>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="col-span-1 lg:col-span-7">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {dashboardStats.map((stat, index) => (
                <div key={index} className="border border-gray-200 p-6">
                  <p className="text-xs text-gray-500 mb-2">{stat.label}</p>
                  <p className="text-xl font-light text-gray-900">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Orders */}
            <div className="border border-gray-200 p-6">
              <h2 className="text-sm font-medium text-gray-900 mb-6">سفارشات اخیر</h2>
              {orders && orders.data.length > 0 ? (
                <div className="space-y-4">
                  {orders.data.map((order) => (
                    <div key={order.id} className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0">
                      <div>
                        <p className="text-sm text-gray-900">#{order.orderNumber}</p>
                        <p className="text-xs text-gray-500 mt-1">{formatDate(order.createdAt)}</p>
                      </div>
                      <div className="text-left">
                        <p className="text-sm text-gray-900">{formatCurrency(order.totalAmount)}</p>
                        <p className="text-xs text-gray-500 mt-1">{getStatusLabel(order.status)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-400 text-center py-8">هنوز سفارشی ثبت نشده است</p>
              )}
            </div>

            {/* Chart */}
            <div className="border border-gray-200 p-6 mt-6">
              <h2 className="text-sm font-medium text-gray-900 mb-6">نمودار فروش</h2>
              <div className="h-64 flex items-center justify-center bg-gray-50">
                <p className="text-xs text-gray-400">نمودار</p>
              </div>
            </div>
          </main>

          {/* Right Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6">
            {/* Notifications */}
            <div className="border border-gray-200 p-6">
              <h3 className="text-sm font-medium text-gray-900 mb-4">اعلانات</h3>
              <div className="space-y-3">
                {stats?.pendingOrders ? (
                  <p className="text-xs text-gray-600 pb-3 border-b border-gray-100">
                    {formatNumber(stats.pendingOrders)} سفارش در انتظار تایید
                  </p>
                ) : null}
                <p className="text-xs text-gray-600">آماده برای فروش</p>
              </div>
            </div>

            {/* Actions */}
            <div className="border border-gray-200 p-6">
              <h3 className="text-sm font-medium text-gray-900 mb-4">اقدامات</h3>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-gray-900 text-white text-xs hover:bg-gray-700 transition-colors">
                  افزودن محصول
                </button>
                <button className="w-full px-4 py-2 border border-gray-900 text-gray-900 text-xs hover:bg-gray-50 transition-colors">
                  مشاهده سفارشات
                </button>
              </div>
            </div>

            {/* Activity */}
            <div className="border border-gray-200 p-6">
              <h3 className="text-sm font-medium text-gray-900 mb-4">فعالیت</h3>
              <div className="space-y-3">
                {orders && orders.data.slice(0, 3).map((order, index) => (
                  <div key={order.id} className="flex items-start gap-2">
                    <div className={`w-1 h-1 ${index === 0 ? 'bg-gray-900' : 'bg-gray-400'} rounded-full mt-1.5`}></div>
                    <div>
                      <p className="text-xs text-gray-900">سفارش {order.orderNumber}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{formatDate(order.createdAt)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
