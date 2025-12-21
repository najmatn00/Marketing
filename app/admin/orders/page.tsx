"use client";

import { useState, useMemo } from "react";
import { Search, Bell, Eye, Pencil, Trash2 } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Pagination from "@/components/admin/Pagination";

export interface Order {
  id: number;
  buyer: string;
  phone: string;
  date: string;
  finalPrice: string;
  status: string;
}

const initialOrders: Order[] = [
  {
    id: 1,
    buyer: "سینا رضایی",
    phone: "09120000001",
    date: "1403/10/01",
    finalPrice: "مجموع قیمت",
    status: "در انتظار تأیید شده، ارسال نشده",
  },
  {
    id: 2,
    buyer: "محمد حسینی",
    phone: "09120000002",
    date: "1403/10/02",
    finalPrice: "مجموع قیمت",
    status: "در انتظار تأیید شده، ارسال نشده",
  },
  {
    id: 3,
    buyer: "زهرا احمدی",
    phone: "09120000003",
    date: "1403/10/03",
    finalPrice: "مجموع قیمت",
    status: "در انتظار تأیید شده، ارسال نشده",
  },
];

const ITEMS_PER_PAGE = 8;

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = useMemo(() => {
    if (!searchQuery.trim()) return orders;

    const q = searchQuery.toLowerCase();
    return orders.filter(
      (o) =>
        o.buyer.toLowerCase().includes(q) ||
        o.phone.toLowerCase().includes(q) ||
        o.status.toLowerCase().includes(q)
    );
  }, [orders, searchQuery]);

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredOrders.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredOrders, currentPage]);

  const handleDelete = (id: number) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  const handleView = (order: Order) => {
    alert(`سفارش ${order.id}\nخریدار: ${order.buyer}`);
  };

  const handleEdit = (order: Order) => {
    alert(`ویرایش سفارش: ${order.id}`);
  };

  return (
    <div className="flex min-h-screen bg-background" dir="rtl">
      <AdminSidebar />

      <main className="flex-1 mr-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-dark-blue">
            سفارشات ثبت شده شما
          </h1>

          <div className="flex items-center gap-4">
            <button className="p-2 border border-dark-blue rounded-lg relative">
              <Bell className="w-6 h-6 text-dark-blue" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <select className="px-4 py-2 bg-white rounded border">
              <option>سبد خریدان</option>
            </select>
          </div>
        </div>

        {/* Search */}
        <div className="rounded-lg p-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 max-w-md relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="جست و جو..."
                className="w-full px-4 py-2 border rounded-lg pr-10"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-grey">
          <table className="w-full text-right">
            <thead className="bg-primary text-text-color">
              <tr>
                <th className="p-3">خریدار</th>
                <th className="p-3">شماره تماس</th>
                <th className="p-3">تاریخ</th>
                <th className="p-3">قیمت نهایی</th>
                <th className="p-3">وضعیت</th>
                <th className="p-3">عملیات</th>
              </tr>
            </thead>

            <tbody>
              {paginatedOrders.map((order) => (
                <tr
                  key={order.id}
                  className=" overflow-hidden border-b border-grey hover:bg-gray-50"
                >
                  <td className="p-3">{order.buyer}</td>
                  <td className="p-3">{order.phone}</td>
                  <td className="p-3">{order.date}</td>
                  <td className="p-3">{order.finalPrice}</td>
                  <td className="p-3 whitespace-pre-line">{order.status}</td>

                  <td className="p-3 flex gap-3 items-center">
                    <Eye
                      className="w-5 h-5 cursor-pointer text-gray-600 hover:text-primary"
                      onClick={() => handleView(order)}
                    />
                    <Pencil
                      className="w-5 h-5 cursor-pointer text-gray-600 hover:text-blue-600"
                      onClick={() => handleEdit(order)}
                    />
                    <Trash2
                      className="w-5 h-5 cursor-pointer text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(order.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </main>
    </div>
  );
}
