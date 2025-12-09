'use client';

import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
}

const mockProducts: Product[] = [
  { id: 1, name: 'نام محصول', category: 'دسته‌بندی', price: 50000, stock: 10, status: 'واحدب کارید انبری' },
  { id: 2, name: 'نام محصول', category: 'دسته‌بندی', price: 50000, stock: 10, status: 'واحدب کارید انبری' },
  { id: 3, name: 'نام محصول', category: 'دسته‌بندی', price: 50000, stock: 10, status: 'واحدب کارید انبری' },
  { id: 4, name: 'نام محصول', category: 'دسته‌بندی', price: 50000, stock: 10, status: 'واحدب کارید انبری' },
  { id: 5, name: 'نام محصول', category: 'دسته‌بندی', price: 50000, stock: 10, status: 'واحدب کارید انبری' },
  { id: 6, name: 'نام محصول', category: 'دسته‌بندی', price: 50000, stock: 10, status: 'واحدب کارید انبری' },
];

export default function ProductsTable() {
  const [products] = useState<Product[]>(mockProducts);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  const toggleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map(p => p.id));
    }
  };

  const toggleSelectProduct = (id: number) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter(pid => pid !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full" dir="rtl">
        <thead className="bg-gray-600 text-white">
          <tr>
            <th className="p-4 text-center">
              <input
                type="checkbox"
                checked={selectedProducts.length === products.length}
                onChange={toggleSelectAll}
                className="w-4 h-4"
              />
            </th>
            <th className="p-4 text-right">#</th>
            <th className="p-4 text-right">نام محصول</th>
            <th className="p-4 text-right">دسته بندی</th>
            <th className="p-4 text-right">تعداد</th>
            <th className="p-4 text-right">مبلغ</th>
            <th className="p-4 text-right">قیمت</th>
            <th className="p-4 text-center">وضعیت</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id} className="border-b hover:bg-gray-50">
              <td className="p-4 text-center">
                <input
                  type="checkbox"
                  checked={selectedProducts.includes(product.id)}
                  onChange={() => toggleSelectProduct(product.id)}
                  className="w-4 h-4"
                />
              </td>
              <td className="p-4">
                <div className="w-12 h-12 bg-gray-300 rounded flex items-center justify-center">
                  📷
                </div>
              </td>
              <td className="p-4 text-right">{product.name}</td>
              <td className="p-4 text-right">{product.category}</td>
              <td className="p-4 text-right">{product.stock}</td>
              <td className="p-4 text-right">مبلغ</td>
              <td className="p-4 text-right">{product.price.toLocaleString('fa-IR')}</td>
              <td className="p-4 text-center">
                <div className="flex items-center justify-center gap-3">
                  <span className="text-sm text-gray-600">{product.status}</span>
                  <button className="text-blue-500 hover:text-blue-700" title="مشاهده">
                    👁️
                  </button>
                  <button className="text-green-500 hover:text-green-700" title="ویرایش">
                    ✏️
                  </button>
                  <button className="text-red-500 hover:text-red-700" title="حذف">
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
