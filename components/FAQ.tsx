'use client';
import React, { useState } from 'react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Fake FAQ data - replace this with API call later
  const faqs: FAQItem[] = [
    {
      id: 1,
      question: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است',
      answer: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.'
    },
    {
      id: 2,
      question: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است',
      answer: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.'
    },
    {
      id: 3,
      question: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است',
      answer: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.'
    },
    {
      id: 4,
      question: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است',
      answer: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.'
    },
    {
      id: 5,
      question: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است',
      answer: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-light-mint py-12 md:py-16 lg:py-24">
      <div className="container mx-auto px-4 md:px-6" dir="rtl">
        {/* Title */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-dark-blue mb-3 md:mb-4">
            سوالات متداول
          </h2>
          <p className="text-grey text-sm md:text-base lg:text-lg">
            پاسخ سوالات رایج شما در اینجا
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-5xl mx-auto space-y-4 md:space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className={`bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-lg transition-all duration-500 ${
                openIndex === index ? 'shadow-2xl scale-[1.02]' : 'hover:shadow-xl'
              }`}
            >
              {/* Question Button */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-4 md:p-6 lg:p-8 flex items-start justify-between text-right group"
              >
                {/* Question Number Circle */}
                <div className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center ml-3 md:ml-6 transition-all duration-300 ${
                  openIndex === index
                    ? 'bg-primary text-white scale-110'
                    : 'bg-light-mint text-primary group-hover:scale-110'
                }`}>
                  <span className="font-bold text-base md:text-lg">{index + 1}</span>
                </div>

                <span className={`text-dark-blue font-semibold text-sm md:text-lg lg:text-xl flex-1 leading-relaxed transition-colors duration-300 ${
                  openIndex === index ? 'text-primary' : 'group-hover:text-primary'
                }`}>
                  {faq.question}
                </span>

                {/* Arrow Icon with Circle Background */}
                <div className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  openIndex === index
                    ? 'bg-primary rotate-180'
                    : 'bg-light-grey group-hover:bg-primary'
                }`}>
                  <svg
                    className={`w-4 h-4 md:w-5 md:h-5 transition-colors duration-300 ${
                      openIndex === index ? 'text-white' : 'text-dark-blue group-hover:text-white'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              {/* Answer - Expandable */}
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-4 md:px-6 lg:px-8 pb-4 md:pb-6 lg:pb-8">
                  <div className="bg-light-mint rounded-2xl p-4 md:p-6 mr-0 md:mr-[4.5rem]">
                    <p className="text-dark-blue text-sm md:text-base leading-loose">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
