"use client";

import { useState } from "react";
import { Product } from "@/types/api.types";

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
      draft: "bg-gray-100 text-gray-800",
      active: "bg-green-100 text-green-800",
      inactive: "bg-red-100 text-red-800",
      out_of_stock: "bg-yellow-100 text-yellow-800",
      archived: "bg-gray-100 text-gray-600",
    };
    return colorMap[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div dir="rtl" className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-light text-gray-900">محصولات</h1>
            <p className="text-sm text-gray-500 mt-1">مدیریت محصولات فروشگاه</p>
          </div>
          <button className="px-6 py-2 bg-gray-900 text-white text-sm hover:bg-gray-700 transition-colors">
            + افزودن محصول
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">کل محصولات</p>
            <p className="text-xl font-light text-gray-900">{formatNumber(products.length)}</p>
          </div>
          <div className="border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">فعال</p>
            <p className="text-xl font-light text-gray-900">
              {formatNumber(products.filter((p) => p.status === "active").length)}
            </p>
          </div>
          <div className="border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">ناموجود</p>
            <p className="text-xl font-light text-gray-900">
              {formatNumber(products.filter((p) => p.status === "out_of_stock").length)}
            </p>
          </div>
          <div className="border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">کل فروش</p>
            <p className="text-xl font-light text-gray-900">
              {formatNumber(products.reduce((sum, p) => sum + (p.soldCount || 0), 0))}
            </p>
          </div>
        </div>

        {/* Products List */}
        <div className="border border-gray-200">
          {/* Table Header */}
          <div className="hidden md:grid md:grid-cols-12 gap-4 p-4 border-b border-gray-200 bg-gray-50">
            <div className="col-span-4 text-xs font-medium text-gray-700">نام محصول</div>
            <div className="col-span-2 text-xs font-medium text-gray-700">قیمت</div>
            <div className="col-span-1 text-xs font-medium text-gray-700">موجودی</div>
            <div className="col-span-1 text-xs font-medium text-gray-700">فروش</div>
            <div className="col-span-2 text-xs font-medium text-gray-700">امتیاز</div>
            <div className="col-span-2 text-xs font-medium text-gray-700">وضعیت</div>
          </div>

          {/* Products */}
          {products.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  {/* Product Name */}
                  <div className="col-span-1 md:col-span-4">
                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">{product.description}</p>
                    {product.featured && (
                      <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5">
                        ویژه
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="col-span-1 md:col-span-2">
                    <p className="text-sm text-gray-900">{formatCurrency(product.price)}</p>
                    {product.compareAtPrice && (
                      <p className="text-xs text-gray-400 line-through mt-1">
                        {formatCurrency(product.compareAtPrice)}
                      </p>
                    )}
                  </div>

                  {/* Stock */}
                  <div className="col-span-1 md:col-span-1">
                    <p className={`text-sm ${product.stock === 0 ? "text-red-600" : "text-gray-900"}`}>
                      {formatNumber(product.stock)}
                    </p>
                  </div>

                  {/* Sold */}
                  <div className="col-span-1 md:col-span-1">
                    <p className="text-sm text-gray-900">{formatNumber(product.soldCount || 0)}</p>
                  </div>

                  {/* Rating */}
                  <div className="col-span-1 md:col-span-2">
                    {product.rating && (
                      <div>
                        <p className="text-sm text-gray-900">⭐ {product.rating.toFixed(1)}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatNumber(product.reviewCount || 0)} نظر
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Status */}
                  <div className="col-span-1 md:col-span-2">
                    <span className={`inline-block text-xs px-3 py-1 ${getStatusColor(product.status)}`}>
                      {getStatusLabel(product.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <p className="text-sm text-gray-400">هنوز محصولی ثبت نشده است</p>
              <button className="mt-4 px-6 py-2 bg-gray-900 text-white text-sm hover:bg-gray-700 transition-colors">
                افزودن اولین محصول
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
