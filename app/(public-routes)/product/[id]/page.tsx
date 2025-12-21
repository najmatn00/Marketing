'use client';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SpecialOffers from '@/components/SpecialOffers';
import Image from 'next/image';
import Banner from '@/components/Banner';
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
  variants: { label: string; price: string }[];
  specifications: { label: string; value: string }[];
}

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);

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
      name: `عنوان محصول ${categoryName}`,
      description: `لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.`,
      originalPrice: formatPrice(basePrice),
      discountPrice: formatPrice(discountPrice),
      discount: 25,
      inStock: true,
      stockCount: 10 + (numId % 20),
      images: ['/images/B2B.webp', '/images/B2B.webp', '/images/B2B.webp', '/images/B2B.webp'],
      variants: [
        { label: 'رنگ: چوب', price: formatPrice(discountPrice) },
        { label: 'رنگ: چوب', price: formatPrice(discountPrice + 50000) }
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

  // Use dynamic data
  const product = generateProductData(productId);

  return (
    <div className="min-h-screen bg-white">
     

      <main className="container mx-auto px-4 py-4 md:py-8" dir="rtl">
        {/* Product Details Section */}
        <div className="flex flex-col md:flex-row mb-8 md:mb-12 gap-4 md:gap-6">

          <div className="w-full md:w-auto">
            <div className="flex gap-2 md:gap-4  md:flex-row-reverse flex-col ">
              {/* Vertical Thumbnail Images - Horizontal on mobile */}
              <div className="flex flex-row md:flex-col gap-2 md:gap-3 order-2 md:order-2">
                {product.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-14 h-14 md:w-20 md:h-20 bg-light-grey rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                      selectedImage === index ? 'border-primary' : 'border-transparent'
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

              {/* Main Image */}
              <div className="flex-1 relative order-1">
                <div className="w-full max-w-[530px] h-auto aspect-square bg-light-grey rounded-xl md:rounded-2xl overflow-hidden relative">
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Discount Badge */}
                  {product.discount > 0 && (
                    <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-primary text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-bold">
                      {product.discount}٪ تخفیف
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>


          <div className="w-full md:w-2/4">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-dark-blue">
                عنوان محصول
              </h1>

            <div className="flex items-center justify-center gap-2 md:gap-4">

              <button className="w-8 h-8 md:w-10 md:h-10 border border-grey rounded-lg flex items-center justify-center hover:border-primary transition-colors">
                  <Image src="/images/Vector.svg" alt="Share" width={16} height={16} className="md:w-5 md:h-5" />
              </button>
               <button className="w-8 h-8 md:w-10 md:h-10 border border-grey rounded-lg flex items-center justify-center hover:border-primary transition-colors">
                <Image src="/images/Shear.svg" alt="Favorite" width={16} height={16} className="md:w-5 md:h-5" />
              </button>
              <button className="w-8 h-8 md:w-10 md:h-10 border border-grey rounded-lg flex items-center justify-center hover:border-primary transition-colors">
               <Image src="/images/Group.svg" alt="Share" width={16} height={16} className="md:w-5 md:h-5" />
              </button>
            </div>
            </div>
            <div className="w-full h-[1px] bg-grey mb-3 md:mb-4"></div>
            <p className='text-primary hover:underline text-base md:text-lg lg:text-[20px] font-semibold mb-4 md:mb-6 inline-block'> ویژگی های محصول</p>
            {/* Variants */}
            <div className="flex flex-col md:flex-row gap-3 md:gap-6 mb-4 md:mb-6">
              {product.variants.map((variant, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedVariant(index)}
                  className={`w-full p-3 md:p-4 rounded-lg border-2 transition-all text-right ${
                    selectedVariant === index
                      ? 'border-primary bg-light-mint'
                      : 'border-light-grey bg-white hover:border-grey'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-dark-blue font-medium text-sm md:text-base">{variant.label}</span>
                    <span className="text-dark-blue font-bold text-sm md:text-base">تومان {variant.price}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* View All Features Link */}
            <a href="#specifications" className="text-primary hover:underline text-sm md:text-base lg:text-[18px] mb-4 md:mb-6 inline-block">
              مشاهده همه ویژگی‌ها
            </a>

            {/* Price Section */}
            <div className="bg-light-grey rounded-lg p-3 md:p-4 mb-4 md:mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-grey text-base md:text-lg line-through">
                  تومان {product.originalPrice}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-dark-blue text-xs md:text-sm">قیمت نهایی:</span>
                <span className="text-primary text-xl md:text-2xl font-bold">
                  تومان {product.variants[selectedVariant].price}
                </span>
              </div>
            </div>
{/* Sales Info */}
<div className="bg-white rounded-lg border border-light-grey p-3 md:p-4 mb-4 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-center gap-3 md:gap-6">
  <div className="flex items-center gap-1 justify-between w-full md:w-auto">
    <span className="text-xs md:text-sm text-grey">درصد فروش :</span>
    <span className="text-primary text-lg md:text-xl font-bold">
      {product.discount}٪
    </span>
  </div>

  <div className="flex items-center justify-between gap-1 w-full md:w-auto">
    <span className="text-xs md:text-sm text-grey">مبلغ پس از تخفیف :</span>
    <span className="text-dark-blue text-lg md:text-xl font-bold">
       {product.variants[selectedVariant].price} تومان
    </span>
  </div>
</div>

            {/* Add to Cart Button */}
            <button className="w-full py-3 md:py-4 bg-primary text-white text-base md:text-lg font-bold rounded-lg hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg">
              افزودن به محصول
            </button>


          </div>
        </div>

        {/* Product Description */}
        <div className="rounded-xl md:rounded-2xl p-4 md:p-8 mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 text-center bg-primary p-2 rounded-t-xl md:rounded-t-2xl">
            درباره محصول
          </h2>
          <p className="text-dark-blue text-right leading-relaxed md:leading-loose text-sm md:text-base">
            {product.description}
          </p>

        </div>

        {/* Specifications Section */}
        <div id="specifications" className="mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-dark-blue mb-4 md:mb-6 text-right">
            مشخصات فنی
          </h2>
          <div className="bg-light-mint rounded-xl md:rounded-2xl overflow-hidden">
            <table className="w-full">
              <tbody>
                {product.specifications.map((spec: { label: string; value: string }, index: number) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-light-mint'}
                  >
                    <td className="px-3 py-3 md:px-6 md:py-4 text-dark-blue font-bold text-right border-l-2 border-light-grey w-1/3 text-xs md:text-base">
                      {spec.label}
                    </td>
                    <td className="px-3 py-3 md:px-6 md:py-4 text-grey text-right text-xs md:text-base">
                      {spec.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Similar Products */}
        <div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-dark-blue mb-4 md:mb-6 text-right">
            محصولات مشابه
          </h2>
          <SpecialOffers />
        </div>
          <Banner />
      </main>

  
    </div>
  );
}
