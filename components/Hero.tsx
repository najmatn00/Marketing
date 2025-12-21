"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface HeroSlide {
  id: number;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  imageLink: string;
}

export default function Hero() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fake hero data - replace this with API call later
  const heroSlides: HeroSlide[] = [
    {
      id: 1,
      title: "فروش ویژه محصولات الکترونیک",
      description:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزار کاربردی می باشد",
      image: "/images/B2B.webp",
      buttonText: "مشاهده محصولات",
      buttonLink: "/products/electronics",
      imageLink: "/special-offer/1",
    },
    {
      id: 2,
      title: "تخفیفات ویژه مد و پوشاک",
      description:
        "بهترین برندهای مد و پوشاک را با قیمت های باورنکردنی تهیه کنید. کیفیت عالی و قیمت مناسب را با ما تجربه کنید.",
      image: "/images/B2B.webp",
      buttonText: "خرید کنید",
      buttonLink: "/products/fashion",
      imageLink: "/special-offer/2",
    },
    {
      id: 3,
      title: "لوازم خانگی با تخفیف",
      description:
        "تمامی لوازم خانگی مورد نیاز خود را با قیمت های استثنایی از ما بخرید. ارسال سریع و رایگان به سراسر کشور.",
      image: "/images/B2B.webp",
      buttonText: "ورود به فروشگاه",
      buttonLink: "/products/home",
      imageLink: "/special-offer/3",
    },
  ];

  const currentHero = heroSlides[currentSlide];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };

  return (
    <section className="bg-white py-12 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div
          className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center"
          dir="rtl"
        >
          {/* Left Side - Text Content */}
          <div className="space-y-4 md:space-y-6 lg:space-y-8 text-right">
            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-dark-blue leading-tight">
              {currentHero.title}
            </h1>
            <p className="text-grey text-sm md:text-base lg:text-lg font-light leading-relaxed">
              {currentHero.description}
            </p>
            <button
              onClick={() => router.push(currentHero.buttonLink)}
              className="px-6 py-3 md:px-8 md:py-3.5 lg:px-10 lg:py-4 bg-dark-blue text-text-color text-sm md:text-base lg:text-lg font-semibold rounded-xl hover:bg-opacity-90 hover:scale-105 transition-all shadow-xl hover:shadow-2xl"
            >
              {currentHero.buttonText}
            </button>
          </div>

          {/* Right Side - Image */}
          <div className="relative">
            {/* Navigation Arrows */}
            {heroSlides.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary hover:text-text-color transition-all shadow-lg group"
                >
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 text-dark-blue group-hover:text-text-color transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary hover:text-text-color transition-all shadow-lg group"
                >
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 text-dark-blue group-hover:text-text-color transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
              </>
            )}

            {/* Clickable Image */}
            <div
              onClick={() => router.push(currentHero.imageLink)}
              className="aspect-video bg-light-grey rounded-3xl flex items-center justify-center overflow-hidden shadow-2xl cursor-pointer hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 relative"
            >
              <Image
                src={currentHero.image}
                alt={currentHero.title}
                fill
                className="rounded-3xl object-cover"
              />
            </div>

            {/* Pagination Dots */}
            {heroSlides.length > 1 && (
              <div className="flex justify-center gap-3 mt-6">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "w-8 bg-primary"
                        : "w-2 bg-light-grey hover:bg-grey"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
