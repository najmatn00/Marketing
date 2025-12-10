'use client';

import { Eye, Pencil, Trash2, ImageIcon } from 'lucide-react';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  stock: string;
  status: string;
  seller: {
    firstName: string;
    lastName: string;
  };
}

interface ProductsTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  onView: (product: Product) => void;
}

export default function ProductsTable({ products, onEdit, onDelete, onView }: ProductsTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-grey">
      <table className="w-full" dir="rtl">
        <thead>
          <tr className="bg-primary border-b border-grey">
            <th className="p-4 text-right text-white font-semibold text-sm">#</th>
            <th className="p-4 text-right text-white font-semibold text-sm">نام محصول</th>
            <th className="p-4 text-right text-white font-semibold text-sm">دسته بندی</th>
            <th className="p-4 text-right text-white font-semibold text-sm">موجودی</th>
            <th className="p-4 text-right text-white font-semibold text-sm">قیمت</th>
            <th className="p-4 text-right text-white font-semibold text-sm">فروشنده</th>
            <th className="p-4 text-right text-white font-semibold text-sm">وضعیت</th>
            <th className="p-4 text-center text-white font-semibold text-sm"></th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={8} className="p-8 text-center text-grey">
                محصولی یافت نشد
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.id} className="border-b border-light-grey hover:bg-light-mint transition-colors">
                <td className="p-4">
                  <div className="w-12 h-12 bg-light-grey rounded flex items-center justify-center">
                    <ImageIcon className="w-6 h-6 text-grey" />
                  </div>
                </td>
                <td className="p-4 text-right text-dark-blue text-sm">{product.name}</td>
                <td className="p-4 text-right text-dark-blue text-sm">{product.category}</td>
                <td className="p-4 text-right text-dark-blue text-sm">{product.stock}</td>
                <td className="p-4 text-right text-dark-blue text-sm">{product.price}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-semibold">
                      {product.seller.firstName.charAt(0)}{product.seller.lastName.charAt(0)}
                    </div>
                    <span className="text-dark-blue text-sm">
                      {product.seller.firstName} {product.seller.lastName}
                    </span>
                  </div>
                </td>
                <td className="p-4 text-right text-dark-blue text-sm">{product.status}</td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => onView(product)}
                      className="text-grey hover:text-primary transition-colors"
                      title="مشاهده"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEdit(product)}
                      className="text-grey hover:text-primary transition-colors"
                      title="ویرایش"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`آیا از حذف "${product.name}" اطمینان دارید؟`)) {
                          onDelete(product.id);
                        }
                      }}
                      className="text-grey hover:text-red-500 transition-colors"
                      title="حذف"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
