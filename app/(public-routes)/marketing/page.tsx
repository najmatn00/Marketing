'use client';


export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-white">
      

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-dark-blue py-12 md:py-16 lg:py-24">
          <div className="container mx-auto px-4 md:px-6" dir="rtl">
            <div className="text-center text-white max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6">
                به تیم بازاریابی ما بپیوندید
              </h1>
              <p className="text-base md:text-xl lg:text-2xl mb-6 md:mb-8 opacity-90">
                با ما درآمد داشته باشید و از مزایای ویژه بهره‌مند شوید
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-white py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 md:px-6" dir="rtl">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-dark-blue text-center mb-8 md:mb-12 lg:mb-16">
              مزایای همکاری با ما
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Benefit 1 */}
              <div className="bg-light-mint rounded-2xl md:rounded-3xl p-6 md:p-8 text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-dark-blue mb-3 md:mb-4">
                  درآمد بالا
                </h3>
                <p className="text-grey text-sm md:text-base lg:text-lg">
                  تا ۳۰٪ کمیسیون از هر فروش دریافت کنید
                </p>
              </div>

              {/* Benefit 2 */}
              <div className="bg-light-mint rounded-2xl md:rounded-3xl p-6 md:p-8 text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-dark-blue mb-3 md:mb-4">
                  ساعت کاری انعطاف‌پذیر
                </h3>
                <p className="text-grey text-sm md:text-base lg:text-lg">
                  در هر زمان و مکانی که دوست دارید کار کنید
                </p>
              </div>

              {/* Benefit 3 */}
              <div className="bg-light-mint rounded-2xl md:rounded-3xl p-6 md:p-8 text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-dark-blue mb-3 md:mb-4">
                  پشتیبانی کامل
                </h3>
                <p className="text-grey text-sm md:text-base lg:text-lg">
                  تیم پشتیبانی ما همیشه در کنار شماست
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Registration Form */}
        <section className="bg-light-mint py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 md:px-6" dir="rtl">
            <div className="max-w-2xl mx-auto bg-white rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-10 lg:p-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-dark-blue text-center mb-6 md:mb-8">
                فرم ثبت نام بازاریاب
              </h2>

              <form className="space-y-4 md:space-y-6">
                <div>
                  <label className="block text-dark-blue text-sm md:text-base font-semibold mb-2 text-right">
                    نام و نام خانوادگی
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 md:py-3 text-sm md:text-base border-2 border-light-grey rounded-xl focus:border-primary focus:outline-none text-right"
                    placeholder="نام خود را وارد کنید"
                  />
                </div>

                <div>
                  <label className="block text-dark-blue text-sm md:text-base font-semibold mb-2 text-right">
                    شماره تماس
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2.5 md:py-3 text-sm md:text-base border-2 border-light-grey rounded-xl focus:border-primary focus:outline-none text-right"
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  />
                </div>

                <div>
                  <label className="block text-dark-blue text-sm md:text-base font-semibold mb-2 text-right">
                    ایمیل
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2.5 md:py-3 text-sm md:text-base border-2 border-light-grey rounded-xl focus:border-primary focus:outline-none text-right"
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <label className="block text-dark-blue text-sm md:text-base font-semibold mb-2 text-right">
                    توضیحات (اختیاری)
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2.5 md:py-3 text-sm md:text-base border-2 border-light-grey rounded-xl focus:border-primary focus:outline-none text-right"
                    placeholder="درباره تجربیات خود بنویسید..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 md:py-4 bg-primary text-white text-base md:text-lg lg:text-xl font-bold rounded-xl hover:bg-opacity-90 hover:scale-105 transition-all shadow-lg hover:shadow-xl"
                >
                  ثبت نام
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

    
    </div>
  );
}
