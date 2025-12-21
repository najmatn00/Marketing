"use client";

import React, { useState } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import InvoicePDF, { InvoiceData } from "./InvoicePDF";
import { Download, Eye, X } from "lucide-react";

interface InvoiceViewerProps {
  data: InvoiceData;
  showPreview?: boolean;
}

export const InvoiceViewer: React.FC<InvoiceViewerProps> = ({
  data,
  showPreview = false,
}) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(showPreview);

  return (
    <div className="space-y-4">
      {/* Action Buttons */}
      <div className="flex gap-3 flex-wrap">
        <button
          onClick={() => setIsPreviewOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-text-color rounded-xl transition-all shadow-md hover:shadow-lg"
        >
          <Eye className="w-4 h-4" />
          <span className="font-medium">پیش‌نمایش فاکتور</span>
        </button>

        <PDFDownloadLink
          document={<InvoicePDF data={data} />}
          fileName={`Invoice-${data.invoiceNumber}.pdf`}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-text-color rounded-xl transition-all shadow-md hover:shadow-lg"
        >
          {({ loading }) => (
            <>
              <Download className="w-4 h-4" />
              <span className="font-medium">
                {loading ? "در حال آماده‌سازی..." : "دانلود فاکتور"}
              </span>
            </>
          )}
        </PDFDownloadLink>
      </div>

      {/* Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-5xl h-[90vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-light-grey dark:border-gray-700">
              <h3 className="text-lg font-bold text-foreground">
                پیش‌نمایش فاکتور - {data.invoiceNumber}
              </h3>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="p-2 hover:bg-light-grey dark:hover:bg-gray-700 rounded-lg transition-colors"
                aria-label="بستن"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
            </div>

            {/* PDF Viewer */}
            <div className="h-[calc(100%-4rem)]">
              <PDFViewer
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
              >
                <InvoicePDF data={data} />
              </PDFViewer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceViewer;
