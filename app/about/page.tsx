'use client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
    

      <main>
        {/* Hero Section */}
        <section className="bg-light-mint py-24">
          <div className="container mx-auto px-6" dir="rtl">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-6xl font-bold text-dark-blue mb-6">
                درباره ما
              </h1>
              <p className="text-grey text-2xl leading-relaxed">
                ما یک فروشگاه آنلاین پیشرو در ارائه بهترین محصولات با کیفیت و قیمت مناسب هستیم
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-6" dir="rtl">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Image */}
              <div className="relative">
                <div className="aspect-video bg-light-grey rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="/images/B2B.webp"
                    alt="About Us"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Text Content */}
              <div className="text-right space-y-6">
                <h2 className="text-4xl font-bold text-dark-blue">
                  ماموریت ما
                </h2>
                <p className="text-grey text-xl leading-loose">
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
                </p>
                <p className="text-grey text-xl leading-loose">
                  کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-light-mint py-20">
          <div className="container mx-auto px-6" dir="rtl">
            <h2 className="text-4xl font-bold text-dark-blue text-center mb-16">
              ارزش‌های ما
            </h2>

            <div className="grid md:grid-cols-4 gap-8">
              {/* Value 1 */}
              <div className="bg-white rounded-3xl p-8 text-center hover:shadow-xl transition-all hover:scale-105">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-dark-blue mb-3">
                  کیفیت برتر
                </h3>
                <p className="text-grey">
                  محصولات با بالاترین کیفیت
                </p>
              </div>

              {/* Value 2 */}
              <div className="bg-white rounded-3xl p-8 text-center hover:shadow-xl transition-all hover:scale-105">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-dark-blue mb-3">
                  ارسال سریع
                </h3>
                <p className="text-grey">
                  ارسال در کمتر از ۲۴ ساعت
                </p>
              </div>

              {/* Value 3 */}
              <div className="bg-white rounded-3xl p-8 text-center hover:shadow-xl transition-all hover:scale-105">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-dark-blue mb-3">
                  قیمت مناسب
                </h3>
                <p className="text-grey">
                  بهترین قیمت در بازار
                </p>
              </div>

              {/* Value 4 */}
              <div className="bg-white rounded-3xl p-8 text-center hover:shadow-xl transition-all hover:scale-105">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-dark-blue mb-3">
                  پشتیبانی ۲۴/۷
                </h3>
                <p className="text-grey">
                  همیشه در کنار شما هستیم
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-6" dir="rtl">
            <div className="grid md:grid-cols-3 gap-12 text-center">
              <div>
                <div className="text-6xl font-bold text-primary mb-4">
                  +۱۰۰۰
                </div>
                <p className="text-grey text-xl">
                  محصولات متنوع
                </p>
              </div>

              <div>
                <div className="text-6xl font-bold text-primary mb-4">
                  +۵۰۰۰
                </div>
                <p className="text-grey text-xl">
                  مشتریان راضی
                </p>
              </div>

              <div>
                <div className="text-6xl font-bold text-primary mb-4">
                  +۱۰۰
                </div>
                <p className="text-grey text-xl">
                  برند معتبر
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

    
    </div>
  );
}
