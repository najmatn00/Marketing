'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SpecialOffers from '@/components/SpecialOffers';
import FilterSidebar, { FilterState } from '@/components/FilterSidebar';

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const categoryId = params.id as string;

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    selectedCategories: [],
    priceRange: { min: '', max: '' },
    selectedBrands: [],
    selectedFeatures: [],
    selectedPaymentOptions: []
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Fake category data - replace with API call later
  const categories: Record<string, { name: string; description: string }> = {
    '1': { name: 'الکترونیک', description: 'جدیدترین محصولات الکترونیک' },
    '2': { name: 'مد و پوشاک', description: 'بهترین برندهای پوشاک' },
    '3': { name: 'خانه و آشپزخانه', description: 'لوازم خانگی با کیفیت' },
    '4': { name: 'کتاب و نشریات', description: 'کتاب‌های پرفروش' },
    '5': { name: 'ورزش و سرگرمی', description: 'لوازم ورزشی حرفه‌ای' },
    '6': { name: 'لوازم آرایشی', description: 'محصولات آرایشی معتبر' },
    '7': { name: 'اسباب بازی', description: 'اسباب بازی‌های کودکان' },
    '8': { name: 'لوازم التحریر', description: 'لوازم التحریر با کیفیت' },
    '9': { name: 'مواد غذایی', description: 'مواد غذایی تازه' },
    '10': { name: 'خودرو و موتورسیکلت', description: 'لوازم یدکی خودرو' },
    '11': { name: 'ابزار و اداری', description: 'ابزارآلات حرفه‌ای' },
    '12': { name: 'موبایل و تبلت', description: 'گوشی‌های هوشمند' },
  };

  const currentCategory = categories[categoryId] || {
    name: 'دسته بندی',
    description: 'محصولات این دسته بندی'
  };

  // Sample brands and features for products
  const brandOptions = ['برند محصول 1', 'برند محصول 2', 'برند محصول 3', 'برند محصول 4'];
  const featureOptions = ['ویژگی ۱', 'ویژگی ۲', 'ویژگی ۳', 'ویژگی ۴'];

  // Fake products for this category - replace with API call later (generating 30 products for pagination)
  const allProducts = Array(30).fill(null).map((_, i) => {
    const productId = i + 1;
    const basePrice = 300000 + (productId * 50000);
    const discountPrice = Math.floor(basePrice * 0.75);

    // Format prices with comma separator
    const formatPrice = (price: number) => {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '،');
    };

    return {
      id: productId,
      name: `محصول ${currentCategory.name} - ${productId}`,
      originalPrice: basePrice,
      discountPrice: discountPrice,
      originalPriceFormatted: formatPrice(basePrice),
      discountPriceFormatted: formatPrice(discountPrice),
      discount: 25,
      image: '/images/B2B.webp',
      brand: brandOptions[i % brandOptions.length],
      features: [featureOptions[i % featureOptions.length], featureOptions[(i + 1) % featureOptions.length]],
      paymentOptions: i % 2 === 0 ? ['پرداخت اینترنتی', 'پرداخت در محل'] : ['پرداخت اینترنتی', 'اقساطی']
    };
  });

  // Filter products based on selected filters
  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      // Search filter
      if (filters.searchQuery && !product.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
        return false;
      }

      // Price range filter
      if (filters.priceRange.min && product.discountPrice < parseInt(filters.priceRange.min.replace(/،/g, ''))) {
        return false;
      }
      if (filters.priceRange.max && product.discountPrice > parseInt(filters.priceRange.max.replace(/،/g, ''))) {
        return false;
      }

      // Brand filter
      if (filters.selectedBrands.length > 0 && !filters.selectedBrands.includes(product.brand)) {
        return false;
      }

      // Features filter
      if (filters.selectedFeatures.length > 0) {
        const hasFeature = filters.selectedFeatures.some(feature => product.features.includes(feature));
        if (!hasFeature) return false;
      }

      // Payment options filter
      if (filters.selectedPaymentOptions.length > 0) {
        const hasPaymentOption = filters.selectedPaymentOptions.some(option => product.paymentOptions.includes(option));
        if (!hasPaymentOption) return false;
      }

      return true;
    });
  }, [allProducts, filters]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">

      <main>
        {/* Hero Section */}
        <section className="bg-light-mint py-8 md:py-12">
          <div className="container mx-auto px-4 md:px-6" dir="rtl">
            <div className="text-center">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-dark-blue mb-3 md:mb-4">
                {currentCategory.name}
              </h1>
              <p className="text-grey text-sm md:text-base lg:text-lg max-w-2xl mx-auto">
                {currentCategory.description}
              </p>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <section className="bg-white py-3 md:py-4 border-b border-light-grey">
          <div className="container mx-auto px-4 md:px-6" dir="rtl">
            <div className="flex items-center gap-2 text-xs md:text-sm">
              <button
                onClick={() => router.push('/')}
                className="text-grey hover:text-primary transition-colors"
              >
                خانه
              </button>
              <span className="text-grey">/</span>
              <button
                onClick={() => router.push('/categories')}
                className="text-grey hover:text-primary transition-colors"
              >
                دسته بندی ها
              </button>
              <span className="text-grey">/</span>
              <span className="text-dark-blue font-semibold">{currentCategory.name}</span>
            </div>
          </div>
        </section>

        {/* Main Content with Sidebar */}
        <section className="bg-white py-6 md:py-8">
          <div className="container mx-auto px-4 md:px-6" dir="rtl">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
              {/* Filter Sidebar - Right Side (1 column) */}
              <div className="lg:col-span-1 lg:order-1">
                <FilterSidebar onFilterChange={handleFilterChange} hideCategories={true} />
              </div>

              {/* Products Section - Left Side (3 columns) */}
              <div className="lg:col-span-3 lg:order-1">
                {/* Sorting Bar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 pb-4 border-b border-light-grey gap-3">
                  <div className="text-dark-blue font-semibold text-sm md:text-base">
                    {filteredProducts.length > 0
                      ? `${filteredProducts.length} محصول یافت شد (صفحه ${currentPage} از ${totalPages})`
                      : 'هیچ محصولی یافت نشد'
                    }
                  </div>
                  <div className="flex gap-3 md:gap-4 w-full sm:w-auto">
                    <select className="px-4 md:px-6 py-2 text-sm md:text-base border-2 border-light-grey rounded-xl focus:border-primary focus:outline-none text-right flex-1 sm:flex-none">
                      <option>جدیدترین</option>
                      <option>پرفروش‌ترین</option>
                      <option>ارزان‌ترین</option>
                      <option>گران‌ترین</option>
                    </select>
                  </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => router.push(`/product/${product.id}`)}
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

                        <div className="p-3 md:p-4 text-right">
                          <h3 className="text-dark-blue font-semibold mb-2 md:mb-3 text-sm md:text-base line-clamp-2">
                            {product.name}
                          </h3>
                          <div className="flex items-center justify-between">
                            <p className="text-primary text-base md:text-lg font-bold">
                              {product.discountPriceFormatted} تومان
                            </p>
                            <p className="text-grey text-xs md:text-sm line-through">
                              {product.originalPriceFormatted}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-20">
                      <p className="text-grey text-xl">هیچ محصولی با فیلترهای انتخابی یافت نشد</p>
                      <button
                        onClick={() => setFilters({
                          searchQuery: '',
                          selectedCategories: [],
                          priceRange: { min: '', max: '' },
                          selectedBrands: [],
                          selectedFeatures: [],
                          selectedPaymentOptions: []
                        })}
                        className="mt-6 px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-dark-blue transition-all"
                      >
                        پاک کردن فیلترها
                      </button>
                    </div>
                  )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center flex-wrap gap-2 mt-8 md:mt-12">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border-2 transition-colors ${
                        currentPage === 1
                          ? 'border-light-grey text-grey cursor-not-allowed'
                          : 'border-light-grey hover:border-primary hover:text-primary'
                      }`}
                    >
                      قبلی
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 md:px-4 py-2 text-sm md:text-base rounded-lg font-bold transition-colors ${
                          currentPage === page
                            ? 'bg-primary text-white'
                            : 'border-2 border-light-grey hover:border-primary hover:text-primary'
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border-2 transition-colors ${
                        currentPage === totalPages
                          ? 'border-light-grey text-grey cursor-not-allowed'
                          : 'border-light-grey hover:border-primary hover:text-primary'
                      }`}
                    >
                      بعدی
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Special Offers Section */}
        <SpecialOffers />
      </main>


    </div>
  );
}
