"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, FileText, Loader2, RefreshCw, Package } from "lucide-react";
import { ordersService } from "@/services/orders.service";
import { Order as ApiOrder } from "@/types/api.types";
import {
  formatNumber,
  formatCurrency,
  formatDate,
  getStatusLabel,
  getStatusColor,
} from "@/utils/formatters";

export default function BuyerOrdersPage() {
  const [orders, setOrders] = useState<ApiOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // Fetch orders from API
  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      // Using the same endpoint but it should return buyer's own orders based on auth
      const response = await ordersService.getSellerOrders({
        page,
        limit: 10,
        sortBy: "createdAt",
        sortOrder: "desc",
      });

      setOrders(response.data);
      setTotal(response.total);
      setTotalPages(response.totalPages);
    } catch (err: any) {
      setError(err?.response?.data?.message || "خطا در دریافت سفارشات");
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const totalOrders = loading ? 0 : total;
  const pendingOrders = loading
    ? 0
    : orders.filter((o) => o.status === "pending" || o.status === "confirmed")
        .length;
  const deliveredOrders = loading
    ? 0
    : orders.filter((o) => o.status === "delivered").length;
  const totalSpent = loading
    ? 0
    : orders.reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-primary" />
            سفارشات من
          </h2>
          <p className="text-sm text-grey mt-1">مشاهده و پیگیری سفارشات</p>
        </div>
        <button
          onClick={fetchOrders}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-light-grey dark:border-gray-700 text-foreground rounded-lg hover:bg-light-mint dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          <span className="text-sm font-medium">بروزرسانی</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-light-grey dark:border-gray-700 rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow">
          <p className="text-xs text-grey mb-2">کل سفارشات</p>
          <p className="text-2xl font-bold text-foreground">
            {formatNumber(totalOrders)}
          </p>
        </div>
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-light-grey dark:border-gray-700 rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow">
          <p className="text-xs text-grey mb-2">در حال پردازش</p>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {formatNumber(pendingOrders)}
          </p>
        </div>
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-light-grey dark:border-gray-700 rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow">
          <p className="text-xs text-grey mb-2">تحویل شده</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {formatNumber(deliveredOrders)}
          </p>
        </div>
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-light-grey dark:border-gray-700 rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow">
          <p className="text-xs text-grey mb-2">کل خرید</p>
          <p className="text-2xl font-bold text-primary">
            {formatCurrency(totalSpent)}
          </p>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-light-grey dark:border-gray-700 rounded-xl overflow-hidden shadow-lg p-12">
          <div className="flex flex-col items-center justify-center">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="text-sm text-grey font-medium">
              در حال دریافت سفارشات...
            </p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
          <p className="text-red-800 dark:text-red-400 font-medium mb-3">
            خطا در دریافت سفارشات
          </p>
          <p className="text-sm text-red-600 dark:text-red-300 mb-4">{error}</p>
          <button
            onClick={fetchOrders}
            className="px-4 py-2 bg-primary hover:bg-primary/90 text-text-color text-sm font-medium rounded-lg transition-all"
          >
            تلاش مجدد
          </button>
        </div>
      )}

      {/* Orders List */}
      {!loading && !error && (
        <>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-light-grey dark:border-gray-700 rounded-xl overflow-hidden shadow-lg">
            {/* Table Header */}
            <div className="hidden md:grid md:grid-cols-12 gap-4 p-4 border-b border-light-grey dark:border-gray-700 bg-light-mint/50 dark:bg-gray-700/50">
              <div className="col-span-2 text-xs font-bold text-foreground">
                شماره سفارش
              </div>
              <div className="col-span-2 text-xs font-bold text-foreground">
                فروشنده
              </div>
              <div className="col-span-2 text-xs font-bold text-foreground">
                تاریخ
              </div>
              <div className="col-span-2 text-xs font-bold text-foreground">
                مبلغ
              </div>
              <div className="col-span-2 text-xs font-bold text-foreground">
                وضعیت
              </div>
              <div className="col-span-2 text-xs font-bold text-foreground">
                عملیات
              </div>
            </div>

            {/* Orders */}
            {orders.length > 0 ? (
              <div className="divide-y divide-light-grey dark:divide-gray-700">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 hover:bg-light-mint/50 dark:hover:bg-gray-700/50 transition-all"
                  >
                    {/* Order Number */}
                    <div className="col-span-1 md:col-span-2">
                      <p className="text-sm font-bold text-foreground">
                        {order.orderNumber}
                      </p>
                      <p className="text-xs text-grey mt-1">
                        {formatNumber(order.items.length)} کالا
                      </p>
                    </div>

                    {/* Seller */}
                    <div className="col-span-1 md:col-span-2">
                      <p className="text-sm font-bold text-foreground">
                        {order.seller?.name || "فروشنده"}
                      </p>
                      <p className="text-xs text-grey mt-1">
                        {order.seller?.phone || "-"}
                      </p>
                    </div>

                    {/* Date */}
                    <div className="col-span-1 md:col-span-2">
                      <p className="text-sm font-bold text-foreground">
                        {formatDate(order.createdAt)}
                      </p>
                      <p className="text-xs text-grey mt-1">
                        {new Date(order.createdAt).toLocaleTimeString("fa-IR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>

                    {/* Total */}
                    <div className="col-span-1 md:col-span-2">
                      <p className="text-sm font-bold text-foreground">
                        {formatCurrency(order.totalAmount)}
                      </p>
                      <p
                        className={`text-xs mt-1 ${order.paymentStatus === "paid" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                      >
                        {order.paymentStatus === "paid"
                          ? "✓ پرداخت شده"
                          : "● پرداخت نشده"}
                      </p>
                    </div>

                    {/* Status */}
                    <div className="col-span-1 md:col-span-2">
                      <span
                        className={`inline-block text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(order.status)}`}
                      >
                        {getStatusLabel(order.status)}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="col-span-1 md:col-span-2 flex gap-2">
                      <button
                        className="flex items-center gap-1 px-3 py-1.5 bg-primary hover:bg-primary/90 text-text-color text-xs font-medium rounded-lg transition-all shadow-sm"
                        title="مشاهده جزئیات"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">جزئیات</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <ShoppingCart className="w-16 h-16 text-grey mx-auto mb-4" />
                <p className="text-sm text-grey font-medium">
                  هنوز سفارشی ثبت نشده است
                </p>
                <p className="text-xs text-grey/70 mt-2">
                  سفارشات شما در اینجا نمایش داده می‌شوند
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2">
              <button
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-white dark:bg-gray-800 border border-light-grey dark:border-gray-700 text-foreground rounded-lg hover:bg-light-mint dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                قبلی
              </button>
              <span className="px-4 py-2 text-sm text-foreground">
                صفحه {page} از {totalPages}
              </span>
              <button
                onClick={() =>
                  setPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={page === totalPages}
                className="px-4 py-2 bg-white dark:bg-gray-800 border border-light-grey dark:border-gray-700 text-foreground rounded-lg hover:bg-light-mint dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                بعدی
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}
