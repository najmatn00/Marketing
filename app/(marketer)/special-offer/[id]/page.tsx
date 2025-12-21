'use client';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SpecialOffers from '@/components/SpecialOffers';
import Categories from '@/components/Categories';
import FAQ from '@/components/FAQ';

export default function SpecialOfferPage() {
  const params = useParams();
  const offerId = params.id as string;

  // Fake special offer data - replace with API call later
  const offers: Record<string, {
    title: string;
    description: string;
    mainImage: string;
    discount: number;
    endDate: string;
  }> = {
    '1': {
      title: 'فروش ویژه محصولات الکترونیک',
      description: 'تا ۵۰٪ تخفیف روی تمامی محصولات الکترونیکی. فرصت محدود!',
      mainImage: '/images/B2B.webp',
      discount: 50,
      endDate: '۱۵ اسفند ۱۴۰۳'
    },
    '2': {
      title: 'تخفیفات ویژه مد و پوشاک',
      description: 'کلکسیون بهاره با تخفیف های باورنکردنی. همین حالا خرید کنید!',
      mainImage: '/images/B2B.webp',
      discount: 40,
      endDate: '۲۰ اسفند ۱۴۰۳'
    },
    '3': {
      title: 'حراج لوازم خانگی',
      description: 'بهترین برندهای لوازم خانگی با قیمت های استثنایی',
      mainImage: '/images/B2B.webp',
      discount: 35,
      endDate: '۲۵ اسفند ۱۴۰۳'
    }
  };

  const currentOffer = offers[offerId] || {
    title: 'پیشنهاد ویژه',
    description: 'محصولات با تخفیف ویژه',
    mainImage: '/images/B2B.webp',
    discount: 30,
    endDate: 'به زودی'
  };

  // Fake featured products - replace with API call later
  const featuredProducts = Array(8).fill(null).map((_, i) => ({
    id: i + 1,
    name: `محصول ویژه ${i + 1}`,
    originalPrice: '۳۵۰،۰۰۰',
    discountPrice: '۲۱۰،۰۰۰',
    discount: currentOffer.discount,
    image: '/images/B2B.webp'
  }));

  return (
    <div className="min-h-screen bg-white">
     
      <main>
        {/* Hero Banner */}
        <section className="bg-light-mint py-16">
          <div className="container mx-auto px-6" dir="rtl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div className="text-right space-y-6">
                <div className="inline-block bg-primary text-white px-6 py-2 rounded-full text-2xl font-bold shadow-lg">
                  {currentOffer.discount}% تخفیف
                </div>
                <h1 className="text-5xl font-bold text-dark-blue">
                  {currentOffer.title}
                </h1>
                <p className="text-grey text-xl leading-relaxed">
                  {currentOffer.description}
                </p>
                <div className="flex items-center gap-3 text-dark-blue">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-lg font-medium">
                    پایان پیشنهاد: {currentOffer.endDate}
                  </span>
                </div>
              </div>

              {/* Image */}
              <div className="relative">
                <div className="aspect-video bg-white rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={currentOffer.mainImage}
                    alt={currentOffer.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
            <div className="container mx-auto px-6 mt-24" dir="rtl">
              
            <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Image */}
              <div className="relative">
                <div className="aspect-video bg-white rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={currentOffer.mainImage}
                    alt={currentOffer.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Text Content */}
              <div className="text-right space-y-6">
                <div className="inline-block bg-primary text-white px-6 py-2 rounded-full text-2xl font-bold shadow-lg">
                  {currentOffer.discount}% تخفیف
                </div>
                <h1 className="text-5xl font-bold text-dark-blue">
                  {currentOffer.title}
                </h1>
                <p className="text-grey text-xl leading-relaxed">
                  {currentOffer.description}
                </p>
                <div className="flex items-center gap-3 text-dark-blue">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-lg font-medium">
                    پایان پیشنهاد: {currentOffer.endDate}
                  </span>
                </div>
              </div>

            
            </div>
          </div>
        </section>

   

   
       
        <FAQ />
      </main>

   
    </div>
  );
}
