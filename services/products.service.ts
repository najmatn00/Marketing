import api from "@/lib/apiProvider";
import {
  ApiResponse,
  Product,
  PaginatedProducts,
  ProductFilters,
  CreateProductDto,
  UpdateProductDto,
} from "@/types/api.types";

export const productsService = {
  /**
   * Get all products with filters
   */
  async getProducts(filters?: ProductFilters): Promise<PaginatedProducts> {
    const params = new URLSearchParams();

    if (filters?.page) params.append("page", filters.page.toString());
    if (filters?.limit) params.append("limit", filters.limit.toString());
    if (filters?.search) params.append("search", filters.search);
    if (filters?.category) params.append("category", filters.category);
    if (filters?.seller) params.append("seller", filters.seller);
    if (filters?.status) params.append("status", filters.status);
    if (filters?.minPrice) params.append("minPrice", filters.minPrice.toString());
    if (filters?.maxPrice) params.append("maxPrice", filters.maxPrice.toString());
    if (filters?.minRating) params.append("minRating", filters.minRating.toString());
    if (filters?.sortBy) params.append("sortBy", filters.sortBy);
    if (filters?.sortOrder) params.append("sortOrder", filters.sortOrder);

    const queryString = params.toString();
    const url = `/products${queryString ? `?${queryString}` : ""}`;

    const response = await api.get<ApiResponse<PaginatedProducts>>(url);
    return response.data.data;
  },

  /**
   * Get a single product by ID
   */
  async getProductById(id: string): Promise<Product> {
    const response = await api.get<ApiResponse<Product>>(`/products/${id}`);
    return response.data.data;
  },

  /**
   * Create a new product
   */
  async createProduct(data: CreateProductDto): Promise<Product> {
    const response = await api.post<ApiResponse<Product>>("/products", data);
    return response.data.data;
  },

  /**
   * Update a product
   */
  async updateProduct(id: string, data: UpdateProductDto): Promise<Product> {
    const response = await api.patch<ApiResponse<Product>>(`/products/${id}`, data);
    return response.data.data;
  },

  /**
   * Delete a product
   */
  async deleteProduct(id: string): Promise<{ success: boolean; message: string }> {
    const response = await api.delete<ApiResponse<{ success: boolean; message: string }>>(
      `/products/${id}`
    );
    return response.data.data;
  },
};
