'use client';
import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function SpecialOffers() {
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Fake special offers data - replace this with API call later
  const offers = [
    { id: 1, name: 'هدفون بلوتوثی سونی', originalPrice: '2,500,000', discountPrice: '1,850,000', discount: 26, image: '/images/B2B.webp' },
    { id: 2, name: 'ساعت هوشمند شیائومی', originalPrice: '1,800,000', discountPrice: '1,350,000', discount: 25, image: '/images/B2B.webp'  },
    { id: 3, name: 'کیف چرمی مردانه', originalPrice: '950,000', discountPrice: '665,000', discount: 30, image: '/images/B2B.webp'  },
    { id: 4, name: 'کتاب هری پاتر مجموعه کامل', originalPrice: '890,000', discountPrice: '623,000', discount: 30, image: '/images/B2B.webp'  },
    { id: 5, name: 'توپ فوتبال آدیداس', originalPrice: '650,000', discountPrice: '455,000', discount: 30, image: '/images/B2B.webp'  },
    { id: 6, name: 'لوازم آرایشی مک', originalPrice: '3,200,000', discountPrice: '2,400,000', discount: 25, image: '/images/B2B.webp'  },
    { id: 7, name: 'ماشین کنترلی بزرگ', originalPrice: '1,200,000', discountPrice: '840,000', discount: 30, image: '/images/B2B.webp'  },
    { id: 8, name: 'دفتر یادداشت چرمی', originalPrice: '320,000', discountPrice: '240,000', discount: 25, image: '/images/B2B.webp'  },
    { id: 9, name: 'پودر پروتئین ایزوپیور', originalPrice: '2,800,000', discountPrice: '2,240,000', discount: 20, image: '/images/B2B.webp'  },
    { id: 10, name: 'چراغ مطالعه LED', originalPrice: '580,000', discountPrice: '406,000', discount: 30, image: '/images/B2B.webp' },
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newPosition = direction === 'right'
        ? scrollContainerRef.current.scrollLeft + scrollAmount
        : scrollContainerRef.current.scrollLeft - scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="bg-light-mint py-20">
      <div className="container mx-auto px-6" dir="rtl">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl  font-bold text-dark-blue">
            تخفیفات ویژه
          </h2>
          <div className="w-[73rem] h-[1px] bg-dark-blue"></div>
          <div className="flex flex-row-reverse gap-3">
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 bg-white border-2 border-light-grey rounded-xl flex items-center justify-center hover:border-primary hover:bg-primary hover:text-white transition-all shadow-md hover:shadow-lg group"
            >
              <svg className="w-6 h-6 text-dark-blue group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 bg-white border-2 border-light-grey rounded-xl flex items-center justify-center hover:border-primary hover:bg-primary hover:text-white transition-all shadow-md hover:shadow-lg group"
            >
              <svg className="w-6 h-6 text-dark-blue group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Horizontal scrollable container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
        >
          {offers.map((offer) => (
            <div
              key={offer.id}
              onClick={() => router.push(`/product/${offer.id}`)}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group flex-shrink-0 w-72 snap-start"
            >
              <div className="relative aspect-square bg-light-grey overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {/* Discount badge */}
                <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  {offer.discount}%
                </div>
              </div>

              <div className="p-5 text-right">
                <h3 className="text-dark-blue font-semibold mb-3 text-lg line-clamp-2">{offer.name}</h3>
                <div className="flex items-center justify-between ">
                  <p className="text-primary text-xl font-bold">{offer.discountPrice} تومان</p>
                  <p className="text-grey text-sm line-through">{offer.originalPrice}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
