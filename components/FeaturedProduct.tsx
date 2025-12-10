'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FeaturedProduct() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fake featured products data - replace this with API call later
  const products = [
    {
      id: 1,
      name: 'محصول شماره یک',
      originalPrice: '۱۴۰،۰۰۰',
      discountPrice: '۸۵،۰۰۰',
      image: '/images/B2B.webp'
    },
    {
      id: 2,
      name: 'محصول شماره دو',
      originalPrice: '۲۵۰،۰۰۰',
      discountPrice: '۱۸۰،۰۰۰',
      image: '/images/b.jpg'
    },
    {
      id: 3,
      name: 'محصول شماره سه',
      originalPrice: '۳۲۰،۰۰۰',
      discountPrice: '۲۴۰،۰۰۰',
      image: '/images/B2B.webp'
    },
    {
      id: 4,
      name: 'محصول شماره چهار',
      originalPrice: '۱۹۰،۰۰۰',
      discountPrice: '۱۲۵،۰۰۰',
      image: '/images/B2B.webp'
    },
    {
      id: 5,
      name: 'محصول شماره پنج',
      originalPrice: '۴۵۰،۰۰۰',
      discountPrice: '۳۲۰،۰۰۰',
      image: '/images/B2B.webp'
    }
  ];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const currentProduct = products[currentIndex];

  return (
    <section className="bg-white py-12 md:py-16 lg:py-20">
  <div className="container mx-auto px-4 md:px-6" dir="rtl">

    {/* Title - centered */}
    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-dark-blue text-center mb-8 md:mb-12 lg:mb-16">
      تخفیفات ویژه
    </h2>

    <div className="relative flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">

      {/* Navigation arrows - Mobile: Below, Desktop: LEFT SIDE */}
      <div className="flex md:flex-col gap-3 md:gap-4 order-2 md:order-1 md:absolute md:left-4 lg:left-36 md:top-1/2 md:-translate-y-1/2">
        <button
          onClick={handlePrev}
          className="w-12 h-12 md:w-14 md:h-14 bg-white border-2 border-light-grey rounded-2xl
          flex items-center justify-center hover:border-primary hover:bg-primary
          hover:text-white transition-all shadow-md hover:shadow-lg group"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6 text-dark-blue group-hover:text-white transition-colors rotate-90 md:rotate-0" fill="none"
            stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>

        <button
          onClick={handleNext}
          className="w-12 h-12 md:w-14 md:h-14 bg-white border-2 border-light-grey rounded-2xl
          flex items-center justify-center hover:border-primary hover:bg-primary
          hover:text-white transition-all shadow-md hover:shadow-lg group"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6 text-dark-blue group-hover:text-white transition-colors rotate-90 md:rotate-0"
            fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Content Stack - Mobile: Column, Desktop: Overlapping */}
      <div className="w-full md:w-auto flex flex-col md:flex-row items-center justify-center order-1 md:order-2">
        {/* Background Purple Box */}
        <div className="hidden md:block md:w-[300px] lg:w-[451px] md:h-[400px] lg:h-[607px] bg-primary rounded-2xl overflow-hidden shadow-md">
        </div>

        {/* Product Image */}
        <div className="w-full md:w-[360px] lg:w-[541px] h-[250px] md:h-[200px] lg:h-[302px] bg-white rounded-2xl md:-mr-[14%] overflow-hidden shadow-md">
          <img
            src={currentProduct.image}
            alt={currentProduct.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info Card */}
        <div
          onClick={() => router.push(`/product/${currentProduct.id}`)}
          className="bg-light-mint rounded-2xl shadow-xl hover:shadow-2xl transition-all
          duration-300 cursor-pointer group w-full md:w-[360px] lg:w-[540px] md:-mr-[10%] p-6 md:p-8 lg:p-10 flex items-center"
        >
          {/* Product Info */}
          <div className="flex-1 text-right">
            <h3 className="text-sm md:text-base font-medium text-dark-blue mb-2">
              {currentProduct.name}
            </h3>

            <p className="text-grey text-xs md:text-sm font-light line-through mb-1">
              {currentProduct.originalPrice} تومان
            </p>

            <p className="text-dark-blue text-lg md:text-xl font-medium">
              {currentProduct.discountPrice} تومان
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Pagination dots */}
    <div className="flex justify-center gap-3 mt-10">
      {products.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentIndex(index)}
          className={`h-2 rounded-full transition-all duration-300 
            ${index === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-light-grey hover:bg-grey'}`}
        />
      ))}
    </div>

  </div>
</section>

  );
}
