'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Upload, Bell } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';

// Zod validation schema
const productSchema = z.object({
  name: z.string().min(1, 'نام محصول الزامی است'),
  category: z.string().min(1, 'دسته‌بندی الزامی است'),
  price: z.string().min(1, 'قیمت الزامی است'),
  marketingLevel1: z.string().min(1, 'درصد بازاریابی سطح یک الزامی است'),
  marketingLevel2: z.string().min(1, 'درصد بازاریابی سطح دو الزامی است'),
  marketingLevel3: z.string().min(1, 'درصد بازاریابی سطح سه الزامی است'),
  stock: z.string().min(1, 'موجودی الزامی است'),
  factor: z.string().min(1, 'حداکثر اضافه کردن به فاکتور الزامی است'),
  addToCatalog: z.boolean().optional(),
  description: z.string().optional(),
  hasDiscount: z.string().optional(),
  discountType: z.string().optional(),
  discountAmount: z.string().optional(),
  discountUntil: z.string().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function NewProductPage() {
  const router = useRouter();
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      category: '',
      price: '',
      marketingLevel1: '',
      marketingLevel2: '',
      marketingLevel3: '',
      stock: '',
      factor: '',
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
    // Then navigate back to products page
    router.push('/admin/products');
  };

  const handleCancel = () => {
    router.push('/admin/products');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedImage(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex min-h-screen bg-background" dir="rtl">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 mr-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-dark-blue">اضافه کردن محصول جدید</h1>
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

        

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">اضافه کردن محصول</h2>
          <p className="text-sm text-gray-500 mb-6">
            در این بخش میتوانید محصول جدید رو اضافه کنید و اون رو آماده ی فروش نمایید
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Product Name */}
              <div>
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
              <div>
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
              <div>
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
              <div>
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
              <div>
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
              <div>
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
              <div>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  حداکثر اضافه کردن به فاکتور <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('factor')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                {errors.factor && (
                  <p className="text-red-500 text-xs mt-1">{errors.factor.message}</p>
                )}
              </div>

             

              {/* Description - Full Width */}
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
              <div>
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
              <div>
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
              <div>
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
              <div>
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
            <div className="mb-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                {!imagePreview ? (
                  <div className="flex flex-col items-center justify-center">
                    <Upload className="w-12 h-12 text-gray-400 mb-3" />
                    <p className="text-sm text-gray-600 mb-1">
                    عکس انتخابی خود را اینجا بکشید و رها کنید یا آپلود کنید.
                    </p>
                    <p className="text-xs text-gray-400 mb-4">
سایز عکس انتخابی باید x در x باشد                    </p>
                    <label
                      htmlFor="imageUpload"
                      className="px-6 py-2 bg-white border-2 border-primary text-primary rounded cursor-pointer hover:bg-gray-50 transition-colors text-sm"
                    >
                      بارگذاری
                    </label>
                    <input
                      type="file"
                      id="imageUpload"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-w-md max-h-64 rounded-lg mb-4 object-cover"
                    />
                    <p className="text-sm text-green-600 mb-3">
                      {uploadedImage?.name}
                    </p>
                    <label
                      htmlFor="imageUpload"
                      className="px-6 py-2 bg-white border-2 border-primary text-primary rounded cursor-pointer hover:bg-gray-50 transition-colors text-sm"
                    >
                      تغییر تصویر
                    </label>
                    <input
                      type="file"
                      id="imageUpload"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium"
              >
                ثبت
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                لغو
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
