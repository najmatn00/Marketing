'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Search, Bell } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import ProductsTable, { Product } from '@/components/admin/ProductsTable';
import Pagination from '@/components/admin/Pagination';

const initialProducts: Product[] = [
  {
    id: 1,
    name: 'لپ تاپ ایسوس',
    category: 'الکترونیک',
    price: '۲۵,۰۰۰,۰۰۰ تومان',
    stock: '۱۵ عدد',
    status: 'موجود در انبار',
    seller: { firstName: 'علی', lastName: 'احمدی' }
  },
  {
    id: 2,
    name: 'گوشی سامسونگ',
    category: 'الکترونیک',
    price: '۱۸,۰۰۰,۰۰۰ تومان',
    stock: '۲۳ عدد',
    status: 'موجود در انبار',
    seller: { firstName: 'مریم', lastName: 'رضایی' }
  },
  {
    id: 3,
    name: 'هدفون سونی',
    category: 'الکترونیک',
    price: '۳,۵۰۰,۰۰۰ تومان',
    stock: '۴۲ عدد',
    status: 'موجود در انبار',
    seller: { firstName: 'حسین', lastName: 'کریمی' }
  },
  {
    id: 4,
    name: 'کیبورد مکانیکی',
    category: 'لوازم جانبی',
    price: '۲,۸۰۰,۰۰۰ تومان',
    stock: '۳۱ عدد',
    status: 'موجود در انبار',
    seller: { firstName: 'فاطمه', lastName: 'نوری' }
  },
  {
    id: 5,
    name: 'ماوس گیمینگ',
    category: 'لوازم جانبی',
    price: '۱,۹۰۰,۰۰۰ تومان',
    stock: '۵۶ عدد',
    status: 'موجود در انبار',
    seller: { firstName: 'رضا', lastName: 'محمدی' }
  },
  {
    id: 6,
    name: 'مانیتور ال جی',
    category: 'الکترونیک',
    price: '۱۲,۵۰۰,۰۰۰ تومان',
    stock: '۸ عدد',
    status: 'موجود در انبار',
    seller: { firstName: 'زهرا', lastName: 'حسینی' }
  },
  {
    id: 7,
    name: 'تبلت اپل',
    category: 'الکترونیک',
    price: '۳۵,۰۰۰,۰۰۰ تومان',
    stock: '۱۲ عدد',
    status: 'موجود در انبار',
    seller: { firstName: 'امیر', lastName: 'صادقی' }
  },
  {
    id: 8,
    name: 'دوربین کانن',
    category: 'عکاسی',
    price: '۲۸,۰۰۰,۰۰۰ تومان',
    stock: '۶ عدد',
    status: 'موجود در انبار',
    seller: { firstName: 'سارا', lastName: 'موسوی' }
  },
  {
    id: 9,
    name: 'پاوربانک شیائومی',
    category: 'لوازم جانبی',
    price: '۸۵۰,۰۰۰ تومان',
    stock: '۱۲۰ عدد',
    status: 'موجود در انبار',
    seller: { firstName: 'محمد', lastName: 'کاظمی' }
  },
  {
    id: 10,
    name: 'ساعت هوشمند',
    category: 'الکترونیک',
    price: '۶,۵۰۰,۰۰۰ تومان',
    stock: '۲۸ عدد',
    status: 'موجود در انبار',
    seller: { firstName: 'نیلوفر', lastName: 'جعفری' }
  },
  {
    id: 11,
    name: 'اسپیکر بلوتوثی',
    category: 'صوتی',
    price: '۲,۲۰۰,۰۰۰ تومان',
    stock: '۴۵ عدد',
    status: 'موجود در انبار',
    seller: { firstName: 'پوریا', lastName: 'رحیمی' }
  },
  {
    id: 12,
    name: 'هارد اکسترنال',
    category: 'ذخیره سازی',
    price: '۴,۵۰۰,۰۰۰ تومان',
    stock: '۳۳ عدد',
    status: 'موجود در انبار',
    seller: { firstName: 'الهام', lastName: 'فرهادی' }
  }
];

const ITEMS_PER_PAGE = 6;

export default function AdminProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;

    const query = searchQuery.toLowerCase();
    return products.filter((product) =>
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.status.toLowerCase().includes(query) ||
      `${product.seller.firstName} ${product.seller.lastName}`.toLowerCase().includes(query)
    );
  }, [products, searchQuery]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // Reset to page 1 when search query changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleNewProduct = () => {
    router.push('/admin/products/new');
  };

  const handleEdit = (product: Product) => {
    // TODO: Navigate to edit page
    alert(`تکمیل صفحه ویرایش: ${product.name}`);
  };

  const handleDelete = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleView = (product: Product) => {
    alert(`مشاهده محصول: ${product.name}\nفروشنده: ${product.seller.firstName} ${product.seller.lastName}\nقیمت: ${product.price}`);
  };

  return (
    <div className="flex min-h-screen bg-background" dir="rtl">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 mr-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-dark-blue">محصولات شما</h1>
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

        {/* Search and Actions Bar */}
        <div className="rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between gap-4">
            {/* Search Bar */}
            <div className="flex-1 max-w-md relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="جست و جو..."
                className="w-full px-4 py-2 border rounded-lg pr-10"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                <Search className="w-5 h-5" />
              </button>
            </div>
            {/* New Product Button */}
            <button
              onClick={handleNewProduct}
              className="flex items-center gap-2 px-4 py-2 border-2 border-primary rounded"
            >
              <Plus className="w-5 h-5 text-primary" />
              <span className="text-dark-blue text-[18px] font-semibold">محصول جدید</span>
              
            </button>
          </div>
        </div>

        {/* Products Table */}
        <ProductsTable
          products={paginatedProducts}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
        />

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

