// API types for all backend endpoints

/** ---- AUTHENTICATION ----- */
export interface SendOtpDto {
  phone: string;
  deviceId?: string;
}

export interface VerifyOtpDto {
  phone: string;
  otp: string;
  deviceId: string;
  referralCode?: string;
}

export interface RefreshTokenDto {
  refreshToken: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface Session {
  id: string;
  deviceId: string;
  createdAt: string;
  lastActiveAt: string;
}

/** ---- SETTINGS ----- */
export interface SystemSettings {
  id: string;
  maintenanceMode: boolean;
  registrationEnabled: boolean;
  [key: string]: any;
}

export interface PointRule {
  name: string;
  points: number;
  enabled: boolean;
  description?: string;
}

export interface UpdatePointRuleDto {
  points?: number;
  enabled?: boolean;
}

export interface LevelSettings {
  level: string;
  minPoints: number;
  maxPoints: number;
  benefits: string[];
}

export interface UpdateLevelSettingsDto {
  minPoints?: number;
  maxPoints?: number;
  benefits?: string[];
}

/** ---- POINTS ----- */
export interface AwardPointsDto {
  userId: string;
  points: number;
  reason: string;
  metadata?: Record<string, any>;
}

export interface RollbackPointsDto {
  reason: string;
}

export interface PointsBalance {
  totalPoints: number;
  monthlyPoints: number;
}

export interface PointTransaction {
  id: string;
  points: number;
  reason: string;
  createdAt: string;
  metadata?: Record<string, any>;
}

export interface MonthlyPointsBreakdown {
  month: number;
  year: number;
  totalPoints: number;
  transactions: PointTransaction[];
}

/** ---- USERS ----- */
export type UserRole = 'admin' | 'manager' | 'visitor' | 'user' | 'seller';

export interface User {
  id: string;
  phone: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedUsers {
  data: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UpdateProfileDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: string;
}

/** ---- REFERRALS ----- */
export interface ReferralCode {
  code: string;
  userId: string;
  createdAt: string;
}

export interface UseReferralDto {
  code: string;
}

export interface ReferralStats {
  totalReferrals: number;
  successfulReferrals: number;
  totalPointsEarned: number;
  referredUsers: User[];
}

/** ---- LEVELS ----- */
export interface LevelInfo {
  currentLevel: string;
  currentPoints: number;
  nextLevel?: string;
  pointsToNextLevel?: number;
  benefits: string[];
}

export interface LevelHistory {
  id: string;
  level: string;
  points: number;
  changedAt: string;
}

/** ---- VISITORS ----- */
export type VisitorStatus = 'lead' | 'prospect' | 'customer';

export interface CreateVisitorDto {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  status?: VisitorStatus;
  notes?: string;
}

export interface UpdateVisitorDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  status?: VisitorStatus;
  notes?: string;
}

export interface Visitor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  status: VisitorStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedVisitors {
  data: Visitor[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface VisitorStats {
  totalVisitors: number;
  leads: number;
  prospects: number;
  customers: number;
}

/** ---- CATEGORIES ----- */
export interface CreateCategoryDto {
  name: string;
  slug?: string;
  description?: string;
  parentId?: string;
  image?: string;
  order?: number;
}

export interface UpdateCategoryDto {
  name?: string;
  slug?: string;
  description?: string;
  parentId?: string;
  image?: string;
  order?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  image?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  children?: Category[];
}

export interface PaginatedCategories {
  data: Category[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/** ---- PRODUCTS ----- */
export type ProductStatus = 'draft' | 'active' | 'inactive' | 'out_of_stock' | 'archived';

export interface CreateProductDto {
  name: string;
  slug?: string;
  description?: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  categoryId: string;
  images?: string[];
  status?: ProductStatus;
  featured?: boolean;
  tags?: string[];
  specifications?: Record<string, any>;
}

export interface UpdateProductDto {
  name?: string;
  slug?: string;
  description?: string;
  price?: number;
  compareAtPrice?: number;
  stock?: number;
  categoryId?: string;
  images?: string[];
  status?: ProductStatus;
  featured?: boolean;
  tags?: string[];
  specifications?: Record<string, any>;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  categoryId: string;
  category?: Category;
  sellerId: string;
  seller?: Seller;
  images: string[];
  status: ProductStatus;
  featured: boolean;
  tags: string[];
  specifications?: Record<string, any>;
  rating?: number;
  reviewCount?: number;
  soldCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedProducts {
  data: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/** ---- SELLERS ----- */
export interface CreateSellerDto {
  shopName: string;
  shopSlug?: string;
  description?: string;
  logo?: string;
  banner?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  taxId?: string;
}

export interface UpdateSellerDto {
  shopName?: string;
  shopSlug?: string;
  description?: string;
  logo?: string;
  banner?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  taxId?: string;
}

export interface Seller {
  id: string;
  userId: string;
  user?: User;
  shopName: string;
  shopSlug: string;
  description?: string;
  logo?: string;
  banner?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  taxId?: string;
  rating?: number;
  reviewCount?: number;
  totalSales?: number;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedSellers {
  data: Seller[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/** ---- ORDERS ----- */
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded' | 'partially_refunded';

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customer?: User;
  sellerId: string;
  seller?: Seller;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  shippingAddress?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  product?: Product;
  quantity: number;
  price: number;
  totalPrice: number;
}

export interface PaginatedOrders {
  data: Order[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SellerStats {
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  todayRevenue: number;
  totalViews?: number;
  pendingOrders?: number;
  completedOrders?: number;
}

export interface OrderFilters extends PaginationParams, SearchParams, SortParams {
  customer?: string;
  seller?: string;
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
}

/** ---- PAGINATION & FILTERS ----- */
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface SearchParams {
  search?: string;
}

export interface SortParams {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ProductFilters extends PaginationParams, SearchParams, SortParams {
  category?: string;
  seller?: string;
  status?: ProductStatus;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
}

export interface VisitorFilters extends PaginationParams, SearchParams {
  status?: VisitorStatus;
  company?: string;
}

export interface UserFilters extends PaginationParams, SearchParams {
  role?: UserRole;
}

/** ---- API RESPONSE WRAPPER ----- */
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}
