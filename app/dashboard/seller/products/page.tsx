"use client";

import { useState, useEffect } from "react";
import { Product } from "@/types/api.types";
import { Package, Plus, Loader2, RefreshCw } from "lucide-react";
import { CreateProductModal } from "@/components/seller/CreateProductModal";
import { productsService } from "@/services/products.service";
import {
  formatNumber,
  formatCurrency,
  getProductStatusLabel,
  getProductStatusColor,
} from "@/utils/formatters";

export default function ProductsPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // Fetch products from API
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productsService.getProducts({
        page,
        limit: 10,
        sortBy: "createdAt",
        sortOrder: "desc",
      });

      setProducts(response.data);
      setTotal(response.total);
      setTotalPages(response.totalPages);
    } catch (err: any) {
      setError(err?.response?.data?.message || "خطا در دریافت محصولات");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
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
        <div className="flex items-center gap-3">
          <button
            onClick={fetchProducts}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-light-grey dark:border-gray-700 text-foreground rounded-lg hover:bg-light-mint dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            <span className="text-sm font-medium">بروزرسانی</span>
          </button>
          <button
            onClick={() => setCreateOpen(true)}
            className="px-6 py-3 bg-primary hover:bg-primary/90 text-text-color text-sm font-medium rounded-xl transition-all shadow-lg flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            افزودن محصول
          </button>
        </div>
      </div>

      <CreateProductModal
        open={createOpen}
        onOpenChange={setCreateOpen}
        onCreated={(p) => setProducts((prev) => [p, ...prev])}
      />

      {/* Loading State */}
      {loading && (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-light-grey dark:border-gray-700 rounded-xl overflow-hidden shadow-lg p-12 mb-8">
          <div className="flex flex-col items-center justify-center">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="text-sm text-grey font-medium">در حال دریافت محصولات...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 mb-8">
          <p className="text-red-800 dark:text-red-400 font-medium mb-3">
            خطا در دریافت محصولات
          </p>
          <p className="text-sm text-red-600 dark:text-red-300 mb-4">{error}</p>
          <button
            onClick={fetchProducts}
            className="px-4 py-2 bg-primary hover:bg-primary/90 text-text-color text-sm font-medium rounded-lg transition-all"
          >
            تلاش مجدد
          </button>
        </div>
      )}

      {/* Stats */}
      {!loading && !error && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-light-grey dark:border-gray-700 rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow">
            <p className="text-xs text-grey mb-2">کل محصولات</p>
            <p className="text-2xl font-bold text-foreground">
              {formatNumber(total)}
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
      )}

      {/* Products List */}
      {!loading && !error && (
        <>
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
                    className={`inline-block text-xs px-3 py-1 rounded-full font-medium ${getProductStatusColor(product.status)}`}
                  >
                    {getProductStatusLabel(product.status)}
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
            <button
              onClick={() => setCreateOpen(true)}
              className="mt-6 px-6 py-3 bg-primary hover:bg-primary/90 text-text-color text-sm font-medium rounded-xl transition-all shadow-lg flex items-center gap-2 mx-auto"
            >
              <Plus className="w-4 h-4" />
              افزودن اولین محصول
            </button>
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
                onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
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
