'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Upload } from 'lucide-react';

// Zod validation schema
const productSchema = z.object({
  name: z.string().min(1, 'نام محصول الزامی است'),
  category: z.string().min(1, 'دسته‌بندی الزامی است'),
  price: z.string().min(1, 'قیمت الزامی است'),
  marketingLevel1: z.string().min(1, 'درصد بازاریابی سطح یک الزامی است'),
  marketingLevel2: z.string().min(1, 'درصد بازاریابی سطح دو الزامی است'),
  marketingLevel3: z.string().min(1, 'درصد بازاریابی سطح سه الزامی است'),
  stock: z.string().min(1, 'موجودی الزامی است'),
  addToCatalog: z.boolean().optional(),
  description: z.string().optional(),
  hasDiscount: z.string().optional(),
  discountType: z.string().optional(),
  discountAmount: z.string().optional(),
  discountUntil: z.string().optional(),
  image: z.any().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: any;
}

export default function ProductModal({ isOpen, onClose, product }: ProductModalProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'image'>('info');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || '',
      category: product?.category || '',
      price: product?.price?.toString() || '',
      marketingLevel1: '',
      marketingLevel2: '',
      marketingLevel3: '',
      stock: product?.stock?.toString() || '',
      addToCatalog: false,
      description: '',
      hasDiscount: '',
      discountType: '',
      discountAmount: '',
      discountUntil: '',
    },
  });

  const onSubmit = (data: ProductFormData) => {
    console.log('Form submitted:', data);
    console.log('Uploaded image:', uploadedImage);
    // Handle form submission here
    reset();
    onClose();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedImage(e.target.files[0]);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-primary">
          <h2 className="text-xl font-bold text-white">
            اضافه کردن محصول جدید
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('info')}
            className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === 'info'
                ? 'border-b-2 border-primary text-primary bg-gray-50'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            سیا رساناتمان
          </button>
          <button
            onClick={() => setActiveTab('image')}
            className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === 'image'
                ? 'border-b-2 border-primary text-primary bg-gray-50'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            آیکون دونیا
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Tab Content */}
          {activeTab === 'info' && (
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-6">
                اضافه کردن محصول
              </p>
              <p className="text-xs text-gray-500 mb-6">
                در این بخش میتوانید محصول جدید رو اضافه کنید و اون رو آماده ی فروش نمایید
              </p>

              <div className="grid grid-cols-2 gap-4">
                {/* Product Name */}
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    نام محصول <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('name')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Category */}
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    دسته بندی <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register('category')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">انتخاب کنید</option>
                    <option value="electronics">الکترونیک</option>
                    <option value="clothing">پوشاک</option>
                    <option value="food">مواد غذایی</option>
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>
                  )}
                </div>

                {/* Price */}
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    قیمت <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('price')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  {errors.price && (
                    <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
                  )}
                </div>

                {/* Marketing Level 1 */}
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    درصد بازاریابی سطح یک <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('marketingLevel1')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  {errors.marketingLevel1 && (
                    <p className="text-red-500 text-xs mt-1">{errors.marketingLevel1.message}</p>
                  )}
                </div>

                {/* Marketing Level 2 */}
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    درصد بازاریابی سطح دو <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('marketingLevel2')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  {errors.marketingLevel2 && (
                    <p className="text-red-500 text-xs mt-1">{errors.marketingLevel2.message}</p>
                  )}
                </div>

                {/* Marketing Level 3 */}
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    درصد بازاریابی سطح سه <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('marketingLevel3')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  {errors.marketingLevel3 && (
                    <p className="text-red-500 text-xs mt-1">{errors.marketingLevel3.message}</p>
                  )}
                </div>

                {/* Stock */}
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    موجودی <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('stock')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  {errors.stock && (
                    <p className="text-red-500 text-xs mt-1">{errors.stock.message}</p>
                  )}
                </div>

                {/* Add to Catalog Checkbox */}
                <div className="col-span-1 flex items-center">
                  <input
                    type="checkbox"
                    id="addToCatalog"
                    {...register('addToCatalog')}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label htmlFor="addToCatalog" className="mr-2 text-sm text-gray-700">
                    چگالش اضافه کردن به کاتالوگ
                  </label>
                </div>

                {/* Description */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    توضیحات
                  </label>
                  <textarea
                    {...register('description')}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  />
                </div>

                {/* Has Discount */}
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    تخفیف داریا <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register('hasDiscount')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">انتخاب کنید</option>
                    <option value="yes">بله</option>
                    <option value="no">خیر</option>
                  </select>
                </div>

                {/* Discount Type */}
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    نوع تخفیف <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register('discountType')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">انتخاب کنید</option>
                    <option value="percentage">درصدی</option>
                    <option value="fixed">مبلغ ثابت</option>
                  </select>
                </div>

                {/* Discount Amount */}
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    مقدار تخفیف <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('discountAmount')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                {/* Discount Until */}
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    تخفیف تا <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    {...register('discountUntil')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              {/* Upload Section */}
              <div className="mt-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <Upload className="w-12 h-12 text-gray-400 mb-4" />
                    <p className="text-sm text-gray-600 mb-2">
                      عکس، اتاحیتای خود رو اینجا بیوندازید و یا کلیک رو بارگذاری کنید
                    </p>
                    <p className="text-xs text-gray-400 mb-4">
                      سایز تصاویر باید شامل بگنجید
                    </p>
                    <input
                      type="file"
                      id="imageUpload"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    {uploadedImage && (
                      <p className="text-sm text-green-600 mb-2">
                        فایل انتخاب شده: {uploadedImage.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'image' && (
            <div className="p-6">
              <div className="flex flex-col items-center justify-center py-12">
                <Upload className="w-16 h-16 text-gray-400 mb-4" />
                <p className="text-lg text-gray-600 mb-4">
                  آپلود تصویر محصول
                </p>
                <label
                  htmlFor="imageUploadTab"
                  className="px-6 py-2 bg-primary text-white rounded-lg cursor-pointer hover:bg-opacity-90 transition-colors"
                >
                  انتخاب فایل
                </label>
                <input
                  type="file"
                  id="imageUploadTab"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                {uploadedImage && (
                  <div className="mt-4">
                    <p className="text-sm text-green-600">
                      فایل انتخاب شده: {uploadedImage.name}
                    </p>
                    <img
                      src={URL.createObjectURL(uploadedImage)}
                      alt="Preview"
                      className="mt-4 max-w-md rounded-lg shadow-md"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Footer Buttons */}
          <div className="flex items-center justify-between gap-3 p-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              لغو
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium"
            >
              ثبت
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
