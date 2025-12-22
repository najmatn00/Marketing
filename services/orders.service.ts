import api from "@/lib/apiProvider";
import { ApiResponse, Order, PaginatedOrders, OrderFilters } from "@/types/api.types";

export const ordersService = {
  /**
   * Get seller's orders with filters
   */
  async getSellerOrders(filters?: OrderFilters): Promise<PaginatedOrders> {
    const params = new URLSearchParams();

    if (filters?.page) params.append("page", filters.page.toString());
    if (filters?.limit) params.append("limit", filters.limit.toString());
    if (filters?.status) params.append("status", filters.status);
    if (filters?.paymentStatus) params.append("paymentStatus", filters.paymentStatus);
    if (filters?.sortBy) params.append("sortBy", filters.sortBy);
    if (filters?.sortOrder) params.append("sortOrder", filters.sortOrder);
    if (filters?.search) params.append("search", filters.search);

    const queryString = params.toString();
    const url = `/orders/seller-orders${queryString ? `?${queryString}` : ""}`;

    const response = await api.get<ApiResponse<PaginatedOrders>>(url);
    return response.data.data;
  },

  /**
   * Get a single order by ID
   */
  async getOrderById(id: string): Promise<Order> {
    const response = await api.get<ApiResponse<Order>>(`/orders/${id}`);
    return response.data.data;
  },

  /**
   * Update order status (seller only)
   */
  async updateOrderStatus(
    id: string,
    status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled"
  ): Promise<Order> {
    const response = await api.patch<ApiResponse<Order>>(`/orders/${id}/status`, { status });
    return response.data.data;
  },

  /**
   * Cancel an order
   */
  async cancelOrder(id: string, reason?: string): Promise<{ success: boolean; message: string }> {
    const response = await api.post<ApiResponse<{ success: boolean; message: string }>>(
      `/orders/${id}/cancel`,
      { reason }
    );
    return response.data.data;
  },
};
