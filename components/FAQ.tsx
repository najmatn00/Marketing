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
    <section className="bg-light-mint py-24">
      <div className="container mx-auto px-6" dir="rtl">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-dark-blue mb-4">
            سوالات متداول
          </h2>
          <p className="text-grey text-lg">
            پاسخ سوالات رایج شما در اینجا
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-5xl mx-auto space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className={`bg-white rounded-3xl overflow-hidden shadow-lg transition-all duration-500 ${
                openIndex === index ? 'shadow-2xl scale-[1.02]' : 'hover:shadow-xl'
              }`}
            >
              {/* Question Button */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-8 flex items-start justify-between text-right group"
              >
                {/* Question Number Circle */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ml-6 transition-all duration-300 ${
                  openIndex === index
                    ? 'bg-primary text-white scale-110'
                    : 'bg-light-mint text-primary group-hover:scale-110'
                }`}>
                  <span className="font-bold text-lg">{index + 1}</span>
                </div>

                <span className={`text-dark-blue font-semibold text-xl flex-1 leading-relaxed transition-colors duration-300 ${
                  openIndex === index ? 'text-primary' : 'group-hover:text-primary'
                }`}>
                  {faq.question}
                </span>

                {/* Arrow Icon with Circle Background */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  openIndex === index
                    ? 'bg-primary rotate-180'
                    : 'bg-light-grey group-hover:bg-primary'
                }`}>
                  <svg
                    className={`w-5 h-5 transition-colors duration-300 ${
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
                <div className="px-8 pb-8">
                  <div className="bg-light-mint rounded-2xl p-6 mr-[4.5rem]">
                    <p className="text-dark-blue text-base leading-loose">
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
