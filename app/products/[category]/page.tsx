'use client';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SpecialOffers from '@/components/SpecialOffers';

export default function ProductCategoryPage() {
  const params = useParams();
  const category = params.category as string;

  // Fake category data - replace with API call later
  const categoryData: Record<string, { title: string; description: string }> = {
    electronics: {
      title: 'محصولات الکترونیک',
      description: 'جدیدترین و بهترین محصولات الکترونیک را با قیمت های باورنکردنی از ما بخرید'
    },
    fashion: {
      title: 'مد و پوشاک',
      description: 'بهترین برندهای مد و پوشاک با تخفیفات ویژه'
    },
    home: {
      title: 'لوازم خانگی',
      description: 'تمامی لوازم خانگی مورد نیاز خود را با قیمت های استثنایی تهیه کنید'
    }
  };

  const currentCategory = categoryData[category] || {
    title: 'محصولات',
    description: 'مشاهده تمامی محصولات'
  };

  // Fake products - replace with API call later
  const products = Array(12).fill(null).map((_, i) => ({
    id: i + 1,
    name: `محصول شماره ${i + 1}`,
    originalPrice: '۲۵۰،۰۰۰',
    discountPrice: '۱۸۰،۰۰۰',
    discount: 30,
    image: '/images/B2B.webp'
  }));

  return (
    <div className="min-h-screen bg-white">
     

      <main>
        {/* Hero Section */}
        <section className="bg-light-mint py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 md:px-6" dir="rtl">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-blue mb-3 md:mb-4">
                {currentCategory.title}
              </h1>
              <p className="text-grey text-base md:text-lg lg:text-xl max-w-2xl mx-auto">
                {currentCategory.description}
              </p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="bg-white py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 md:px-6" dir="rtl">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group"
                >
                  <div className="relative aspect-square bg-light-grey overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {/* Discount badge */}
                    <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-primary text-white px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-bold shadow-lg">
                      {product.discount}%
                    </div>
                  </div>

                  <div className="p-3 md:p-4 lg:p-5 text-right">
                    <h3 className="text-dark-blue font-semibold mb-2 md:mb-3 text-sm md:text-base lg:text-lg line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <p className="text-primary text-base md:text-lg lg:text-xl font-bold">
                        {product.discountPrice} تومان
                      </p>
                      <p className="text-grey text-xs md:text-sm line-through">
                        {product.originalPrice}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Special Offers Section */}
        <SpecialOffers />
      </main>

    
    </div>
  );
}
