'use client';
import React, { useState, useEffect } from 'react';

interface FilterSidebarProps {
  onFilterChange?: (filters: FilterState) => void;
  hideCategories?: boolean;
}

export interface FilterState {
  searchQuery: string;
  selectedCategories: string[];
  priceRange: { min: string; max: string };
  selectedBrands: string[];
  selectedFeatures: string[];
  selectedPaymentOptions: string[];
}

export default function FilterSidebar({ onFilterChange, hideCategories = false }: FilterSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedPaymentOptions, setSelectedPaymentOptions] = useState<string[]>([]);

  // Sample data - replace with API data
  const categories = [
    'الکترونیک',
    'مد و پوشاک',
    'خانه و آشپزخانه',
    'کتاب و نشریات',
    'ورزش و سرگرمی'
  ];

  const brands = [
    'برند محصول 1',
    'برند محصول 2',
    'برند محصول 3',
    'برند محصول 4'
  ];

  const features = [
    'ویژگی ۱',
    'ویژگی ۲',
    'ویژگی ۳',
    'ویژگی ۴'
  ];

  const paymentOptions = [
    'پرداخت اینترنتی',
    'پرداخت در محل',
    'اقساطی'
  ];

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const handleFeatureToggle = (feature: string) => {
    setSelectedFeatures(prev =>
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const handlePaymentToggle = (option: string) => {
    setSelectedPaymentOptions(prev =>
      prev.includes(option)
        ? prev.filter(o => o !== option)
        : [...prev, option]
    );
  };

  const handleApplyFilters = () => {
    if (onFilterChange) {
      onFilterChange({
        searchQuery,
        selectedCategories,
        priceRange,
        selectedBrands,
        selectedFeatures,
        selectedPaymentOptions
      });
    }
  };

  // Auto-apply filters when any filter changes
  useEffect(() => {
    if (onFilterChange) {
      onFilterChange({
        searchQuery,
        selectedCategories,
        priceRange,
        selectedBrands,
        selectedFeatures,
        selectedPaymentOptions
      });
    }
  }, [searchQuery, selectedCategories, priceRange, selectedBrands, selectedFeatures, selectedPaymentOptions]);

  return (
    <aside className="bg-white rounded-2xl p-6 sticky top-6 h-fit shadow-lg border-2 border-light-grey" dir="rtl">
      {/* Search Box */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="جستجو در محصولات..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border-2 border-light-grey focus:border-primary focus:outline-none text-right bg-light-mint text-dark-blue placeholder:text-grey"
        />
      </div>

      {/* Categories Section - Only show if hideCategories is false */}
      {!hideCategories && (
        <div className="mb-6 pb-6 border-b-2 border-light-mint">
          <h3 className="text-dark-blue font-bold text-lg mb-4">دسته بندی محصولات</h3>
          <div className="space-y-3">
            {categories.map((category) => (
              <label key={category} className="flex items-center gap-3 cursor-pointer group hover:bg-light-mint p-2 rounded-lg transition-all">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                  className="w-5 h-5 rounded border-2 border-grey text-primary focus:ring-2 focus:ring-primary cursor-pointer accent-primary"
                />
                <span className={`${selectedCategories.includes(category) ? 'text-primary font-semibold' : 'text-dark-blue'} group-hover:text-primary transition-colors text-[15px]`}>
                  {category}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Price Range Section */}
      <div className="mb-6 pb-6 border-b-2 border-light-mint">
        <h3 className="text-dark-blue font-bold text-lg mb-4">قیمت محصول</h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="حداقل قیمت (تومان)"
            value={priceRange.min}
            onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border-2 border-light-grey focus:border-primary focus:outline-none text-right bg-light-mint text-dark-blue placeholder:text-grey"
          />
          <input
            type="text"
            placeholder="حداکثر قیمت (تومان)"
            value={priceRange.max}
            onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border-2 border-light-grey focus:border-primary focus:outline-none text-right bg-light-mint text-dark-blue placeholder:text-grey"
          />
        </div>
      </div>

      {/* Brand Section */}
      <div className="mb-6 pb-6 border-b-2 border-light-mint">
        <h3 className="text-dark-blue font-bold text-lg mb-4">برند</h3>
        <div className="space-y-3">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-3 cursor-pointer group hover:bg-light-mint p-2 rounded-lg transition-all">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandToggle(brand)}
                className="w-5 h-5 rounded border-2 border-grey text-primary focus:ring-2 focus:ring-primary cursor-pointer accent-primary"
              />
              <span className={`${selectedBrands.includes(brand) ? 'text-primary font-semibold' : 'text-dark-blue'} group-hover:text-primary transition-colors text-[15px]`}>
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Product Features Section */}
      <div className="mb-6 pb-6 border-b-2 border-light-mint">
        <h3 className="text-dark-blue font-bold text-lg mb-4">ویژگی محصول</h3>
        <div className="space-y-3">
          {features.map((feature) => (
            <label key={feature} className="flex items-center gap-3 cursor-pointer group hover:bg-light-mint p-2 rounded-lg transition-all">
              <input
                type="checkbox"
                checked={selectedFeatures.includes(feature)}
                onChange={() => handleFeatureToggle(feature)}
                className="w-5 h-5 rounded border-2 border-grey text-primary focus:ring-2 focus:ring-primary cursor-pointer accent-primary"
              />
              <span className={`${selectedFeatures.includes(feature) ? 'text-primary font-semibold' : 'text-dark-blue'} group-hover:text-primary transition-colors text-[15px]`}>
                {feature}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Payment Options Section */}
      <div className="mb-6">
        <h3 className="text-dark-blue font-bold text-lg mb-4">امکان پرداخت</h3>
        <div className="space-y-3">
          {paymentOptions.map((option) => (
            <label key={option} className="flex items-center gap-3 cursor-pointer group hover:bg-light-mint p-2 rounded-lg transition-all">
              <input
                type="checkbox"
                checked={selectedPaymentOptions.includes(option)}
                onChange={() => handlePaymentToggle(option)}
                className="w-5 h-5 rounded border-2 border-grey text-primary focus:ring-2 focus:ring-primary cursor-pointer accent-primary"
              />
              <span className={`${selectedPaymentOptions.includes(option) ? 'text-primary font-semibold' : 'text-dark-blue'} group-hover:text-primary transition-colors text-[15px]`}>
                {option}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Apply Filters Button */}
      <button
        onClick={handleApplyFilters}
        className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-dark-blue transition-all shadow-md hover:shadow-xl transform hover:scale-105"
      >
        اعمال فیلتر
      </button>
    </aside>
  );
}
