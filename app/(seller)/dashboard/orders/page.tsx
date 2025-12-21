"use client";

import { useState } from "react";
import { ShoppingCart, FileText } from "lucide-react";
import InvoiceViewer from "@/components/InvoiceViewer";
import { InvoiceData } from "@/components/InvoicePDF";

interface OrderItem {
  productName: string;
  quantity: number;
  price: number;
  discount: number;
  total: number;
}

interface Order {
  id: string;
  orderNumber: string;
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  tax: number;
  shippingCost: number;
  total: number;
  status:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function OrdersPage() {
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] =
    useState<Order | null>(null);

  // Mock data - will be replaced with API call
  const [orders] = useState<Order[]>([
    {
      id: "1",
      orderNumber: "ORD-2025-001",
      invoiceNumber: "INV-2025-000123",
      customerName: "علی احمدی",
      customerEmail: "ali@example.com",
      customerPhone: "۰۹۱۲۳۴۵۶۷۸۹",
      customerAddress: "تهران، خیابان ولیعصر، پلاک ۱۲۳",
      items: [
        {
          productName: "لپ تاپ ایسوس مدل VivoBook",
          quantity: 1,
          price: 25000000,
          discount: 2000000,
          total: 23000000,
        },
      ],
      subtotal: 25000000,
      discount: 2000000,
      tax: 2070000,
      shippingCost: 150000,
      total: 25220000,
      status: "delivered",
      isPaid: true,
      createdAt: "2025-12-15T10:00:00Z",
      updatedAt: "2025-12-20T15:30:00Z",
    },
    {
      id: "2",
      orderNumber: "ORD-2025-002",
      invoiceNumber: "INV-2025-000124",
      customerName: "سارا محمدی",
      customerEmail: "sara@example.com",
      customerPhone: "۰۹۱۲۸۷۶۵۴۳۲",
      customerAddress: "مشهد، خیابان امام رضا، پلاک ۴۵",
      items: [
        {
          productName: "موس بی‌سیم لاجیتک MX Master",
          quantity: 2,
          price: 3500000,
          discount: 0,
          total: 7000000,
        },
        {
          productName: "کیبورد مکانیکی کی‌برون K2",
          quantity: 1,
          price: 4200000,
          discount: 500000,
          total: 3700000,
        },
      ],
      subtotal: 11200000,
      discount: 500000,
      tax: 963000,
      shippingCost: 200000,
      total: 11863000,
      status: "processing",
      isPaid: true,
      createdAt: "2025-12-18T14:20:00Z",
      updatedAt: "2025-12-19T09:15:00Z",
    },
    {
      id: "3",
      orderNumber: "ORD-2025-003",
      invoiceNumber: "INV-2025-000125",
      customerName: "محمد رضایی",
      customerEmail: "mohammad@example.com",
      customerPhone: "۰۹۱۳۷۶۵۴۳۲۱",
      customerAddress: "اصفهان، خیابان چهارباغ، پلاک ۷۸",
      items: [
        {
          productName: "هدفون سونی WH-1000XM5",
          quantity: 1,
          price: 15000000,
          discount: 1000000,
          total: 14000000,
        },
      ],
      subtotal: 15000000,
      discount: 1000000,
      tax: 1260000,
      shippingCost: 180000,
      total: 15440000,
      status: "pending",
      isPaid: false,
      createdAt: "2025-12-21T08:45:00Z",
      updatedAt: "2025-12-21T08:45:00Z",
    },
    {
      id: "4",
      orderNumber: "ORD-2025-004",
      invoiceNumber: "INV-2025-000126",
      customerName: "فاطمه کریمی",
      customerEmail: "fatemeh@example.com",
      customerPhone: "۰۹۱۲۵۵۵۱۲۳۴",
      customerAddress: "شیراز، خیابان زند، پلاک ۲۳",
      items: [
        {
          productName: "پاوربانک شیائومی 20000mAh",
          quantity: 3,
          price: 1800000,
          discount: 0,
          total: 5400000,
        },
      ],
      subtotal: 5400000,
      discount: 0,
      tax: 486000,
      shippingCost: 120000,
      total: 6006000,
      status: "confirmed",
      isPaid: true,
      createdAt: "2025-12-20T16:30:00Z",
      updatedAt: "2025-12-21T10:00:00Z",
    },
  ]);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("fa-IR").format(num);
  };

  const formatCurrency = (amount: number) => {
    return `${formatNumber(amount)} تومان`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      pending: "در انتظار تایید",
      confirmed: "تایید شده",
      processing: "در حال پردازش",
      shipped: "ارسال شده",
      delivered: "تحویل داده شده",
      cancelled: "لغو شده",
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      pending:
        "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400",
      confirmed:
        "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400",
      processing:
        "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400",
      shipped:
        "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-400",
      delivered:
        "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400",
      cancelled: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400",
    };
    return (
      colorMap[status] ||
      "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
    );
  };

  const convertOrderToInvoiceData = (order: Order): InvoiceData => {
    return {
      invoiceNumber: order.invoiceNumber,
      issueDate: order.createdAt,
      dueDate: new Date(
        new Date(order.createdAt).getTime() + 7 * 24 * 60 * 60 * 1000
      ).toISOString(),
      subtotal: order.subtotal,
      discount: order.discount,
      tax: order.tax,
      shippingCost: order.shippingCost,
      total: order.total,
      customerInfo: {
        name: order.customerName,
        phone: order.customerPhone,
        email: order.customerEmail,
        address: order.customerAddress,
      },
      sellerInfo: {
        shopName: "فروشگاه بنفش",
        businessName: "شرکت فروشگاه بنفش",
        taxNumber: "TAX-987654",
        address: "تهران، سعادت آباد، پلاک ۴۵",
        phone: "۰۲۱۱۲۳۴۵۶۷۸",
        email: "support@purpleshop.ir",
      },
      items: order.items,
      notes:
        "از خرید شما متشکریم. این فاکتور رسمی و قابل استفاده برای امور مالیاتی می‌باشد.",
      isPaid: order.isPaid,
      paidAt: order.isPaid ? order.updatedAt : null,
    };
  };

  const handleViewInvoice = (order: Order) => {
    setSelectedOrderForInvoice(order);
  };

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const deliveredOrders = orders.filter((o) => o.status === "delivered").length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-primary" />
            سفارشات
          </h2>
          <p className="text-sm text-grey mt-1">مدیریت و پیگیری سفارشات</p>
        </div>
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
          <p className="text-xs text-grey mb-2">در انتظار</p>
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
          <p className="text-xs text-grey mb-2">کل درآمد</p>
          <p className="text-2xl font-bold text-primary">
            {formatCurrency(totalRevenue)}
          </p>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-light-grey dark:border-gray-700 rounded-xl overflow-hidden shadow-lg">
        {/* Table Header */}
        <div className="hidden md:grid md:grid-cols-12 gap-4 p-4 border-b border-light-grey dark:border-gray-700 bg-light-mint/50 dark:bg-gray-700/50">
          <div className="col-span-2 text-xs font-bold text-foreground">
            شماره سفارش
          </div>
          <div className="col-span-2 text-xs font-bold text-foreground">
            مشتری
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
                    {order.invoiceNumber}
                  </p>
                </div>

                {/* Customer */}
                <div className="col-span-1 md:col-span-2">
                  <p className="text-sm font-bold text-foreground">
                    {order.customerName}
                  </p>
                  <p className="text-xs text-grey mt-1">
                    {order.customerPhone}
                  </p>
                </div>

                {/* Date */}
                <div className="col-span-1 md:col-span-2">
                  <p className="text-sm font-bold text-foreground">
                    {formatDate(order.createdAt)}
                  </p>
                  <p className="text-xs text-grey mt-1">
                    {formatNumber(
                      order.items.reduce((sum, item) => sum + item.quantity, 0)
                    )}{" "}
                    کالا
                  </p>
                </div>

                {/* Total */}
                <div className="col-span-1 md:col-span-2">
                  <p className="text-sm font-bold text-foreground">
                    {formatCurrency(order.total)}
                  </p>
                  <p
                    className={`text-xs mt-1 ${order.isPaid ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                  >
                    {order.isPaid ? "✓ پرداخت شده" : "● پرداخت نشده"}
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
                    onClick={() => handleViewInvoice(order)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-primary hover:bg-primary/90 text-text-color text-xs font-medium rounded-lg transition-all shadow-sm"
                    title="مشاهده فاکتور"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">فاکتور</span>
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
          </div>
        )}
      </div>

      {/* Invoice Modal */}
      {selectedOrderForInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-foreground">
                فاکتور {selectedOrderForInvoice.invoiceNumber}
              </h3>
              <button
                onClick={() => setSelectedOrderForInvoice(null)}
                className="p-2 hover:bg-light-grey dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            <InvoiceViewer
              data={convertOrderToInvoiceData(selectedOrderForInvoice)}
              showPreview={false}
            />

            <button
              onClick={() => setSelectedOrderForInvoice(null)}
              className="mt-6 w-full px-4 py-2 bg-light-grey dark:bg-gray-700 hover:bg-grey dark:hover:bg-gray-600 text-foreground font-medium rounded-xl transition-all"
            >
              بستن
            </button>
          </div>
        </div>
      )}
    </>
  );
}
