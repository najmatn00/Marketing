"use client";

import { useState, useMemo } from "react";
import { Eye, ArrowUpDown, Plus } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";

type Ticket = {
  id: number;
  buyer: string;
  subject: string;
  date: string;
  status: string;
};

export default function TicketListPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [page, setPage] = useState(1);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const tickets: Ticket[] = [
    {
      id: 1,
      buyer: "14",
      subject: "مشکل فنی",
      date: "1402/10/01",
      status: "پاسخ داده شده",
    },
    {
      id: 2,
      buyer: "22",
      subject: "تاخیر سفارش",
      date: "1402/10/02",
      status: "درحال پیگیری",
    },
    {
      id: 3,
      buyer: "78",
      subject: "بازگشت وجه",
      date: "1402/10/03",
      status: "حل شده",
    },
    {
      id: 4,
      buyer: "56",
      subject: "لغو سفارش",
      date: "1402/10/04",
      status: "پاسخ داده شده",
    },
    {
      id: 5,
      buyer: "87",
      subject: "ثبت اشتباه",
      date: "1402/10/05",
      status: "درحال پیگیری",
    },
  ];

  // فیلتر بر اساس تب‌ها
  const filtered = useMemo(() => {
    if (activeTab === "all") return tickets;
    if (activeTab === "answered")
      return tickets.filter((t) => t.status === "پاسخ داده شده");
    if (activeTab === "processing")
      return tickets.filter((t) => t.status === "درحال پیگیری");
    if (activeTab === "solved")
      return tickets.filter((t) => t.status === "حل شده");
    return tickets;
  }, [activeTab]);

  // سورت
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      return sortDir === "asc" ? +a.buyer - +b.buyer : +b.buyer - +a.buyer;
    });
  }, [filtered, sortDir]);

  // صفحه‌بندی
  const perPage = 7;
  const totalPages = Math.ceil(sorted.length / perPage);
  const paginated = sorted.slice((page - 1) * perPage, page * perPage);

  const handleSort = () => {
    setSortDir(sortDir === "asc" ? "desc" : "asc");
  };

  const handleOpenTicket = (id: number) => {
    alert(`✔ تیکت شماره ${id} باز شد`);
  };

  return (
    <div className="flex min-h-screen bg-white" dir="rtl">
      <AdminSidebar />

      <main className="flex-1 mr-64 p-8">
        <h1 className="text-3xl font-bold text-dark-blue mb-6">
          تیکت‌های ثبت شده شما
        </h1>

        {/* Tabs */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex">
            {[
              { id: "all", label: "فیلتر براساس" },
              { id: "answered", label: "پاسخ داده شده" },
              { id: "processing", label: "درحال پیگیری" },
              { id: "solved", label: "حل شده" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setActiveTab(t.id);
                  setPage(1);
                }}
                className={`px-6 py-2 border border-grey
                ${activeTab === t.id ? "bg-teal-600 text-text-color" : "bg-white"}`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Create Ticket */}
          <button
            onClick={() => alert("✔ تیکت جدید ایجاد شد")}
            className="flex items-center gap-2 px-5 py-2 bg-teal-600 text-text-color rounded-lg"
          >
            تیکت جدید <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Table */}
        <div className="border border-grey rounded-lg bg-white overflow-hidden">
          <table className="w-full text-right">
            <thead className="bg-teal-600 text-text-color">
              <tr>
                <th className="px-4 py-2 w-10"></th>
                <th className="px-4 py-2 cursor-pointer" onClick={handleSort}>
                  خریدار <ArrowUpDown className="inline-block w-4 h-4 mr-1" />
                </th>
                <th className="px-4 py-2">موضوع</th>
                <th className="px-4 py-2">تاریخ</th>
                <th className="px-4 py-2">وضعیت</th>
              </tr>
            </thead>

            <tbody>
              {paginated.map((t) => (
                <tr
                  key={t.id}
                  className="border-b border-grey hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-2 text-center">
                    <button onClick={() => handleOpenTicket(t.id)}>
                      <Eye className="w-5 h-5 text-dark-blue hover:text-teal-600" />
                    </button>
                  </td>

                  <td className="px-4 py-3">{t.buyer}</td>
                  <td className="px-4 py-3">{t.subject}</td>
                  <td className="px-4 py-3">{t.date}</td>
                  <td className="px-4 py-3 text-gray-700">{t.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-6">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-4 py-1 border border-grey rounded-lg ${
                  i + 1 === page ? "bg-teal-600 text-text-color" : "bg-white"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
