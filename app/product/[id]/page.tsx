'use client';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SpecialOffers from '@/components/SpecialOffers';

interface ProductData {
  id: string;
  name: string;
  description: string;
  originalPrice: string;
  discountPrice: string;
  discount: number;
  inStock: boolean;
  stockCount: number;
  images: string[];
  features: string[];
  specifications: { label: string; value: string }[];
}

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Category names mapping
  const categoryNames: Record<string, string> = {
    '1': 'الکترونیک',
    '2': 'مد و پوشاک',
    '3': 'خانه و آشپزخانه',
    '4': 'کتاب و نشریات',
    '5': 'ورزش و سرگرمی',
    '6': 'لوازم آرایشی',
    '7': 'اسباب بازی',
    '8': 'لوازم التحریر',
    '9': 'مواد غذایی',
    '10': 'خودرو و موتورسیکلت',
    '11': 'ابزار و اداری',
    '12': 'موبایل و تبلت',
  };

  // Generate dynamic product data based on product ID
  const generateProductData = (id: string): ProductData => {
    const numId = parseInt(id);
    const categoryId = ((numId - 1) % 12 + 1).toString();
    const categoryName = categoryNames[categoryId];

    const brandOptions = ['برند محصول 1', 'برند محصول 2', 'برند محصول 3', 'برند محصول 4'];
    const brand = brandOptions[(numId - 1) % brandOptions.length];

    const basePrice = 300000 + (numId * 50000);
    const discountPrice = Math.floor(basePrice * 0.75);

    // Format prices with Persian numerals and comma separator
    const formatPrice = (price: number) => {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '،');
    };

    return {
      id: id,
      name: `محصول ${categoryName} - ${id}`,
      description: `این محصول با کیفیت عالی و قیمت مناسب یکی از بهترین گزینه‌های موجود در دسته ${categoryName} است. این محصول با استفاده از بهترین مواد اولیه تولید شده و دارای گارانتی معتبر می‌باشد. مناسب برای استفاده روزمره و حرفه‌ای.`,
      originalPrice: formatPrice(basePrice),
      discountPrice: formatPrice(discountPrice),
      discount: 25,
      inStock: true,
      stockCount: 10 + (numId % 20),
      images: ['/images/B2B.webp', '/images/B2B.webp', '/images/B2B.webp', '/images/B2B.webp'],
      features: [
        'کیفیت عالی و مرغوب',
        'قیمت مناسب و رقابتی',
        'گارانتی اصالت کالا',
        'ارسال سریع و رایگان',
        'بسته‌بندی مقاوم',
        'پشتیبانی ۲۴ ساعته'
      ],
      specifications: [
        { label: 'برند', value: brand },
        { label: 'دسته بندی', value: categoryName },
        { label: 'کد محصول', value: `PRD-${id}` },
        { label: 'وضعیت', value: 'موجود در انبار' },
        { label: 'گارانتی', value: '۱۲ ماه' }
      ]
    };
  };

  // Fake product data - replace with API call later
  const products: Record<string, ProductData> = {
    '1': {
      id: '1',
      name: 'هدفون بلوتوثی سونی WH-1000XM5',
      description: 'هدفون بی‌سیم سونی با کیفیت صدای استثنایی و قابلیت حذف نویز فعال. این هدفون با باتری قدرتمند و طراحی راحت، بهترین انتخاب برای علاقه‌مندان به موسیقی است.',
      originalPrice: '۲،۵۰۰،۰۰۰',
      discountPrice: '۱،۸۵۰،۰۰۰',
      discount: 26,
      inStock: true,
      stockCount: 15,
      images: ['/images/B2B.webp', '/images/B2B.webp', '/images/B2B.webp', '/images/B2B.webp'],
      features: ['کیفیت صدای بی‌نظیر', 'حذف نویز فعال', 'باتری ۳۰ ساعته', 'اتصال بلوتوث ۵.۲', 'میکروفون داخلی', 'قابلیت تا شدن'],
      specifications: [
        { label: 'برند', value: 'سونی' },
        { label: 'مدل', value: 'WH-1000XM5' },
        { label: 'رنگ', value: 'مشکی، نقره‌ای' },
        { label: 'وزن', value: '۲۵۰ گرم' },
        { label: 'گارانتی', value: '۱۸ ماه' }
      ]
    },
    '2': {
      id: '2',
      name: 'ساعت هوشمند شیائومی Mi Band 7',
      description: 'ساعت هوشمند شیائومی با صفحه نمایش رنگی AMOLED و قابلیت ردیابی سلامت و ورزش. مقاوم در برابر آب و عمر باتری طولانی.',
      originalPrice: '۱،۸۰۰،۰۰۰',
      discountPrice: '۱،۳۵۰،۰۰۰',
      discount: 25,
      inStock: true,
      stockCount: 22,
      images: ['/images/B2B.webp', '/images/B2B.webp', '/images/B2B.webp', '/images/B2B.webp'],
      features: ['صفحه نمایش AMOLED', 'ردیابی ضربان قلب', 'مقاوم در برابر آب', 'باتری ۱۴ روزه', 'اعلان‌های هوشمند', '۱۰۰+ حالت ورزشی'],
      specifications: [
        { label: 'برند', value: 'شیائومی' },
        { label: 'مدل', value: 'Mi Band 7' },
        { label: 'رنگ', value: 'مشکی، آبی، صورتی' },
        { label: 'وزن', value: '۲۴ گرم' },
        { label: 'گارانتی', value: '۱۲ ماه' }
      ]
    },
    '3': {
      id: '3',
      name: 'کیف چرمی مردانه لاکچری',
      description: 'کیف دستی مردانه از چرم طبیعی با دوخت‌های استاندارد و طراحی مدرن. مناسب برای استفاده روزمره و رسمی.',
      originalPrice: '۹۵۰،۰۰۰',
      discountPrice: '۶۶۵،۰۰۰',
      discount: 30,
      inStock: true,
      stockCount: 8,
      images: ['/images/B2B.webp', '/images/B2B.webp', '/images/B2B.webp', '/images/B2B.webp'],
      features: ['چرم طبیعی ۱۰۰٪', 'جیب‌های متعدد', 'بند قابل تنظیم', 'زیپ کیفیت بالا', 'طراحی مدرن', 'مقاوم و بادوام'],
      specifications: [
        { label: 'جنس', value: 'چرم طبیعی' },
        { label: 'رنگ', value: 'قهوه‌ای، مشکی' },
        { label: 'ابعاد', value: '۳۰×۲۵×۸ سانتی‌متر' },
        { label: 'ساخت', value: 'ایران' },
        { label: 'گارانتی', value: '۶ ماه' }
      ]
    },
    '4': {
      id: '4',
      name: 'کتاب هری پاتر مجموعه کامل (۷ جلدی)',
      description: 'مجموعه کامل هفت جلدی هری پاتر با ترجمه فارسی، جلد سخت و کاغذ گلاسه. بهترین هدیه برای علاقه‌مندان به فانتزی.',
      originalPrice: '۸۹۰،۰۰۰',
      discountPrice: '۶۲۳،۰۰۰',
      discount: 30,
      inStock: true,
      stockCount: 12,
      images: ['/images/B2B.webp', '/images/B2B.webp', '/images/B2B.webp', '/images/B2B.webp'],
      features: ['۷ جلد کامل', 'ترجمه فارسی', 'جلد سخت', 'کاغذ گلاسه', 'تصاویر رنگی', 'جعبه مقوایی'],
      specifications: [
        { label: 'نویسنده', value: 'جی. کی. رولینگ' },
        { label: 'مترجم', value: 'ویدا اسلامیه' },
        { label: 'نوع جلد', value: 'سخت' },
        { label: 'تعداد صفحات', value: '۳۵۰۰+' },
        { label: 'ناشر', value: 'تندیس' }
      ]
    },
    '5': {
      id: '5',
      name: 'توپ فوتبال آدیداس حرفه‌ای',
      description: 'توپ فوتبال استاندارد آدیداس مناسب برای بازی‌های حرفه‌ای و تمرینات. ساخته شده از مواد با کیفیت و دوام بالا.',
      originalPrice: '۶۵۰،۰۰۰',
      discountPrice: '۴۵۵،۰۰۰',
      discount: 30,
      inStock: true,
      stockCount: 18,
      images: ['/images/B2B.webp', '/images/B2B.webp', '/images/B2B.webp', '/images/B2B.webp'],
      features: ['سایز ۵ استاندارد', 'دوخت حرفه‌ای', 'مواد با کیفیت', 'مقاوم در برابر آب', 'گریپ عالی', 'رنگ‌های متنوع'],
      specifications: [
        { label: 'برند', value: 'آدیداس' },
        { label: 'سایز', value: '۵' },
        { label: 'جنس', value: 'PU' },
        { label: 'وزن', value: '۴۲۰ گرم' },
        { label: 'گارانتی', value: '۳ ماه' }
      ]
    },
    '6': {
      id: '6',
      name: 'لوازم آرایشی مک - پکیج کامل',
      description: 'پکیج کامل لوازم آرایش برند معتبر مک شامل رژ لب، سایه چشم، ریمل و کرم پودر. اورجینال و تست شده.',
      originalPrice: '۳،۲۰۰،۰۰۰',
      discountPrice: '۲،۴۰۰،۰۰۰',
      discount: 25,
      inStock: true,
      stockCount: 6,
      images: ['/images/B2B.webp', '/images/B2B.webp', '/images/B2B.webp', '/images/B2B.webp'],
      features: ['محصولات اورجینال', 'پکیج کامل', 'مناسب تمام پوست‌ها', 'ماندگاری بالا', 'رنگ‌های متنوع', 'هولوگرام اصالت'],
      specifications: [
        { label: 'برند', value: 'MAC' },
        { label: 'محتویات', value: 'رژ، سایه، ریمل، پودر' },
        { label: 'ساخت', value: 'آمریکا' },
        { label: 'تاریخ تولید', value: '۲۰۲۴' },
        { label: 'گارانتی', value: 'اصالت کالا' }
      ]
    },
    '7': {
      id: '7',
      name: 'ماشین کنترلی بزرگ آفرود',
      description: 'ماشین کنترلی با سایز بزرگ و قابلیت حرکت در تمام سطوح. مجهز به باتری قوی و کنترل از راه دور تا ۱۰۰ متر.',
      originalPrice: '۱،۲۰۰،۰۰۰',
      discountPrice: '۸۴۰،۰۰۰',
      discount: 30,
      inStock: true,
      stockCount: 10,
      images: ['/images/B2B.webp', '/images/B2B.webp', '/images/B2B.webp', '/images/B2B.webp'],
      features: ['سایز بزرگ', 'کنترل از راه دور', 'باتری شارژی', 'مقاوم در برابر ضربه', 'سرعت بالا', 'چراغ LED'],
      specifications: [
        { label: 'سایز', value: '۴۵ سانتی‌متر' },
        { label: 'سرعت', value: '۲۵ کیلومتر بر ساعت' },
        { label: 'برد کنترل', value: '۱۰۰ متر' },
        { label: 'زمان شارژ', value: '۲ ساعت' },
        { label: 'گارانتی', value: '۶ ماه' }
      ]
    },
    '8': {
      id: '8',
      name: 'دفتر یادداشت چرمی دست‌ساز',
      description: 'دفتر یادداشت با جلد چرمی طبیعی و کاغذ بدون خط با کیفیت بالا. مناسب برای نوشتن، طراحی و یادداشت‌برداری.',
      originalPrice: '۳۲۰،۰۰۰',
      discountPrice: '۲۴۰،۰۰۰',
      discount: 25,
      inStock: true,
      stockCount: 25,
      images: ['/images/B2B.webp', '/images/B2B.webp', '/images/B2B.webp', '/images/B2B.webp'],
      features: ['جلد چرم طبیعی', 'کاغذ ۱۰۰ گرمی', 'قفل مغناطیسی', 'جیب داخلی', 'نشانک ابریشمی', 'دست‌ساز'],
      specifications: [
        { label: 'جنس جلد', value: 'چرم طبیعی' },
        { label: 'تعداد صفحات', value: '۲۰۰ صفحه' },
        { label: 'سایز', value: 'A5' },
        { label: 'رنگ', value: 'قهوه‌ای، مشکی' },
        { label: 'ساخت', value: 'دست‌ساز' }
      ]
    },
    '9': {
      id: '9',
      name: 'پودر پروتئین ایزوپیور ۲ کیلویی',
      description: 'پودر پروتئین وی ایزوله با کیفیت بالا و جذب سریع. مناسب برای بدنسازان و ورزشکاران حرفه‌ای.',
      originalPrice: '۲،۸۰۰،۰۰۰',
      discountPrice: '۲،۲۴۰،۰۰۰',
      discount: 20,
      inStock: true,
      stockCount: 14,
      images: ['/images/B2B.webp', '/images/B2B.webp', '/images/B2B.webp', '/images/B2B.webp'],
      features: ['۲۵ گرم پروتئین در هر وعده', 'بدون قند', 'جذب سریع', 'طعم‌های متنوع', 'مناسب رژیم', 'هضم آسان'],
      specifications: [
        { label: 'برند', value: 'Isopure' },
        { label: 'وزن', value: '۲ کیلوگرم' },
        { label: 'طعم', value: 'شکلاتی، وانیلی، توت فرنگی' },
        { label: 'ساخت', value: 'آمریکا' },
        { label: 'گارانتی', value: 'اصالت کالا' }
      ]
    },
    '10': {
      id: '10',
      name: 'چراغ مطالعه LED قابل تنظیم',
      description: 'چراغ مطالعه LED با نور قابل تنظیم و پایه منعطف. مناسب برای مطالعه، کار با کامپیوتر و فعالیت‌های شبانه.',
      originalPrice: '۵۸۰،۰۰۰',
      discountPrice: '۴۰۶،۰۰۰',
      discount: 30,
      inStock: true,
      stockCount: 20,
      images: ['/images/B2B.webp', '/images/B2B.webp', '/images/B2B.webp', '/images/B2B.webp'],
      features: ['نور قابل تنظیم', 'پایه منعطف', 'مصرف کم', 'نور طبیعی', 'باتری داخلی', 'شارژ USB'],
      specifications: [
        { label: 'نوع لامپ', value: 'LED' },
        { label: 'قدرت نور', value: '۱۰ وات' },
        { label: 'رنگ نور', value: 'سفید، آفتابی' },
        { label: 'باتری', value: '۲۰۰۰ میلی‌آمپر' },
        { label: 'گارانتی', value: '۱۲ ماه' }
      ]
    }
  };

  // Use predefined product data if exists, otherwise generate dynamic data
  const product = products[productId] || generateProductData(productId);

  const increaseQuantity = () => {
    if (quantity < product.stockCount) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      

      <main>
        {/* Product Details Section */}
        <section className="bg-white py-8 md:py-12 lg:py-20">
          <div className="container mx-auto px-4 md:px-6" dir="rtl">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
              {/* Right Side - Images */}
              <div>
                {/* Main Image */}
                <div className="aspect-square bg-light-grey rounded-2xl md:rounded-3xl overflow-hidden shadow-xl md:shadow-2xl mb-4 md:mb-6">
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Thumbnail Images */}
                <div className="flex gap-2 md:gap-4">
                  {product.images.map((image: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square bg-light-grey rounded-2xl overflow-hidden flex-1 ${
                        selectedImage === index ? 'ring-4 ring-primary' : ''
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} - ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Left Side - Product Info */}
              <div className="text-right space-y-4 md:space-y-6">
                {/* Title */}
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-dark-blue">
                  {product.name}
                </h1>

                {/* Discount Badge */}
                {product.discount > 0 && (
                  <div className="inline-block bg-primary text-white px-4 py-1.5 md:px-6 md:py-2 rounded-full text-base md:text-lg font-bold">
                    {product.discount}% تخفیف
                  </div>
                )}

                {/* Price */}
                <div className="space-y-1 md:space-y-2">
                  {product.originalPrice && (
                    <p className="text-grey text-lg md:text-xl lg:text-2xl line-through">
                      {product.originalPrice} تومان
                    </p>
                  )}
                  <p className="text-primary text-3xl md:text-4xl lg:text-5xl font-bold">
                    {product.discountPrice} تومان
                  </p>
                </div>

                {/* Stock Status */}
                <div className="flex items-center gap-3">
                  {product.inStock ? (
                    <>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-dark-blue font-medium">
                        موجود در انبار ({product.stockCount} عدد)
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-grey font-medium">ناموجود</span>
                    </>
                  )}
                </div>

                {/* Description */}
                <div className="border-t border-light-grey pt-4 md:pt-6">
                  <h3 className="text-xl md:text-2xl font-bold text-dark-blue mb-3 md:mb-4">
                    توضیحات محصول
                  </h3>
                  <p className="text-grey text-sm md:text-base lg:text-lg leading-loose">
                    {product.description}
                  </p>
                </div>

                {/* Features */}
                <div className="border-t border-light-grey pt-4 md:pt-6">
                  <h3 className="text-xl md:text-2xl font-bold text-dark-blue mb-3 md:mb-4">
                    ویژگی‌های محصول
                  </h3>
                  <ul className="space-y-2 md:space-y-3">
                    {product.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-center gap-2 md:gap-3">
                        <svg className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-dark-blue text-sm md:text-base lg:text-lg">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4 md:gap-6 border-t border-light-grey pt-4 md:pt-6">
                  <span className="text-dark-blue font-semibold text-base md:text-lg">تعداد:</span>
                  <div className="flex items-center gap-3 md:gap-4">
                    <button
                      onClick={increaseQuantity}
                      className="w-10 h-10 md:w-12 md:h-12 bg-light-grey rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                    >
                      <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                    <span className="text-xl md:text-2xl font-bold text-dark-blue w-10 md:w-12 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={decreaseQuantity}
                      className="w-10 h-10 md:w-12 md:h-12 bg-light-grey rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                    >
                      <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button className="w-full py-4 md:py-5 bg-primary text-white text-lg md:text-xl lg:text-2xl font-bold rounded-xl md:rounded-2xl hover:bg-opacity-90 hover:scale-105 transition-all shadow-xl hover:shadow-2xl">
                  افزودن به سبد خرید
                </button>
              </div>
            </div>

            {/* Specifications Table */}
            <div className="mt-12 md:mt-16 lg:mt-20">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-dark-blue mb-6 md:mb-8 text-right">
                مشخصات فنی
              </h2>
              <div className="bg-light-mint rounded-2xl md:rounded-3xl overflow-hidden">
                <table className="w-full" dir="rtl">
                  <tbody>
                    {product.specifications.map((spec: { label: string; value: string }, index: number) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? 'bg-white' : 'bg-light-mint'}
                      >
                        <td className="px-4 md:px-6 lg:px-8 py-3 md:py-4 lg:py-5 text-dark-blue font-bold text-sm md:text-base lg:text-lg border-l-2 border-light-grey w-1/3">
                          {spec.label}
                        </td>
                        <td className="px-4 md:px-6 lg:px-8 py-3 md:py-4 lg:py-5 text-grey text-sm md:text-base lg:text-lg">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        <SpecialOffers />
      </main>

      
    </div>
  );
}
