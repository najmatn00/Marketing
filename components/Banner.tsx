"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Banner() {
  const router = useRouter();

  // Fake banner data - replace this with API call later
  const banners = [
    {
      id: 1,
      title: "بنر برای جذب بازاریاب",
      subtitle: "به تیم ما بپیوندید و درآمد داشته باشید",
      buttonText: "اطلاعات بیشتر",
      link: "/marketing",
      bgColor: "bg-grey",
      image: "/images/B2B.webp",
    },
    {
      id: 2,
      title: "فروش ویژه محصولات",
      subtitle: "تخفیفات باورنکردنی تا ۵۰ درصد",
      buttonText: "مشاهده محصولات",
      link: "/offers",
      bgColor: "bg-primary",
      image: "/images/B2B.webp",
    },
    {
      id: 3,
      title: "ارسال رایگان",
      subtitle: "برای خریدهای بالای ۵۰۰ هزار تومان",
      buttonText: "خرید کنید",
      link: "/shop",
      bgColor: "bg-dark-blue",
      image: "/images/B2B.webp",
    },
  ];

  return (
    <section className="bg-white py-6 md:py-10">
      <div className="container mx-auto px-4 md:px-6" dir="rtl">
        {/* Main Banner */}
        <div
          className="relative bg-grey rounded-2xl md:rounded-[2rem] overflow-hidden min-h-[180px] md:min-h-[200px] shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          onClick={() => router.push(banners[0].link)}
        >
          {/* Background Image */}
          <img
            src={banners[0].image}
            alt={banners[0].title}
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />

          {/* Content Overlay */}
          <div className="relative z-10 p-6 md:p-10 lg:p-12 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-text-color mb-3 md:mb-4">
                {banners[0].title}
              </h2>
              {banners[0].subtitle && (
                <p className="text-text-color text-sm md:text-lg lg:text-xl mb-4 md:mb-6 opacity-90">
                  {banners[0].subtitle}
                </p>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(banners[0].link);
                }}
                className="px-6 py-2.5 md:px-8 md:py-3 bg-white text-dark-blue text-sm md:text-base font-bold rounded-xl hover:bg-light-mint hover:text-primary transition-all shadow-md hover:shadow-lg"
              >
                {banners[0].buttonText}
              </button>
            </div>
          </div>
        </div>

        {/* Optional: Multiple smaller banners */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {banners.slice(1).map((banner) => (
            <div
              key={banner.id}
              onClick={() => router.push(banner.link)}
              className={`${banner.bgColor} rounded-2xl p-8 cursor-pointer hover:scale-105 transition-transform duration-300 shadow-lg`}
            >
              <h3 className="text-2xl font-bold text-text-color mb-3">
                {banner.title}
              </h3>
              <p className="text-text-color opacity-90 mb-4">
                {banner.subtitle}
              </p>
              <span className="text-text-color font-semibold underline">
                {banner.buttonText}
              </span>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
}
