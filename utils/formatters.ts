/**
 * Format number to Persian locale
 */
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("fa-IR").format(num);
};

/**
 * Format currency with Toman suffix
 */
export const formatCurrency = (amount: number): string => {
  return `${formatNumber(amount)} تومان`;
};

/**
 * Format date to Persian locale
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

/**
 * Get Persian label for order status
 */
export const getStatusLabel = (status: string): string => {
  const statusMap: Record<string, string> = {
    pending: "در انتظار تایید",
    confirmed: "تایید شده",
    processing: "در حال پردازش",
    shipped: "ارسال شده",
    delivered: "تحویل داده شده",
    cancelled: "لغو شده",
    refunded: "بازگشت داده شده",
  };
  return statusMap[status] || status;
};

/**
 * Get CSS classes for order status badge
 */
export const getStatusColor = (status: string): string => {
  const colorMap: Record<string, string> = {
    pending: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400",
    confirmed: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400",
    processing: "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400",
    shipped: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-400",
    delivered: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400",
    cancelled: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400",
    refunded: "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400",
  };
  return colorMap[status] || "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200";
}

/**
 * Get Persian label for product status
 */
export const getProductStatusLabel = (status: string): string => {
  const statusMap: Record<string, string> = {
    draft: "پیش‌نویس",
    active: "فعال",
    inactive: "غیرفعال",
    out_of_stock: "ناموجود",
    archived: "بایگانی شده",
  };
  return statusMap[status] || status;
};

/**
 * Get CSS classes for product status badge
 */
export const getProductStatusColor = (status: string): string => {
  const colorMap: Record<string, string> = {
    draft: "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200",
    active: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400",
    inactive: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400",
    out_of_stock: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400",
    archived: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400",
  };
  return colorMap[status] || "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200";
};
