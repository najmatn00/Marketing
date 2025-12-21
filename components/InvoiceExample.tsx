"use client";

import React from 'react';
import InvoiceViewer from './InvoiceViewer';
import { InvoiceData } from './InvoicePDF';

// Sample invoice data
const sampleInvoiceData: InvoiceData = {
  invoiceNumber: "INV-2025-000123",
  issueDate: "2025-12-21T10:30:00.000Z",
  dueDate: "2025-12-28T10:30:00.000Z",
  subtotal: 1500000,
  discount: 100000,
  tax: 135000,
  shippingCost: 50000,
  total: 1585000,
  customerInfo: {
    name: "علی احمدی",
    phone: "۰۹۱۲۳۴۵۶۷۸۹",
    email: "ali@example.com",
    address: "تهران، خیابان ولیعصر، پلاک ۱۲۳"
  },
  sellerInfo: {
    shopName: "فروشگاه بنفش",
    businessName: "شرکت فروشگاه بنفش",
    taxNumber: "TAX-987654",
    address: "تهران، سعادت آباد، پلاک ۴۵",
    phone: "۰۲۱۱۲۳۴۵۶۷۸",
    email: "support@purpleshop.ir"
  },
  items: [
    {
      productName: "هدفون بی‌سیم",
      quantity: 1,
      price: 800000,
      discount: 50000,
      total: 750000
    },
    {
      productName: "شارژر USB-C",
      quantity: 2,
      price: 350000,
      discount: 0,
      total: 700000
    }
  ],
  notes: "از خرید شما متشکریم. این فاکتور رسمی و قابل استفاده برای امور مالیاتی می‌باشد.",
  isPaid: false,
  paidAt: null,
};

/**
 * Example component showing how to use InvoiceViewer
 *
 * Usage:
 *
 * import InvoiceViewer from '@/components/InvoiceViewer';
 * import { InvoiceData } from '@/components/InvoicePDF';
 *
 * // In your component:
 * const invoiceData: InvoiceData = {
 *   // ... your invoice data
 * };
 *
 * return <InvoiceViewer data={invoiceData} />;
 */
export const InvoiceExample: React.FC = () => {
  return (
    <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-foreground mb-4">
        نمونه فاکتور فروش
      </h2>
      <p className="text-grey mb-6">
        این یک نمونه از فاکتور فروش است. می‌توانید آن را پیش‌نمایش کرده یا دانلود کنید.
      </p>

      <InvoiceViewer data={sampleInvoiceData} />

      {/* Invoice Details Preview */}
      <div className="mt-8 p-6 bg-light-mint dark:bg-gray-700 rounded-xl">
        <h3 className="text-lg font-bold text-foreground mb-4">اطلاعات فاکتور</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-grey">شماره فاکتور:</span>
            <span className="font-bold text-foreground mr-2">{sampleInvoiceData.invoiceNumber}</span>
          </div>
          <div>
            <span className="text-grey">وضعیت:</span>
            <span className={`font-bold mr-2 ${sampleInvoiceData.isPaid ? 'text-green-600' : 'text-red-600'}`}>
              {sampleInvoiceData.isPaid ? 'پرداخت شده' : 'پرداخت نشده'}
            </span>
          </div>
          <div>
            <span className="text-grey">خریدار:</span>
            <span className="font-bold text-foreground mr-2">{sampleInvoiceData.customerInfo.name}</span>
          </div>
          <div>
            <span className="text-grey">مبلغ کل:</span>
            <span className="font-bold text-primary mr-2">
              {new Intl.NumberFormat('fa-IR').format(sampleInvoiceData.total)} تومان
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceExample;
