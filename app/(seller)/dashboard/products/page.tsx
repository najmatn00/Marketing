"use client";

import { useState } from "react";
import { Product } from "@/types/api.types";
import { Package, Plus } from "lucide-react";

export default function ProductsPage() {
  // Mock data - will be replaced with API call
  const [products] = useState<Product[]>([
    {
      id: "1",
      name: "لپ تاپ ایسوس مدل VivoBook",
      slug: "asus-vivobook",
      description: "لپ تاپ 15.6 اینچی با پردازنده Core i5",
      price: 25000000,
      compareAtPrice: 28000000,
      stock: 15,
      categoryId: "1",
      sellerId: "seller1",
      images: [],
      status: "active",
      featured: true,
      tags: ["لپ تاپ", "ایسوس"],
      soldCount: 23,
      rating: 4.5,
      reviewCount: 12,
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-15T10:00:00Z",
    },
    {
      id: "2",
      name: "موس بی‌سیم لاجیتک MX Master",
      slug: "logitech-mx-master",
      description: "موس بی‌سیم با قابلیت اتصال چند دستگاه",
      price: 3500000,
      stock: 42,
      categoryId: "2",
      sellerId: "seller1",
      images: [],
      status: "active",
      featured: false,
      tags: ["موس", "لاجیتک"],
      soldCount: 67,
      rating: 4.8,
      reviewCount: 34,
      createdAt: "2024-01-10T10:00:00Z",
      updatedAt: "2024-01-10T10:00:00Z",
    },
    {
      id: "3",
      name: "کیبورد مکانیکی کی‌برون K2",
      slug: "keychron-k2",
      description: "کیبورد مکانیکی بی‌سیم با سوییچ‌های قابل تعویض",
      price: 4200000,
      compareAtPrice: 4800000,
      stock: 0,
      categoryId: "2",
      sellerId: "seller1",
      images: [],
      status: "out_of_stock",
      featured: false,
      tags: ["کیبورد", "مکانیکی"],
      soldCount: 89,
      rating: 4.7,
      reviewCount: 45,
      createdAt: "2024-01-05T10:00:00Z",
      updatedAt: "2024-01-20T10:00:00Z",
    },
    {
      id: "4",
      name: "هدفون سونی WH-1000XM5",
      slug: "sony-wh-1000xm5",
      description: "هدفون بلوتوث با نویز کنسلینگ فعال",
      price: 15000000,
      stock: 8,
      categoryId: "3",
      sellerId: "seller1",
      images: [],
      status: "active",
      featured: true,
      tags: ["هدفون", "سونی", "بلوتوث"],
      soldCount: 34,
      rating: 4.9,
      reviewCount: 28,
      createdAt: "2024-01-12T10:00:00Z",
      updatedAt: "2024-01-12T10:00:00Z",
    },
    {
      id: "5",
      name: "پاوربانک شیائومی 20000mAh",
      slug: "xiaomi-powerbank-20000",
      description: "پاوربانک با ظرفیت بالا و شارژ سریع",
      price: 1800000,
      stock: 125,
      categoryId: "4",
      sellerId: "seller1",
      images: [],
      status: "active",
      featured: false,
      tags: ["پاوربانک", "شیائومی"],
      soldCount: 156,
      rating: 4.6,
      reviewCount: 78,
      createdAt: "2024-01-08T10:00:00Z",
      updatedAt: "2024-01-08T10:00:00Z",
    },
  ]);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("fa-IR").format(num);
  };

  const formatCurrency = (amount: number) => {
    return `${formatNumber(amount)} تومان`;
  };

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      draft: "پیش‌نویس",
      active: "فعال",
      inactive: "غیرفعال",
      out_of_stock: "ناموجود",
      archived: "بایگانی شده",
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      draft: "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200",
      active:
        "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400",
      inactive: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400",
      out_of_stock:
        "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400",
      archived: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400",
    };
    return (
      colorMap[status] ||
      "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
    );
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Package className="w-6 h-6 text-primary" />
            محصولات
          </h2>
          <p className="text-sm text-grey mt-1">مدیریت محصولات فروشگاه</p>
        </div>
        <button className="px-6 py-3 bg-primary hover:bg-primary/90 text-text-color text-sm font-medium rounded-xl transition-all shadow-lg flex items-center gap-2">
          <Plus className="w-4 h-4" />
          افزودن محصول
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-light-grey dark:border-gray-700 rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow">
          <p className="text-xs text-grey mb-2">کل محصولات</p>
          <p className="text-2xl font-bold text-foreground">
            {formatNumber(products.length)}
          </p>
        </div>
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-light-grey dark:border-gray-700 rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow">
          <p className="text-xs text-grey mb-2">فعال</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {formatNumber(products.filter((p) => p.status === "active").length)}
          </p>
        </div>
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-light-grey dark:border-gray-700 rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow">
          <p className="text-xs text-grey mb-2">ناموجود</p>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {formatNumber(
              products.filter((p) => p.status === "out_of_stock").length
            )}
          </p>
        </div>
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-light-grey dark:border-gray-700 rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow">
          <p className="text-xs text-grey mb-2">کل فروش</p>
          <p className="text-2xl font-bold text-primary">
            {formatNumber(
              products.reduce((sum, p) => sum + (p.soldCount || 0), 0)
            )}
          </p>
        </div>
      </div>

      {/* Products List */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-light-grey dark:border-gray-700 rounded-xl overflow-hidden shadow-lg">
        {/* Table Header */}
        <div className="hidden md:grid md:grid-cols-12 gap-4 p-4 border-b border-light-grey dark:border-gray-700 bg-light-mint/50 dark:bg-gray-700/50">
          <div className="col-span-4 text-xs font-bold text-foreground">
            نام محصول
          </div>
          <div className="col-span-2 text-xs font-bold text-foreground">
            قیمت
          </div>
          <div className="col-span-1 text-xs font-bold text-foreground">
            موجودی
          </div>
          <div className="col-span-1 text-xs font-bold text-foreground">
            فروش
          </div>
          <div className="col-span-2 text-xs font-bold text-foreground">
            امتیاز
          </div>
          <div className="col-span-2 text-xs font-bold text-foreground">
            وضعیت
          </div>
        </div>

        {/* Products */}
        {products.length > 0 ? (
          <div className="divide-y divide-light-grey dark:divide-gray-700">
            {products.map((product) => (
              <div
                key={product.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 hover:bg-light-mint/50 dark:hover:bg-gray-700/50 transition-all cursor-pointer group"
              >
                {/* Product Name */}
                <div className="col-span-1 md:col-span-4">
                  <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                    {product.name}
                  </p>
                  <p className="text-xs text-grey mt-1 line-clamp-1">
                    {product.description}
                  </p>
                  {product.featured && (
                    <span className="inline-block mt-2 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 px-2 py-1 rounded-md font-medium">
                      ویژه
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="col-span-1 md:col-span-2">
                  <p className="text-sm font-bold text-foreground">
                    {formatCurrency(product.price)}
                  </p>
                  {product.compareAtPrice && (
                    <p className="text-xs text-grey line-through mt-1">
                      {formatCurrency(product.compareAtPrice)}
                    </p>
                  )}
                </div>

                {/* Stock */}
                <div className="col-span-1 md:col-span-1">
                  <p
                    className={`text-sm font-bold ${product.stock === 0 ? "text-red-600 dark:text-red-400" : "text-foreground"}`}
                  >
                    {formatNumber(product.stock)}
                  </p>
                </div>

                {/* Sold */}
                <div className="col-span-1 md:col-span-1">
                  <p className="text-sm font-bold text-foreground">
                    {formatNumber(product.soldCount || 0)}
                  </p>
                </div>

                {/* Rating */}
                <div className="col-span-1 md:col-span-2">
                  {product.rating && (
                    <div>
                      <p className="text-sm font-bold text-foreground">
                        ⭐ {product.rating.toFixed(1)}
                      </p>
                      <p className="text-xs text-grey mt-1">
                        {formatNumber(product.reviewCount || 0)} نظر
                      </p>
                    </div>
                  )}
                </div>

                {/* Status */}
                <div className="col-span-1 md:col-span-2">
                  <span
                    className={`inline-block text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(product.status)}`}
                  >
                    {getStatusLabel(product.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <Package className="w-16 h-16 text-grey mx-auto mb-4" />
            <p className="text-sm text-grey font-medium">
              هنوز محصولی ثبت نشده است
            </p>
            <button className="mt-6 px-6 py-3 bg-primary hover:bg-primary/90 text-text-color text-sm font-medium rounded-xl transition-all shadow-lg flex items-center gap-2 mx-auto">
              <Plus className="w-4 h-4" />
              افزودن اولین محصول
            </button>
          </div>
        )}
      </div>
    </>
  );
}
