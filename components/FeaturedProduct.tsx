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
    <section className="bg-white py-20">
  <div className="container mx-auto px-6" dir="rtl">

    {/* Title - centered */}
    <h2 className="text-4xl font-bold text-dark-blue text-center mb-16">
      تخفیفات ویژه
    </h2>

    <div className="relative flex items-center ">

      {/* Navigation arrows - LEFT SIDE outside the card */}
      <div className="absolute left-36 top-1/2 -translate-y-1/2 flex flex-col gap-4">
        <button
          onClick={handlePrev}
          className="w-14 h-14 bg-white border-2 border-light-grey rounded-2xl 
          flex items-center justify-center hover:border-primary hover:bg-primary 
          hover:text-white transition-all shadow-md hover:shadow-lg group"
        >
          <svg className="w-6 h-6 text-dark-blue group-hover:text-white transition-colors" fill="none"
            stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>

        <button
          onClick={handleNext}
          className="w-14 h-14 bg-white border-2 border-light-grey rounded-2xl 
          flex items-center justify-center hover:border-primary hover:bg-primary 
          hover:text-white transition-all shadow-md hover:shadow-lg group"
        >
          <svg className="w-6 h-6 text-dark-blue group-hover:text-white transition-colors"
            fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
       <div className="w-[451px] h-[607px] bg-primary rounded-[16px]  overflow-hidden shadow-md 
        group-hover:scale-105 transition-transform duration-300">
        
        </div>
         
         <div className="w-[541px] h-[302px] bg-white rounded-[8px] -mr-[14%] overflow-hidden shadow-md 
        group-hover:scale-105 transition-transform duration-300">
          <img
            src={currentProduct.image}
            alt={currentProduct.name}
            className="w-full h-full object-cover"
          />
        </div>
      <div
        onClick={() => router.push(`/product/${currentProduct.id}`)}
        className="bg-light-mint rounded-[8px] shadow-xl hover:shadow-2xl transition-all -mr-[10%]
        duration-300 cursor-pointer group h-[142px] w-[540px] max-w-full p-10 flex items-center gap-12"
      >
       
        {/* Product Info - LEFT side of card */}
        <div className="flex-1 text-right">
          <h3 className="text-[16px] font-medium text-dark-blue mb-2">
            {currentProduct.name}
          </h3>

          <p className="text-grey text-[14px] font-light line-through mb-1">
            {currentProduct.originalPrice} تومان
          </p>

          <p className="text-dark-blue text-[20px] font-medium">
            {currentProduct.discountPrice} تومان
          </p>
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
