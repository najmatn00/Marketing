'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function Categories() {
  const router = useRouter();

  const handleCategoryClick = (categoryId: number) => {
    router.push(`/category/${categoryId}`);
  };

  // Fake category data - replace this with API call later
  const categories = [
    { id: 1, name: 'الکترونیک', icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z' },
    { id: 2, name: 'مد و پوشاک', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { id: 3, name: 'خانه و آشپزخانه', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 4, name: 'کتاب و نشریات', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
    { id: 5, name: 'ورزش و سرگرمی', icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 6, name: 'لوازم آرایشی', icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01' },
    { id: 7, name: 'اسباب بازی', icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 8, name: 'لوازم التحریر', icon: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' },
    { id: 9, name: 'مواد غذایی', icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' },
    { id: 10, name: 'خودرو و موتورسیکلت', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' },
    { id: 11, name: 'ابزار و اداری', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
    { id: 12, name: 'موبایل و تبلت', icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z' },
  ];

  return (
    <section className="bg-white py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6" dir="rtl">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-dark-blue mb-8 md:mb-10 lg:mb-12 text-right">
          دسته بندی سایت
        </h2>

        {/* Horizontal scrollable container */}
        <div className="relative">
          <div className="flex gap-4 md:gap-6 lg:gap-8 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="flex flex-col items-center gap-3 md:gap-4 group cursor-pointer snap-start scrollbar-hide"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 bg-light-grey rounded-full flex items-center justify-center group-hover:bg-light-mint group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                  <svg className="w-10 h-10 md:w-12 md:h-12 text-grey group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={category.icon} />
                  </svg>
                </div>
                <span className="text-xs md:text-sm text-dark-blue text-center font-medium group-hover:text-primary transition-colors w-20 md:w-24">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
