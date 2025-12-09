'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  return (
    <header className="bg-white border-b border-light-grey shadow-sm">
      <div className="container mx-auto px-6 py-4 relative">
        <div className="flex items-center justify-between" dir="rtl">

          <button
            onClick={() => router.push('/')}
            className="text-dark-blue hover:text-primary text-[20px] transition-colors font-bold"
          >
            لوگو
          </button>


          <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-8 text-[18px] font-semibold">
            <button
              onClick={() => router.push('/')}
              className="text-dark-blue hover:text-primary transition-colors hover:scale-105 transform"
            >
              خانه
            </button>
            <button
              onClick={() => router.push('/categories')}
              className="text-dark-blue hover:text-primary transition-colors hover:scale-105 transform"
            >
              دسته بندی ها
            </button>
            <button
              onClick={() => router.push('/about')}
              className="text-dark-blue hover:text-primary transition-colors hover:scale-105 transform"
            >
              درباره ما
            </button>
          </nav>


          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/auth')}
              className="px-8 py-2.5 text-[18px] bg-dark-blue font-semibold text-white rounded-lg hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg"
            >
              ورود / ثبت نام
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
