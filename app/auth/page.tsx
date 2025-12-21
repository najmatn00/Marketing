"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import api from "@/lib/apiProvider";
import { SendOtpDto, VerifyOtpDto } from "@/types/api.types";

// Form schemas
const phoneSchema = z.object({
  phone: z
    .string()
    .min(11, "شماره موبایل معتبر وارد کنید")
    .regex(/^09\d{9}$/, "شماره موبایل باید با ۰۹ شروع شود و ۱۱ رقم باشد"),
});

const otpSchema = z.object({
  otp: z
    .string()
    .min(4, "کد حداقل ۴ رقم")
    .max(8, "کد حداکثر ۸ رقم")
    .regex(/^\d+$/, "کد فقط شامل اعداد باشد"),
});

type PhoneForm = z.infer<typeof phoneSchema>;
type OtpForm = z.infer<typeof otpSchema>;

export default function AuthPage() {
  const [otpScreen, setOtpScreen] = useState(false);
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [phoneValue, setPhoneValue] = useState("");
  const [deviceId] = useState(() =>
    typeof window !== "undefined" ? window.navigator.userAgent : "test-dev"
  );

  // Phone form
  const phoneForm = useForm<PhoneForm>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone: "" },
  });

  // OTP form
  const otpForm = useForm<OtpForm>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  async function handleSendOtp(data: PhoneForm) {
    setLoading(true);
    setMessage("");
    try {
      // Convert 09xxxxxxxxx to +989xxxxxxxxx
      const internationalPhone = data.phone.replace(/^0/, "+98");
      const payload: SendOtpDto = { phone: internationalPhone, deviceId };
      await api.post("/auth/otp/send", payload);
      setOtpScreen(true);
      setPhoneValue(internationalPhone);
      setMessage("کد تایید برای شماره موبایل شما ارسال شد.");
    } catch (error: any) {
      setMessage(error?.response?.data?.message || "خطایی در ارسال کد رخ داد!");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOtp(data: OtpForm) {
    setLoading(true);
    setMessage("");
    try {
      const payload: VerifyOtpDto = {
        phone: phoneValue,
        otp: data.otp,
        deviceId,
      };
      const { data: result } = await api.post("/auth/otp/verify", payload);
      setToken(result.accessToken || "ورود موفقیت آمیز بود");
      setMessage("ورود موفقیت آمیز بود!");
    } catch (error: any) {
      setMessage(error?.response?.data?.message || "کد وارد شده صحیح نیست!");
    } finally {
      setLoading(false);
    }
  }

  const handleBackToPhone = () => {
    setOtpScreen(false);
    setMessage("");
    otpForm.reset();
  };

  return (
    <div dir="rtl" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            ورود / ثبت‌نام
          </h2>
          <p className="text-gray-600">
            {!otpScreen
              ? "شماره موبایل خود را وارد کنید"
              : `کد تایید ارسال شده به ${phoneValue} را وارد کنید`}
          </p>
        </div>

        {!otpScreen ? (
          <form
            onSubmit={phoneForm.handleSubmit(handleSendOtp)}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                شماره موبایل
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="مثال: ۰۹۰۲۱۲۳۴۵۶۷"
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                {...phoneForm.register("phone")}
              />
              {phoneForm.formState.errors.phone && (
                <p className="text-sm text-red-600 mt-1">
                  {phoneForm.formState.errors.phone.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "در حال ارسال..." : "دریافت کد تایید"}
            </button>
          </form>
        ) : (
          <form
            onSubmit={otpForm.handleSubmit(handleVerifyOtp)}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                کد تایید
              </label>
              <input
                id="otp"
                type="text"
                placeholder="کد ۴ تا ۸ رقمی"
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center tracking-widest"
                maxLength={8}
                {...otpForm.register("otp")}
              />
              {otpForm.formState.errors.otp && (
                <p className="text-sm text-red-600 mt-1">
                  {otpForm.formState.errors.otp.message}
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleBackToPhone}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors"
                disabled={loading}
              >
                بازگشت
              </button>
              <button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? "در حال بررسی..." : "ورود"}
              </button>
            </div>
          </form>
        )}

        {message && (
          <div
            className={`mt-6 p-3 rounded-lg text-center text-sm font-medium ${
              token
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {message}
          </div>
        )}

        {token && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-600 font-medium mb-1">
              Access Token:
            </p>
            <p className="text-xs font-mono text-gray-800 break-all">{token}</p>
          </div>
        )}
      </div>
    </div>
  );
}
