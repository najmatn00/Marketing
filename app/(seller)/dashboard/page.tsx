"use client";

import { useState } from "react";

export default function SellerDashboard() {
  // Sample data for dashboard items
  const dashboardItems = [
    { id: 1, title: "کل فروش", value: "۲۵،۰۰۰،۰۰۰ تومان", icon: "💰" },
    { id: 2, title: "سفارشات جدید", value: "۱۲", icon: "📦" },
    { id: 3, title: "محصولات", value: "۴۵", icon: "🛍️" },
    { id: 4, title: "مشتریان", value: "۱۸۹", icon: "👥" },
    { id: 5, title: "درآمد امروز", value: "۱،۵۰۰،۰۰۰ تومان", icon: "📊" },
    { id: 6, title: "بازدیدها", value: "۳،۲۱۴", icon: "👁️" },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">داشبورد فروشنده</h1>
          <p className="text-gray-600 mt-2">مدیریت فروشگاه و محصولات</p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* First Part: Dashboard Items (Hidden on mobile) */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                منوی سریع
              </h2>
              <nav className="space-y-2">
                <button className="w-full text-right px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors text-gray-700 font-medium">
                  📊 آمار کلی
                </button>
                <button className="w-full text-right px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors text-gray-700 font-medium">
                  📦 سفارشات
                </button>
                <button className="w-full text-right px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors text-gray-700 font-medium">
                  🛍️ محصولات
                </button>
                <button className="w-full text-right px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors text-gray-700 font-medium">
                  👥 مشتریان
                </button>
                <button className="w-full text-right px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors text-gray-700 font-medium">
                  💰 مالی
                </button>
                <button className="w-full text-right px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors text-gray-700 font-medium">
                  ⚙️ تنظیمات
                </button>
              </nav>
            </div>
          </div>

          {/* Second Part: Main Content (Always visible) */}
          <div className="col-span-1 lg:col-span-6">
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {dashboardItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-3xl">{item.icon}</span>
                    </div>
                    <h3 className="text-gray-600 text-sm mb-1">{item.title}</h3>
                    <p className="text-xl font-bold text-gray-900">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  سفارشات اخیر
                </h2>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((order) => (
                    <div
                      key={order}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div>
                        <p className="font-semibold text-gray-900">
                          سفارش #{order}234
                        </p>
                        <p className="text-sm text-gray-600">۲ ساعت پیش</p>
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-900">
                          ۱،۲۰۰،۰۰۰ تومان
                        </p>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          تایید شده
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sales Chart Placeholder */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  نمودار فروش
                </h2>
                <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">نمودار فروش هفتگی</p>
                </div>
              </div>
            </div>
          </div>

          {/* Third Part: 3 Empty Boxes (Hidden on mobile) */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="space-y-6">
              {/* Box 1: Notifications */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  اعلانات
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <p className="text-sm text-gray-700">
                      ۳ سفارش در انتظار تایید
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-gray-700">
                      محصول جدید اضافه شد
                    </p>
                  </div>
                </div>
              </div>

              {/* Box 2: Quick Actions */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  اقدامات سریع
                </h3>
                <div className="space-y-2">
                  <button className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium">
                    + افزودن محصول
                  </button>
                  <button className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium">
                    مشاهده سفارشات
                  </button>
                  <button className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium">
                    گزارش فروش
                  </button>
                </div>
              </div>

              {/* Box 3: Activity */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  فعالیت اخیر
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm text-gray-700">سفارش جدید</p>
                      <p className="text-xs text-gray-500">۱۰ دقیقه پیش</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm text-gray-700">محصول ویرایش شد</p>
                      <p className="text-xs text-gray-500">۳۰ دقیقه پیش</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm text-gray-700">بازخورد جدید</p>
                      <p className="text-xs text-gray-500">۱ ساعت پیش</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
