"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/lib/apiProvider";
import type {
  CreateProductDto,
  Product,
  ProductStatus,
} from "@/types/api.types";
import {
  ResponsiveModal,
  ResponsiveModalBody,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "@/components/responsive-modal";

const statusValues = [
  "draft",
  "active",
  "inactive",
  "out_of_stock",
  "archived",
] as const;

const schema = z.object({
  name: z.string().min(1, "نام محصول الزامی است"),
  slug: z.string().optional(),
  description: z.string().optional(),
  price: z.coerce.number().positive("قیمت باید بزرگ‌تر از صفر باشد"),
  discountPrice: z.coerce.number().nonnegative().optional(),
  stock: z.coerce.number().int().nonnegative("موجودی نمی‌تواند منفی باشد"),
  category: z.string().min(1, "شناسه دسته‌بندی الزامی است"),
  images: z.string().optional(), // comma/newline separated
  status: z.enum(statusValues).optional(),
  isFeatured: z.boolean().optional(),
  tags: z.string().optional(), // comma separated
  specifications: z.string().optional(), // JSON string
  minOrderQuantity: z.coerce.number().int().positive().optional(),
  maxOrderQuantity: z.coerce.number().int().positive().optional(),
  sku: z.string().optional(),
  barcode: z.string().optional(),
  brand: z.string().optional(),
  metaTags: z.string().optional(), // comma separated
  metaDescription: z.string().optional(),
  freeShipping: z.boolean().optional(),
  shippingCost: z.coerce.number().nonnegative().optional(),
  weight: z.coerce.number().nonnegative().optional(),
});

// With z.coerce, Zod input types are wider than output types.
// Use input type for RHF compatibility, and parse to output type inside submit.
type FormValues = z.input<typeof schema>;
type ParsedValues = z.output<typeof schema>;

function splitList(value?: string) {
  if (!value) return undefined;
  const items = value
    .split(/[,\\n]/g)
    .map((s) => s.trim())
    .filter(Boolean);
  return items.length ? items : undefined;
}

export function CreateProductModal({
  open,
  onOpenChange,
  onCreated,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated?: (product: Product) => void;
}) {
  const [serverError, setServerError] = useState<string>("");

  const defaultValues = useMemo<FormValues>(
    () => ({
      name: "",
      slug: "",
      description: "",
      price: 0,
      discountPrice: undefined,
      stock: 0,
      category: "",
      images: "",
      status: "draft",
      isFeatured: false,
      tags: "",
      specifications: "",
      minOrderQuantity: 1,
      maxOrderQuantity: undefined,
      sku: "",
      barcode: "",
      brand: "",
      metaTags: "",
      metaDescription: "",
      freeShipping: false,
      shippingCost: 0,
      weight: 0,
    }),
    []
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const submitting = form.formState.isSubmitting;

  const submit = async (values: FormValues) => {
    setServerError("");

    const parsed = schema.parse(values) as ParsedValues;

    let specifications: Record<string, any> | undefined;
    if (parsed.specifications?.trim()) {
      try {
        specifications = JSON.parse(parsed.specifications);
      } catch {
        form.setError("specifications", {
          type: "validate",
          message: "فرمت مشخصات باید JSON معتبر باشد",
        });
        return;
      }
    }

    // Calculate discount percentage
    let discountPercentage: number | undefined;
    if (parsed.discountPrice && parsed.discountPrice < parsed.price) {
      discountPercentage = Math.round(
        ((parsed.price - parsed.discountPrice) / parsed.price) * 100
      );
    }

    const payload: any = {
      name: parsed.name,
      slug: parsed.slug?.trim() || undefined,
      description: parsed.description?.trim() || undefined,
      category: parsed.category,
      price: parsed.price,
      discountPrice: parsed.discountPrice,
      discountPercentage,
      images: splitList(parsed.images) || [],
      stock: parsed.stock,
      minOrderQuantity: parsed.minOrderQuantity || 1,
      maxOrderQuantity: parsed.maxOrderQuantity,
      sku: parsed.sku?.trim() || undefined,
      barcode: parsed.barcode?.trim() || undefined,
      brand: parsed.brand?.trim() || undefined,
      specifications: specifications || {},
      tags: splitList(parsed.tags) || [],
      status: parsed.status || "draft",
      isFeatured: !!parsed.isFeatured,
      shipping: {
        weight: parsed.weight || 0,
        dimensions: {},
        freeShipping: !!parsed.freeShipping,
        shippingCost: parsed.shippingCost || 0,
      },
      metaTags: splitList(parsed.metaTags) || [],
      metaDescription: parsed.metaDescription?.trim() || undefined,
    };

    try {
      const response = await api.post<{ data: Product }>("/products", payload);
      onCreated?.(response.data.data);
      form.reset(defaultValues);
      onOpenChange(false);
    } catch (e: any) {
      setServerError(e?.response?.data?.message || "خطا در ساخت محصول");
    }
  };

  return (
    <ResponsiveModal open={open} onOpenChange={onOpenChange}>
      <ResponsiveModalContent className="w-full md:max-w-2xl md:rounded-2xl border-0 bg-white/95 dark:bg-gray-900/95">
        <div dir="rtl" className="flex flex-col gap-4 md:gap-6">
          <ResponsiveModalHeader className="pb-0">
            <ResponsiveModalTitle>افزودن محصول جدید</ResponsiveModalTitle>
            <ResponsiveModalDescription>
              اطلاعات محصول را وارد کنید و ذخیره نمایید.
            </ResponsiveModalDescription>
          </ResponsiveModalHeader>

          <form
            onSubmit={form.handleSubmit(submit)}
            className="space-y-6 md:space-y-7"
          >
            <ResponsiveModalBody className="max-h-[68vh] md:max-h-[70vh] overflow-auto px-0 md:px-1">
              {serverError ? (
                <div className="rounded-2xl bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-200 text-sm p-4 border border-red-200/60 dark:border-red-900/40">
                  {serverError}
                </div>
              ) : null}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                <Field
                  label="نام محصول *"
                  error={form.formState.errors.name?.message}
                >
                  <input
                    className={inputClass(form.formState.errors.name)}
                    placeholder="مثلاً: لپ‌تاپ ایسوس"
                    {...form.register("name")}
                  />
                </Field>

                <Field
                  label="اسلاگ (اختیاری)"
                  error={form.formState.errors.slug?.message}
                >
                  <input
                    className={inputClass(form.formState.errors.slug)}
                    placeholder="auto-generated if empty"
                    dir="ltr"
                    {...form.register("slug")}
                  />
                </Field>
              </div>

              <Field
                label="توضیحات (اختیاری)"
                error={form.formState.errors.description?.message}
              >
                <textarea
                  className={textareaClass(form.formState.errors.description)}
                  rows={3}
                  placeholder="توضیحات کوتاه محصول..."
                  {...form.register("description")}
                />
              </Field>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                <Field
                  label="قیمت *"
                  error={form.formState.errors.price?.message}
                >
                  <input
                    className={inputClass(form.formState.errors.price)}
                    type="number"
                    min={0}
                    {...form.register("price")}
                  />
                </Field>

                <Field
                  label="قیمت با تخفیف (اختیاری)"
                  error={form.formState.errors.discountPrice?.message}
                >
                  <input
                    className={inputClass(form.formState.errors.discountPrice)}
                    type="number"
                    min={0}
                    {...form.register("discountPrice")}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                <Field
                  label="موجودی *"
                  error={form.formState.errors.stock?.message}
                >
                  <input
                    className={inputClass(form.formState.errors.stock)}
                    type="number"
                    min={0}
                    {...form.register("stock")}
                  />
                </Field>

                <Field
                  label="شناسه دسته‌بندی *"
                  error={form.formState.errors.category?.message}
                >
                  <input
                    className={inputClass(form.formState.errors.category)}
                    placeholder="507f1f77bcf86cd799439011"
                    dir="ltr"
                    {...form.register("category")}
                  />
                </Field>

                <Field
                  label="وضعیت"
                  error={form.formState.errors.status?.message}
                >
                  <select
                    className={selectClass(form.formState.errors.status)}
                    {...form.register("status")}
                  >
                    <option value="draft">پیش‌نویس</option>
                    <option value="active">فعال</option>
                    <option value="inactive">غیرفعال</option>
                    <option value="out_of_stock">ناموجود</option>
                    <option value="archived">بایگانی</option>
                  </select>
                </Field>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                <Field
                  label="برند (اختیاری)"
                  error={form.formState.errors.brand?.message}
                >
                  <input
                    className={inputClass(form.formState.errors.brand)}
                    placeholder="مثلاً: Apple"
                    {...form.register("brand")}
                  />
                </Field>

                <Field label="SKU (اختیاری)">
                  <input
                    className={inputClass(form.formState.errors.sku)}
                    placeholder="SKU123456"
                    dir="ltr"
                    {...form.register("sku")}
                  />
                </Field>

                <Field label="بارکد (اختیاری)">
                  <input
                    className={inputClass(form.formState.errors.barcode)}
                    placeholder="1234567890123"
                    dir="ltr"
                    {...form.register("barcode")}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                <Field label="حداقل تعداد سفارش">
                  <input
                    className={inputClass(form.formState.errors.minOrderQuantity)}
                    type="number"
                    min={1}
                    {...form.register("minOrderQuantity")}
                  />
                </Field>

                <Field label="حداکثر تعداد سفارش">
                  <input
                    className={inputClass(form.formState.errors.maxOrderQuantity)}
                    type="number"
                    min={1}
                    {...form.register("maxOrderQuantity")}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                <Field label="برچسب‌ها (اختیاری)" hint="با کاما جدا کنید">
                  <input
                    className={inputClass(form.formState.errors.tags)}
                    placeholder="مثلاً: لپ‌تاپ, ایسوس"
                    {...form.register("tags")}
                  />
                </Field>

                <div className="flex items-center justify-between gap-3 rounded-2xl border border-light-grey/60 dark:border-gray-700/60 px-4 py-4 bg-white/80 dark:bg-gray-900/30">
                  <div>
                    <label
                      htmlFor="isFeatured"
                      className="text-sm font-bold text-foreground"
                    >
                      محصول ویژه
                    </label>
                    <div className="text-xs text-grey mt-1">
                      نمایش بیشتر در صفحه فروشگاه
                    </div>
                  </div>
                  <input
                    id="isFeatured"
                    type="checkbox"
                    className="h-5 w-5 accent-[var(--primary)]"
                    {...form.register("isFeatured")}
                  />
                </div>
              </div>

              <Field
                label="تصاویر (اختیاری)"
                hint="URLها را با کاما یا خط جدید جدا کنید"
              >
                <textarea
                  className={textareaClass(form.formState.errors.images)}
                  rows={2}
                  placeholder={"https://...\\nhttps://..."}
                  dir="ltr"
                  {...form.register("images")}
                />
              </Field>

              <Field
                label="مشخصات (اختیاری)"
                hint='JSON مثل: {"color":"Black","storage":"256GB"}'
                error={form.formState.errors.specifications?.message}
              >
                <textarea
                  className={textareaClass(
                    form.formState.errors.specifications
                  )}
                  rows={3}
                  dir="ltr"
                  placeholder='{"key":"value"}'
                  {...form.register("specifications")}
                />
              </Field>

              <div className="border-t border-light-grey/60 dark:border-gray-700/60 pt-4 mt-2">
                <h3 className="text-sm font-bold text-foreground mb-4">اطلاعات ارسال</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                  <Field label="وزن (کیلوگرم)">
                    <input
                      className={inputClass(form.formState.errors.weight)}
                      type="number"
                      min={0}
                      step="0.01"
                      {...form.register("weight")}
                    />
                  </Field>

                  <Field label="هزینه ارسال (تومان)">
                    <input
                      className={inputClass(form.formState.errors.shippingCost)}
                      type="number"
                      min={0}
                      {...form.register("shippingCost")}
                    />
                  </Field>

                  <div className="flex items-center justify-between gap-3 rounded-2xl border border-light-grey/60 dark:border-gray-700/60 px-4 py-4 bg-white/80 dark:bg-gray-900/30">
                    <div>
                      <label
                        htmlFor="freeShipping"
                        className="text-sm font-bold text-foreground"
                      >
                        ارسال رایگان
                      </label>
                    </div>
                    <input
                      id="freeShipping"
                      type="checkbox"
                      className="h-5 w-5 accent-[var(--primary)]"
                      {...form.register("freeShipping")}
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-light-grey/60 dark:border-gray-700/60 pt-4 mt-2">
                <h3 className="text-sm font-bold text-foreground mb-4">اطلاعات سئو</h3>

                <Field label="متا تگ‌ها (اختیاری)" hint="با کاما جدا کنید">
                  <input
                    className={inputClass(form.formState.errors.metaTags)}
                    placeholder="electronics, phones"
                    dir="ltr"
                    {...form.register("metaTags")}
                  />
                </Field>

                <Field label="متا توضیحات (اختیاری)" className="mt-4">
                  <textarea
                    className={textareaClass(form.formState.errors.metaDescription)}
                    rows={2}
                    placeholder="توضیحات کوتاه برای موتورهای جستجو..."
                    {...form.register("metaDescription")}
                  />
                </Field>
              </div>
            </ResponsiveModalBody>

            <ResponsiveModalFooter className="pt-4 md:pt-2 border-t border-light-grey/60 dark:border-gray-700/60 md:border-0">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="w-full md:w-auto rounded-2xl px-5 py-3 text-sm font-medium bg-light-grey/60 dark:bg-gray-800 text-foreground hover:bg-light-grey/80 dark:hover:bg-gray-700 transition-colors"
                disabled={submitting}
              >
                انصراف
              </button>
              <button
                type="submit"
                className="w-full md:w-auto rounded-2xl px-6 py-3 text-sm font-bold bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-60"
                disabled={submitting}
              >
                {submitting ? "در حال ذخیره..." : "ذخیره محصول"}
              </button>
            </ResponsiveModalFooter>
          </form>
        </div>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}

function Field({
  label,
  hint,
  error,
  children,
  className,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cnBase("space-y-2", className || "")}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label className="text-sm font-bold text-foreground">{label}</label>
        {hint ? <span className="text-xs text-grey">{hint}</span> : null}
      </div>
      {children}
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}

function inputClass(hasError: unknown) {
  return cnBase(
    "h-12 w-full rounded-2xl border bg-white/80 dark:bg-gray-900/30 px-4 text-sm text-foreground placeholder:text-grey/70 outline-none transition-colors focus:ring-4 focus:ring-primary/10",
    hasError
      ? "border-red-300 focus:border-red-400 focus:ring-red-200/40"
      : "border-light-grey/60 dark:border-gray-700/60 focus:border-primary/60"
  );
}

function textareaClass(hasError: unknown) {
  return cnBase(
    "w-full rounded-2xl border bg-white/80 dark:bg-gray-900/30 px-4 py-3 text-sm text-foreground placeholder:text-grey/70 outline-none transition-colors focus:ring-4 focus:ring-primary/10",
    hasError
      ? "border-red-300 focus:border-red-400 focus:ring-red-200/40"
      : "border-light-grey/60 dark:border-gray-700/60 focus:border-primary/60"
  );
}

function selectClass(hasError: unknown) {
  return cnBase(
    "h-12 w-full rounded-2xl border bg-white/80 dark:bg-gray-900/30 px-3 text-sm text-foreground outline-none transition-colors focus:ring-4 focus:ring-primary/10",
    hasError
      ? "border-red-300 focus:border-red-400 focus:ring-red-200/40"
      : "border-light-grey/60 dark:border-gray-700/60 focus:border-primary/60"
  );
}

function cnBase(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
