'use client';

import { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import ProductsTable from '@/components/admin/ProductsTable';
import Pagination from '@/components/admin/Pagination';
import ProductModal from '@/components/admin/ProductModal';

type Product = {
  id?: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
};

export default function AdminProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
  const totalPages = 4;

  const handleNewProduct = () => {
    setSelectedProduct(undefined);
    setIsModalOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-100" dir="rtl">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 mr-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">محصولات شما</h1>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 bg-white rounded border hover:bg-gray-50">
              اکانون تورنو
            </button>
            <select className="px-4 py-2 bg-white rounded border">
              <option>سبد خریدان</option>
            </select>
          </div>
        </div>

        {/* Search and Actions Bar */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex items-center justify-between gap-4">
            {/* New Product Button */}
            <button
              onClick={handleNewProduct}
              className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 rounded hover:bg-gray-50"
            >
              <span className="text-xl">+</span>
              <span>محصول جدید</span>
            </button>

            {/* Search Bar */}
            <div className="flex-1 max-w-md relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جست و جو..."
                className="w-full px-4 py-2 border rounded-lg pr-10"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-600 text-white rounded-t-lg px-4 py-3 flex items-center gap-4 text-sm">
          <button className="hover:bg-gray-500 px-3 py-1 rounded">#</button>
          <button className="hover:bg-gray-500 px-3 py-1 rounded">نام محصول</button>
          <button className="hover:bg-gray-500 px-3 py-1 rounded">دسته بندی</button>
          <button className="hover:bg-gray-500 px-3 py-1 rounded">موجودی</button>
          <button className="hover:bg-gray-500 px-3 py-1 rounded">قیمت</button>
          <button className="hover:bg-gray-500 px-3 py-1 rounded">وضعیت</button>
        </div>

        {/* Products Table */}
        <ProductsTable />

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </main>

      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
      />
    </div>
  );
}

