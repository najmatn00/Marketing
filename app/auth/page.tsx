"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import api from "@/lib/apiProvider";
import { SendOtpDto, VerifyOtpDto, AuthResponse } from "@/types/api.types";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Phone, Lock } from "lucide-react";

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
  const router = useRouter();
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
      const { data: result } = await api.post<AuthResponse>(
        "/auth/otp/verify",
        payload
      );

      // Store tokens in cookies
      if (result.accessToken) {
        Cookies.set("accessToken", result.accessToken, {
          expires: 7, // 7 days
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
        });
      }

      if (result.refreshToken) {
        Cookies.set("refreshToken", result.refreshToken, {
          expires: 30, // 30 days
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
        });
      }

      setToken(result.accessToken || "ورود موفقیت آمیز بود");
      setMessage("ورود موفقیت آمیز بود!");

      // Redirect to dashboard after 1.5 seconds
      setTimeout(() => {
        if (result.user?.role === "seller") {
          router.push("/dashboard");
        } else if (result.user?.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      }, 1500);
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
    <div
      dir="rtl"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary via-background to-light-mint p-4 relative"
    >
      {/* Theme Toggle */}
      <div className="absolute top-4 left-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-light-grey dark:border-gray-700">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            {!otpScreen ? (
              <Phone className="w-8 h-8 text-text-color" />
            ) : (
              <Lock className="w-8 h-8 text-text-color" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            ورود / ثبت‌نام
          </h2>
          <p className="text-grey">
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
                className="block text-sm font-medium text-foreground mb-2"
              >
                شماره موبایل
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="مثال: ۰۹۰۲۱۲۳۴۵۶۷"
                disabled={loading}
                className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-light-grey dark:border-gray-600 text-foreground placeholder:text-grey rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                {...phoneForm.register("phone")}
              />
              {phoneForm.formState.errors.phone && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                  {phoneForm.formState.errors.phone.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-text-color font-bold py-3 px-4 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed border "
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
                className="block text-sm font-medium text-foreground mb-2"
              >
                کد تایید
              </label>
              <input
                id="otp"
                type="text"
                placeholder="کد ۴ تا ۸ رقمی"
                disabled={loading}
                className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-light-grey dark:border-gray-600 text-foreground placeholder:text-grey rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-center tracking-widest text-2xl font-bold transition-all"
                maxLength={8}
                {...otpForm.register("otp")}
              />
              {otpForm.formState.errors.otp && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                  {otpForm.formState.errors.otp.message}
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleBackToPhone}
                className="flex-1 bg-light-grey dark:bg-gray-700 hover:bg-grey dark:hover:bg-gray-600 text-foreground font-medium py-3 px-4 rounded-xl transition-all"
                disabled={loading}
              >
                بازگشت
              </button>
              <button
                type="submit"
                className="flex-1 bg-primary hover:bg-primary/90 text-text-color font-bold py-3 px-4 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? "در حال بررسی..." : "ورود"}
              </button>
            </div>
          </form>
        )}

        {message && (
          <div
            className={`mt-6 p-4 rounded-xl text-center text-sm font-medium border ${
              token
                ? "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-400 border-green-200 dark:border-green-800"
                : "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-400 border-red-200 dark:border-red-800"
            }`}
          >
            {message}
          </div>
        )}

        {token && (
          <div className="mt-4 p-4 bg-light-mint dark:bg-gray-700/50 rounded-xl border border-light-grey dark:border-gray-600">
            <p className="text-xs text-grey font-medium mb-2">Access Token:</p>
            <p className="text-xs font-mono text-foreground break-all bg-white dark:bg-gray-800 p-2 rounded-lg">
              {token}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
