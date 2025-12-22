"use client";

import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Register Persian font for correct RTL/Farsi rendering in PDF.
// IMPORTANT: react-pdf needs an actual font file URL; it can't use next/font variables.
Font.register({
  family: "IRANYekanXFaNum",
  fonts: [
    // NOTE: these files exist under /lib/fonts in the repo, but must be served as static assets.
    // If your Next setup doesn't serve /lib, copy these to /public/fonts and update paths accordingly.
    { src: "/fonts/IRANYekanXFaNum-Regular.ttf", fontWeight: 400 },
    { src: "/fonts/IRANYekanXFaNum-Medium.ttf", fontWeight: 500 },
    { src: "/fonts/IRANYekanXFaNum-Bold.ttf", fontWeight: 700 },
  ],
});

interface InvoiceItem {
  productName: string;
  quantity: number;
  price: number;
  discount: number;
  total: number;
}

interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
}

interface SellerInfo {
  shopName: string;
  businessName: string;
  taxNumber: string;
  address: string;
  phone: string;
  email: string;
}

export interface InvoiceData {
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  subtotal: number;
  discount: number;
  tax: number;
  shippingCost: number;
  total: number;
  customerInfo: CustomerInfo;
  sellerInfo: SellerInfo;
  items: InvoiceItem[];
  notes?: string;
  isPaid: boolean;
  paidAt?: string | null;
}

// Force LTR segments (invoice numbers, emails) inside RTL text
const LRM = "\u200E"; // Left-to-Right Mark
const RLM = "\u200F"; // Right-to-Left Mark
const ltr = (value: string) => `${LRM}${value}${LRM}`;
const rtl = (value: string) => `${RLM}${value}${RLM}`;

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#FFFFFF",
    fontFamily: "IRANYekanXFaNum",
    // Text direction only (doesn't break the flex layout like `direction`)
    writingDirection: "rtl",
  },

  // Header Section
  header: {
    marginBottom: 30,
    borderBottom: "3 solid #14A6A1",
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  companyInfo: {
    textAlign: "right",
  },
  companyName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#252B37",
    marginBottom: 5,
  },
  companyDetails: {
    fontSize: 10,
    color: "#666666",
    marginBottom: 3,
    textAlign: "right",
  },
  invoiceTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#14A6A1",
    // This block is on the left side of the header, keep it left-aligned like the mock.
    textAlign: "left",
  },
  invoiceNumber: {
    fontSize: 12,
    color: "#252B37",
    marginTop: 5,
    textAlign: "left",
  },

  // Status Badge
  statusBadge: {
    marginTop: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  paidBadge: {
    backgroundColor: "#D1FAE5",
  },
  unpaidBadge: {
    backgroundColor: "#FEE2E2",
  },
  statusText: {
    fontSize: 10,
    fontWeight: "bold",
  },
  paidText: {
    color: "#065F46",
  },
  unpaidText: {
    color: "#991B1B",
  },

  // Info Section
  infoSection: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  infoBox: {
    width: "48%",
    padding: 15,
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    border: "1 solid #E5E7EB",
  },
  infoTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#14A6A1",
    marginBottom: 10,
    textAlign: "right",
  },
  infoText: {
    fontSize: 10,
    color: "#374151",
    marginBottom: 5,
    textAlign: "right",
    lineHeight: 1.5,
  },
  infoLabel: {
    fontWeight: "bold",
    color: "#1F2937",
  },

  // Date Section
  dateSection: {
    flexDirection: "row-reverse",
    justifyContent: "flex-start",
    gap: 40,
    marginBottom: 30,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#EFF8F8",
    borderRadius: 8,
  },
  dateBox: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  dateLabel: {
    fontSize: 10,
    color: "#6B7280",
    marginLeft: 8,
  },
  dateValue: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#252B37",
  },

  // Table
  table: {
    marginBottom: 30,
  },
  tableHeader: {
    flexDirection: "row-reverse",
    backgroundColor: "#252B37",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  tableHeaderCell: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row-reverse",
    borderBottom: "1 solid #E5E7EB",
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  tableRowAlt: {
    backgroundColor: "#F9FAFB",
  },
  tableCell: {
    fontSize: 10,
    color: "#374151",
    textAlign: "center",
  },
  // Product name should read naturally RTL
  tableCellProduct: {
    textAlign: "right",
  },

  // Column widths
  col1: { width: "40%" },
  col2: { width: "15%" },
  col3: { width: "15%" },
  col4: { width: "15%" },
  col5: { width: "15%" },

  // Summary
  summarySection: {
    flexDirection: "row-reverse",
    justifyContent: "flex-start",
  },
  summaryBox: {
    width: "40%",
    marginLeft: "auto",
  },
  summaryRow: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderBottom: "1 solid #E5E7EB",
  },
  summaryLabel: {
    fontSize: 10,
    color: "#6B7280",
  },
  summaryValue: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#252B37",
  },
  totalRow: {
    backgroundColor: "#14A6A1",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginTop: 5,
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  totalValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  // Notes
  notesSection: {
    marginTop: 30,
    padding: 15,
    backgroundColor: "#FEF3C7",
    borderRadius: 8,
    border: "1 solid #FCD34D",
  },
  notesTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#92400E",
    marginBottom: 5,
    textAlign: "right",
  },
  notesText: {
    fontSize: 10,
    color: "#78350F",
    textAlign: "right",
    lineHeight: 1.5,
  },
});

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("fa-IR").format(amount);
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

export const InvoicePDF: React.FC<{ data: InvoiceData }> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>{data.sellerInfo.shopName}</Text>
            <Text style={styles.companyDetails}>
              {data.sellerInfo.businessName}
            </Text>
            <Text style={styles.companyDetails}>
              {ltr(data.sellerInfo.taxNumber)} : شماره مالیاتی
            </Text>
            <Text style={styles.companyDetails}>{data.sellerInfo.phone}</Text>
            <Text style={styles.companyDetails}>
              {ltr(data.sellerInfo.email)}
            </Text>
            <Text style={styles.companyDetails}>{data.sellerInfo.address}</Text>
          </View>

          <View>
            <Text style={styles.invoiceTitle}>فاکتور فروش</Text>
            <Text style={styles.invoiceNumber}>
              {ltr(data.invoiceNumber)} : شماره فاکتور
            </Text>
            <View
              style={[
                styles.statusBadge,
                data.isPaid ? styles.paidBadge : styles.unpaidBadge,
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  data.isPaid ? styles.paidText : styles.unpaidText,
                ]}
              >
                {data.isPaid ? "✓ پرداخت شده" : "● پرداخت نشده"}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Date Section */}
      <View style={styles.dateSection}>
        <View style={styles.dateBox}>
          <Text style={styles.dateLabel}>:تاریخ صدور</Text>
          <Text style={styles.dateValue}>{formatDate(data.issueDate)}</Text>
        </View>
        <View style={styles.dateBox}>
          <Text style={styles.dateLabel}>:تاریخ سررسید</Text>
          <Text style={styles.dateValue}>{formatDate(data.dueDate)}</Text>
        </View>
      </View>

      {/* Customer & Seller Info */}
      <View style={styles.infoSection}>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>اطلاعات خریدار</Text>
          <Text style={styles.infoText}>
            <Text style={styles.infoLabel}>:نام</Text>
            {data.customerInfo.name}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.infoLabel}>:تلفن</Text>
            {data.customerInfo.phone}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.infoLabel}>:ایمیل</Text>
            {ltr(data.customerInfo.email)}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.infoLabel}>:آدرس</Text>
            {data.customerInfo.address}
          </Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>اطلاعات فروشنده</Text>
          <Text style={styles.infoText}>
            <Text style={styles.infoLabel}>:فروشگاه</Text>
            <Text style={styles.infoText}>
              {data.sellerInfo.shopName}
            </Text>
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.infoLabel}>:آدرس</Text>
            {data.sellerInfo.address}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.infoLabel}>:تلفن</Text>
            {data.sellerInfo.phone}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.infoLabel}>:ایمیل</Text>
            {ltr(data.sellerInfo.email)}
          </Text>
        </View>
      </View>

      {/* Items Table */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderCell, styles.col1]}>نام محصول</Text>
          <Text style={[styles.tableHeaderCell, styles.col2]}>تعداد</Text>
          <Text style={[styles.tableHeaderCell, styles.col3]}>قیمت واحد</Text>
          <Text style={[styles.tableHeaderCell, styles.col4]}>تخفیف</Text>
          <Text style={[styles.tableHeaderCell, styles.col5]}>جمع</Text>
        </View>
        {data.items.map((item, index) => (
          <View
            key={index}
            style={[
              styles.tableRow,
              ...(index % 2 === 1 ? [styles.tableRowAlt] : []),
            ]}
          >
            <Text
              style={[styles.tableCell, styles.tableCellProduct, styles.col1]}
            >
              {item.productName}
            </Text>
            <Text style={[styles.tableCell, styles.col2]}>{item.quantity}</Text>
            <Text style={[styles.tableCell, styles.col3]}>
              {formatCurrency(item.price)}
            </Text>
            <Text style={[styles.tableCell, styles.col4]}>
              {formatCurrency(item.discount)}
            </Text>
            <Text style={[styles.tableCell, styles.col5]}>
              {formatCurrency(item.total)}
            </Text>
          </View>
        ))}
      </View>

      {/* Summary */}
      <View style={styles.summarySection}>
        <View style={styles.summaryBox}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>:جمع کل</Text>
            <Text style={styles.summaryValue}>
              {formatCurrency(data.subtotal)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>:تخفیف</Text>

            <Text style={styles.summaryValue}>
              {formatCurrency(data.discount)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>:مالیات</Text>
            <Text style={styles.summaryValue}>{formatCurrency(data.tax)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>:هزینه ارسال</Text>
            <Text style={styles.summaryValue}>
              {formatCurrency(data.shippingCost)}
            </Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>:مبلغ قابل پرداخت</Text>
            <Text style={styles.totalValue}>{formatCurrency(data.total)}</Text>
          </View>
        </View>
      </View>

      {/* Notes */}
      {data.notes && (
        <View style={styles.notesSection}>
          <Text style={styles.notesTitle}>یادداشت:</Text>
          <Text style={styles.notesText}>{data.notes}</Text>
        </View>
      )}
    </Page>
  </Document>
);

export default InvoicePDF;
