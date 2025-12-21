"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Pencil, Upload } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";

type FormData = {
  name: string;
  city: string;
  shopName: string;
  instagram: string;
  description: string;
  profileImage: File | null;
};

export default function AdminBoothSettingsPage() {
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      city: "",
      shopName: "",
      instagram: "",
      description: "",
      profileImage: null,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("SUBMIT DATA:", data);
    // این‌جا می‌تونی API ارسال کنی
  };

  const handleImageChange = (file?: File) => {
    if (!file) return;

    // پیش‌نمایش عکس
    const url = URL.createObjectURL(file);
    setPreview(url);

    // مقدار عکس رو در فرم ذخیره کن
    setValue("profileImage", file, { shouldValidate: true });
  };

  return (
    <div className="flex min-h-screen bg-background" dir="rtl">
      <AdminSidebar />

      <main className="flex-1 mr-64 p-8">
        <h1 className="text-3xl font-bold text-dark-blue mb-10">
          تنظیمات غرفه شما
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Profile Upload */}
          <div className="flex flex-col items-center mb-10">
            <label
              htmlFor="profile-upload"
              className="w-40 h-40 rounded-lg bg-grey overflow-hidden flex items-center justify-center cursor-pointer"
            >
              {preview ? (
                <img
                  src={preview}
                  className="w-full h-full object-cover"
                  alt="profile"
                />
              ) : (
                <Upload className="w-10 h-10 text-grey" />
              )}
            </label>

            <input
              type="file"
              id="profile-uploa border-greyd"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageChange(e.target.files?.[0])}
            />

            <div
              className="flex items-center gap-2 mt-3 text-dark-blue cursor-pointer"
              onClick={() => document.getElementById("profile-upload")?.click()}
            >
              <Pencil className="w-4 h-4" />
              <span className="text-sm text-dark-blue">تغییر پروفایل</span>
            </div>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center gap-4 mb-10">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="w-6 h-6 rounded-full bg-grey"></div>
            ))}
          </div>

          {/* Form */}
          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-2 gap-5 mb-5">
              {/* name */}
              <div className="flex flex-col">
                <label className="mb-2 text-dark-blue">تغییر نام:</label>
                <input
                  {...register("name", { required: "نام لازم است" })}
                  className="border border-grey rounded px-4 py-2"
                  placeholder="نام"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* city */}
              <div className="flex flex-col">
                <label className="mb-2 text-transparent">.</label>
                <input
                  {...register("city", { required: "شهر لازم است" })}
                  className="border border-grey rounded px-4 py-2"
                  placeholder="شهر"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.city.message}
                  </p>
                )}
              </div>

              {/* shop name */}
              <div className="flex flex-col col-span-2">
                <label className="mb-2 text-dark-blue  ">نام فروشگاه</label>
                <input
                  {...register("shopName", { required: true })}
                  className="border border-grey rounded px-4 py-2"
                  placeholder="نام فروشگاه"
                />
              </div>

              {/* instagram */}
              <div className="flex flex-col col-span-2">
                <label className="mb-2 text-dark-blue  ">
                  آی دی اینستاگرام:
                </label>
                <input
                  {...register("instagram")}
                  className="border border-grey rounded px-4 py-2"
                  placeholder="@example"
                />
              </div>

              {/* description */}
              <div className="flex flex-col col-span-2">
                <label className="mb-2 text-dark-blue  ">توضیحات غرفه:</label>
                <textarea
                  {...register("description")}
                  className="border border-grey rounded px-4 py-2"
                  rows={3}
                  placeholder="متن توضیحات..."
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-center gap-6 mt-8">
              <button
                type="submit"
                className="px-12 py-3 bg-primary text-text-color rounded-lg text-lg font-semibold"
              >
                تایید
              </button>
              <button
                type="button"
                className="px-12 py-3 border-2 border-primary text-dark-blue rounded-lg text-lg font-semibold"
              >
                انصراف
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
