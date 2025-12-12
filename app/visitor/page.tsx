'use client';

import { useState } from 'react';
import VisitorSidebar from '@/components/visitor/VisitorSidebar';
import { TrendingUp } from 'lucide-react';

export default function VisitorDashboardPage() {
  const [activeTab, setActiveTab] = useState('identity');

  // Fake user data (کاملاً شبیه چیزی که گفتید)
  const fakeUserData = {
    userName: "علی",         // اسم طرف
    world: "دنیای بیشتر",    // مقدار وسط
    inviteMessage: "پیام دعوت، آند کوبی" // سمت چپ
  
  };

  return (
    <div className="flex min-h-screen bg-background" dir="rtl">
      <VisitorSidebar />

      <main className="flex-1 mr-64 p-8">

        <h1 className="text-3xl font-bold text-dark-blue mb-6">دیدکلی</h1>

      

        {/* TOP INFO BOX */}
        <div className=" bg-secondary border border-grey rounded-xl p-6 mb-10 grid grid-cols-3 gap-6 text-grey">
          
          {/* LEFT */}
          <div className="flex flex-col justify-between">
            <span className=" text-foreground font-light text-[16px]"> خوش اومدی</span>
            <span className="mt-1 font-semibold text-dark-blue text-[20px]">{fakeUserData.userName}</span>
          </div>

          {/* CENTER */}
          <div className="flex flex-col text-center">
            <span className=" text-foreground font-light text-[16px]">دیتای بیشتر</span>
            <span className="mt-1 font-semibold text-dark-blue text-[20px]">{fakeUserData.world}</span>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col text-end">
            <span className=" text-foreground font-light text-[16px]">سطح کاربر ویزیتور</span>
            <span className="mt-1 font-semibold text-dark-blue text-[20px]">{fakeUserData.userName}</span>
          </div>
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="  flex flex-col gap-2 ">
            <div className="flex flex-col items-center justify-center h-[416px] border border-grey rounded-lg">
              <div className="w-24 h-24 bg-grey rounded flex items-center justify-center mb-4">
                <TrendingUp className="w-12 h-12 text-dark-blue" />
              </div>
             
            </div>
             <h3 className="text-lg font-semibold text-dark-blue">
                نمودار تعداد ورود با کدکش
              </h3>
          </div>

         <div className="  flex flex-col gap-2 ">
            <div className="flex flex-col items-center justify-center h-[416px] border border-grey rounded-lg">
              <div className="w-24 h-24 bg-grey rounded flex items-center justify-center mb-4">
                <TrendingUp className="w-12 h-12 text-dark-blue" />
              </div>
             
            </div>
             <h3 className="text-lg font-semibold text-dark-blue">
                نمودار تعداد خرید با کدکش
              </h3>
          </div>


        </div>

      </main>
    </div>
  );
}
