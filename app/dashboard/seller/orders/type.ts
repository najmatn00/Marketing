interface OrderItem {
  productName: string;
  quantity: number;
  price: number;
  discount: number;
  total: number;
}

interface Order {
  id: string;
  orderNumber: string;
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  tax: number;
  shippingCost: number;
  total: number;
  status:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;
}
