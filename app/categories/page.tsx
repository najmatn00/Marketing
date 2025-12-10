'use client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Categories from '@/components/Categories';
import FilterSidebar, { FilterState } from '@/components/FilterSidebar';
import { useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';

export default function CategoriesPage() {
  const router = useRouter();

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    selectedCategories: [],
    priceRange: { min: '', max: '' },
    selectedBrands: [],
    selectedFeatures: [],
    selectedPaymentOptions: []
  });

  // Fake categories data - replace with API call later
  const allCategories = [
    { id: 1, name: 'الکترونیک', count: 245, image: '/images/B2B.webp', type: 'الکترونیک' },
    { id: 2, name: 'مد و پوشاک', count: 432, image: '/images/B2B.webp', type: 'مد و پوشاک' },
    { id: 3, name: 'خانه و آشپزخانه', count: 189, image: '/images/B2B.webp', type: 'خانه و آشپزخانه' },
    { id: 4, name: 'کتاب و نشریات', count: 567, image: '/images/B2B.webp', type: 'کتاب و نشریات' },
    { id: 5, name: 'ورزش و سرگرمی', count: 321, image: '/images/B2B.webp', type: 'ورزش و سرگرمی' },
    { id: 6, name: 'لوازم آرایشی', count: 298, image: '/images/B2B.webp', type: 'لوازم آرایشی' },
    { id: 7, name: 'اسباب بازی', count: 176, image: '/images/B2B.webp', type: 'اسباب بازی' },
    { id: 8, name: 'لوازم التحریر', count: 134, image: '/images/B2B.webp', type: 'لوازم التحریر' },
    { id: 9, name: 'مواد غذایی', count: 412, image: '/images/B2B.webp', type: 'مواد غذایی' },
    { id: 10, name: 'خودرو و موتورسیکلت', count: 89, image: '/images/B2B.webp', type: 'خودرو و موتورسیکلت' },
    { id: 11, name: 'ابزار و اداری', count: 234, image: '/images/B2B.webp', type: 'ابزار و اداری' },
    { id: 12, name: 'موبایل و تبلت', count: 378, image: '/images/B2B.webp', type: 'موبایل و تبلت' },
  ];

  // Filter categories based on selected filters
  const filteredCategories = useMemo(() => {
    return allCategories.filter(category => {
      // Search filter
      if (filters.searchQuery && !category.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
        return false;
      }

      // Category filter (filter by category type)
      if (filters.selectedCategories.length > 0 && !filters.selectedCategories.includes(category.type)) {
        return false;
      }

      return true;
    });
  }, [allCategories, filters]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-white">

      <main>
        {/* Hero Section */}
        <section className="bg-light-mint py-8 md:py-12">
          <div className="container mx-auto px-4 md:px-6" dir="rtl">
            <div className="text-center">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-dark-blue mb-3 md:mb-4">
                دسته بندی محصولات
              </h1>
              <p className="text-grey text-sm md:text-base lg:text-lg max-w-2xl mx-auto">
                تمامی دسته‌بندی‌های محصولات ما را مشاهده کنید
              </p>
            </div>
          </div>
        </section>

        {/* Main Content with Sidebar */}
        <section className="bg-white py-6 md:py-8">
          <div className="container mx-auto px-4 md:px-6" dir="rtl">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
              {/* Filter Sidebar - Right Side (1 column) */}
              <div className="lg:col-span-1 lg:order-1">
                <FilterSidebar onFilterChange={handleFilterChange} />
              </div>

              {/* Categories Section - Left Side (3 columns) */}
              <div className="lg:col-span-3 lg:order-1">
                {/* Count Bar */}
                <div className="flex items-center justify-between mb-6 md:mb-8 pb-4 border-b border-light-grey">
                  <div className="text-dark-blue font-semibold text-base md:text-lg">
                    {filteredCategories.length} دسته بندی یافت شد
                  </div>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {filteredCategories.length > 0 ? (
                    filteredCategories.map((category) => (
                      <div
                        key={category.id}
                        onClick={() => router.push(`/category/${category.id}`)}
                        className="bg-white rounded-2xl md:rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group"
                      >
                        {/* Category Image */}
                        <div className="aspect-square bg-light-grey overflow-hidden relative">
                          <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          {/* Product Count Badge */}
                          <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-primary text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold shadow-lg">
                            {category.count} محصول
                          </div>
                        </div>

                        {/* Category Info */}
                        <div className="p-4 md:p-6 text-center">
                          <h3 className="text-dark-blue font-bold text-lg md:text-xl group-hover:text-primary transition-colors">
                            {category.name}
                          </h3>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-20">
                      <p className="text-grey text-xl">هیچ دسته بندی با فیلترهای انتخابی یافت نشد</p>
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
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Categories Component */}
        <Categories />
      </main>


    </div>
  );
}
