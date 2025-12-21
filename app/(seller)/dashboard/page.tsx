"use client";

export default function SellerDashboard() {
  const stats = [
    { label: "کل فروش", value: "۲۵،۰۰۰،۰۰۰" },
    { label: "سفارشات", value: "۱۲" },
    { label: "محصولات", value: "۴۵" },
    { label: "مشتریان", value: "۱۸۹" },
    { label: "درآمد امروز", value: "۱،۵۰۰،۰۰۰" },
    { label: "بازدیدها", value: "۳،۲۱۴" },
  ];

  const orders = [
    { id: "1234", time: "۲ ساعت پیش", amount: "۱،۲۰۰،۰۰۰", status: "تایید شده" },
    { id: "1235", time: "۳ ساعت پیش", amount: "۸۵۰،۰۰۰", status: "در انتظار" },
    { id: "1236", time: "۵ ساعت پیش", amount: "۲،۱۰۰،۰۰۰", status: "تایید شده" },
    { id: "1237", time: "۱ روز پیش", amount: "۱،۵۵۰،۰۰۰", status: "تایید شده" },
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
              {stats.map((stat, index) => (
                <div key={index} className="border border-gray-200 p-6">
                  <p className="text-xs text-gray-500 mb-2">{stat.label}</p>
                  <p className="text-xl font-light text-gray-900">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Orders */}
            <div className="border border-gray-200 p-6">
              <h2 className="text-sm font-medium text-gray-900 mb-6">سفارشات اخیر</h2>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="text-sm text-gray-900">#{order.id}</p>
                      <p className="text-xs text-gray-500 mt-1">{order.time}</p>
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-gray-900">{order.amount}</p>
                      <p className="text-xs text-gray-500 mt-1">{order.status}</p>
                    </div>
                  </div>
                ))}
              </div>
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
                <p className="text-xs text-gray-600 pb-3 border-b border-gray-100">
                  ۳ سفارش در انتظار تایید
                </p>
                <p className="text-xs text-gray-600">محصول جدید اضافه شد</p>
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
                <div className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-gray-900 rounded-full mt-1.5"></div>
                  <div>
                    <p className="text-xs text-gray-900">سفارش جدید</p>
                    <p className="text-xs text-gray-400 mt-0.5">۱۰ دقیقه پیش</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-gray-400 rounded-full mt-1.5"></div>
                  <div>
                    <p className="text-xs text-gray-900">محصول ویرایش شد</p>
                    <p className="text-xs text-gray-400 mt-0.5">۳۰ دقیقه پیش</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-gray-400 rounded-full mt-1.5"></div>
                  <div>
                    <p className="text-xs text-gray-900">بازخورد جدید</p>
                    <p className="text-xs text-gray-400 mt-0.5">۱ ساعت پیش</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
