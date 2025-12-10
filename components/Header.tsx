'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-light-grey shadow-sm">
      <div className="container mx-auto px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between" dir="rtl">

          {/* Logo */}
          <button
            onClick={() => router.push('/')}
            className="text-dark-blue hover:text-primary text-lg md:text-xl transition-colors font-bold z-50"
          >
            لوگو
          </button>

          {/* Desktop Navigation - Hidden on Mobile */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-base lg:text-lg font-semibold">
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

          {/* Auth Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-3 md:gap-4">
            <button
              onClick={() => router.push('/auth')}
              className="px-4 py-2 md:px-6 lg:px-8 md:py-2.5 text-sm md:text-base lg:text-lg bg-dark-blue font-semibold text-white rounded-lg hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg"
            >
              <span className="hidden sm:inline">ورود / ثبت نام</span>
              <span className="sm:hidden">ورود</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-dark-blue hover:text-primary transition-colors"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>

        {/* Mobile Menu - Slides Down */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            mobileMenuOpen ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="flex flex-col gap-3 py-2" dir="rtl">
            <button
              onClick={() => {
                router.push('/');
                setMobileMenuOpen(false);
              }}
              className="text-dark-blue hover:text-primary transition-colors text-right px-4 py-2 hover:bg-light-mint rounded-lg font-medium"
            >
              خانه
            </button>
            <button
              onClick={() => {
                router.push('/categories');
                setMobileMenuOpen(false);
              }}
              className="text-dark-blue hover:text-primary transition-colors text-right px-4 py-2 hover:bg-light-mint rounded-lg font-medium"
            >
              دسته بندی ها
            </button>
            <button
              onClick={() => {
                router.push('/about');
                setMobileMenuOpen(false);
              }}
              className="text-dark-blue hover:text-primary transition-colors text-right px-4 py-2 hover:bg-light-mint rounded-lg font-medium"
            >
              درباره ما
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
