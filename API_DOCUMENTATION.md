# API Documentation - Ziro One Marketing Platform

## Base URL
`https://ziro-one.ir/api`

## Table of Contents
- [Authentication](#authentication)
- [Users](#users)
- [Points System](#points-system)
- [Referrals](#referrals)
- [Levels](#levels)
- [Visitors](#visitors)
- [Categories](#categories)
- [Products](#products)
- [Sellers](#sellers)
- [Orders](#orders)
- [Settings](#settings)

---

## Authentication

### Send OTP
**Endpoint:** `POST /auth/otp/send`

**Description:** Send a one-time password to the user's phone number.

**Request Body:**
```typescript
{
  phone: string;           // User's phone number (required)
  deviceId?: string;       // Device identifier (optional)
}
```

**Response:**
```typescript
{
  success: boolean;
  message: string;
}
```

---

### Verify OTP
**Endpoint:** `POST /auth/otp/verify`

**Description:** Verify the OTP and authenticate the user.

**Request Body:**
```typescript
{
  phone: string;           // User's phone number (required)
  otp: string;            // One-time password (required)
  deviceId: string;       // Device identifier (required)
  referralCode?: string;  // Optional referral code for new users
}
```

**Response:**
```typescript
{
  accessToken: string;    // JWT access token
  refreshToken: string;   // JWT refresh token
  user: {
    id: string;
    phone: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    role: 'admin' | 'manager' | 'visitor' | 'user' | 'seller';
    createdAt: string;
    updatedAt: string;
  }
}
```

---

### Refresh Token
**Endpoint:** `POST /auth/refresh`

**Description:** Refresh the access token using a valid refresh token.

**Request Body:**
```typescript
{
  refreshToken: string;   // Valid refresh token (required)
}
```

**Response:**
```typescript
{
  accessToken: string;    // New JWT access token
  refreshToken: string;   // New JWT refresh token
  user: User;
}
```

---

### Get Sessions
**Endpoint:** `GET /auth/sessions`

**Description:** Get all active sessions for the authenticated user.

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response:**
```typescript
{
  data: [
    {
      id: string;
      deviceId: string;
      createdAt: string;
      lastActiveAt: string;
    }
  ]
}
```

---

## Users

### Get Current User Profile
**Endpoint:** `GET /users/me`

**Description:** Get the authenticated user's profile.

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response:**
```typescript
{
  id: string;
  phone: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role: 'admin' | 'manager' | 'visitor' | 'user' | 'seller';
  createdAt: string;
  updatedAt: string;
}
```

---

### Update Profile
**Endpoint:** `PATCH /users/me`

**Description:** Update the authenticated user's profile.

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Request Body:**
```typescript
{
  firstName?: string;     // User's first name
  lastName?: string;      // User's last name
  email?: string;         // User's email
  avatar?: string;        // User's avatar URL
}
```

**Response:**
```typescript
{
  success: boolean;
  data: User;
}
```

---

### Get All Users (Admin)
**Endpoint:** `GET /users`

**Description:** Get a paginated list of all users.

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Query Parameters:**
```typescript
{
  page?: number;          // Page number (default: 1)
  limit?: number;         // Items per page (default: 10)
  search?: string;        // Search by name, phone, or email
  role?: 'admin' | 'manager' | 'visitor' | 'user' | 'seller';
}
```

**Response:**
```typescript
{
  data: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
```

---

### Get User by ID (Admin)
**Endpoint:** `GET /users/:id`

**Description:** Get a specific user by ID.

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response:**
```typescript
User
```

---

## Points System

### Get Points Balance
**Endpoint:** `GET /points/balance`

**Description:** Get the authenticated user's points balance.

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response:**
```typescript
{
  totalPoints: number;    // Total accumulated points
  monthlyPoints: number;  // Points earned this month
}
```

---

### Get Points History
**Endpoint:** `GET /points/history`

**Description:** Get the authenticated user's points transaction history.

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response:**
```typescript
{
  data: [
    {
      id: string;
      points: number;         // Points added/deducted (positive/negative)
      reason: string;         // Transaction reason
      createdAt: string;
      metadata?: Record<string, any>;
    }
  ]
}
```

---

### Get Monthly Breakdown
**Endpoint:** `GET /points/monthly/:year/:month`

**Description:** Get points breakdown for a specific month.

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response:**
```typescript
{
  month: number;
  year: number;
  totalPoints: number;
  transactions: PointTransaction[];
}
```

---

### Award Points (Admin)
**Endpoint:** `POST /points/award`

**Description:** Award points to a user.

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Request Body:**
```typescript
{
  userId: string;         // Target user ID (required)
  points: number;         // Points to award (required)
  reason: string;         // Reason for awarding (required)
  metadata?: Record<string, any>;
}
```

**Response:**
```typescript
{
  success: boolean;
  data: PointTransaction;
}
```

---

### Rollback Points Transaction (Admin)
**Endpoint:** `POST /points/transactions/:id/rollback`

**Description:** Rollback a specific points transaction.

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Request Body:**
```typescript
{
  reason: string;         // Reason for rollback (required)
}
```

**Response:**
```typescript
{
  success: boolean;
  message: string;
}
```

---

## Referrals

### Get My Referral Code
**Endpoint:** `GET /referrals/my-code`

**Description:** Get the authenticated user's referral code.

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response:**
```typescript
{
  code: string;           // Unique referral code
  userId: string;
  createdAt: string;
}
```

---

### Use Referral Code
**Endpoint:** `POST /referrals/use`

**Description:** Use a referral code (during registration).

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Request Body:**
```typescript
{
  code: string;           // Referral code (required)
}
```

**Response:**
```typescript
{
  success: boolean;
  message: string;
}
```

---

### Get Referral Stats
**Endpoint:** `GET /referrals/stats`

**Description:** Get referral statistics for the authenticated user.

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response:**
```typescript
{
  totalReferrals: number;        // Total users referred
  successfulReferrals: number;   // Active referred users
  totalPointsEarned: number;     // Points earned from referrals
  referredUsers: User[];         // List of referred users
}
```

---

## Levels

### Get My Level Info
**Endpoint:** `GET /levels/me`

**Description:** Get the authenticated user's current level information.

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response:**
```typescript
{
  currentLevel: string;          // Current level name
  currentPoints: number;         // Current points total
  nextLevel?: string;            // Next level name
  pointsToNextLevel?: number;    // Points needed for next level
  benefits: string[];            // Current level benefits
}
```

---

### Get Level History
**Endpoint:** `GET /levels/history`

**Description:** Get the authenticated user's level history.

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response:**
```typescript
{
  data: [
    {
      id: string;
      level: string;
      points: number;
      changedAt: string;
    }
  ]
}
```

---

## Visitors

### Create Visitor
**Endpoint:** `POST /visitors`

**Description:** Create a new visitor/lead record.

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Request Body:**
```typescript
{
  firstName: string;              // Required
  lastName: string;               // Required
  email: string;                  // Required
  phone?: string;
  company?: string;
  status?: 'lead' | 'prospect' | 'customer';
  notes?: string;
}
```

**Response:**
```typescript
{
  success: boolean;
  data: Visitor;
}
```

---

### Get All Visitors
**Endpoint:** `GET /visitors`

**Description:** Get a paginated list of visitors.

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Query Parameters:**
```typescript
{
  page?: number;
  limit?: number;
  search?: string;               // Search by name, email, or phone
  status?: 'lead' | 'prospect' | 'customer';
  company?: string;
}
```

**Response:**
```typescript
{
  data: Visitor[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
```

---

### Get Visitor by ID
**Endpoint:** `GET /visitors/:id`

**Description:** Get a specific visitor by ID.

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response:**
```typescript
Visitor
```

---

### Update Visitor
**Endpoint:** `PATCH /visitors/:id`

**Description:** Update a visitor's information.

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Request Body:**
```typescript
{
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  status?: 'lead' | 'prospect' | 'customer';
  notes?: string;
}
```

**Response:**
```typescript
{
  success: boolean;
  data: Visitor;
}
```

---

### Delete Visitor
**Endpoint:** `DELETE /visitors/:id`

**Description:** Delete a visitor.

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response:**
```typescript
{
  success: boolean;
  message: string;
}
```

---

### Get Visitor Statistics
**Endpoint:** `GET /visitors/stats`

**Description:** Get visitor statistics.

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response:**
```typescript
{
  totalVisitors: number;
  leads: number;
  prospects: number;
  customers: number;
}
```

---

## Categories

### Create Category
**Endpoint:** `POST /categories`

**Description:** Create a new product category.

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Request Body:**
```typescript
{
  name: string;                  // Required
  slug?: string;                 // Auto-generated if not provided
  description?: string;
  parentId?: string;             // For subcategories
  image?: string;
  order?: number;
}
```

**Response:**
```typescript
{
  success: boolean;
  data: Category;
}
```

---

### Get All Categories
**Endpoint:** `GET /categories`

**Description:** Get a paginated list of categories.

**Query Parameters:**
```typescript
{
  page?: number;
  limit?: number;
  search?: string;
}
```

**Response:**
```typescript
{
  data: Category[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
```

---

### Get Category by ID
**Endpoint:** `GET /categories/:id`

**Description:** Get a specific category with its subcategories.

**Response:**
```typescript
{
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  image?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  children?: Category[];         // Subcategories
}
```

---

### Update Category
**Endpoint:** `PATCH /categories/:id`

**Description:** Update a category.

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Request Body:**
```typescript
{
  name?: string;
  slug?: string;
  description?: string;
  parentId?: string;
  image?: string;
  order?: number;
}
```

**Response:**
```typescript
{
  success: boolean;
  data: Category;
}
```

---

### Delete Category
**Endpoint:** `DELETE /categories/:id`

**Description:** Delete a category.

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response:**
```typescript
{
  success: boolean;
  message: string;
}
```

---

## Products

### Create Product
**Endpoint:** `POST /products`

**Description:** Create a new product (Seller only).

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Request Body:**
```typescript
{
  name: string;                  // Required
  slug?: string;                 // Auto-generated if not provided
  description?: string;
  price: number;                 // Required
  compareAtPrice?: number;       // Original price for discounts
  stock: number;                 // Required
  categoryId: string;            // Required
  images?: string[];
  status?: 'draft' | 'active' | 'inactive' | 'out_of_stock' | 'archived';
  featured?: boolean;
  tags?: string[];
  specifications?: Record<string, any>;
}
```

**Response:**
```typescript
{
  success: boolean;
  data: Product;
}
```

---

### Get All Products
**Endpoint:** `GET /products`

**Description:** Get a paginated list of products with filters.

**Query Parameters:**
```typescript
{
  page?: number;
  limit?: number;
  search?: string;               // Search by name or description
  category?: string;             // Category ID
  seller?: string;               // Seller ID
  status?: 'draft' | 'active' | 'inactive' | 'out_of_stock' | 'archived';
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sortBy?: string;               // e.g., 'price', 'createdAt', 'rating'
  sortOrder?: 'asc' | 'desc';
}
```

**Response:**
```typescript
{
  data: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
```

---

### Get Product by ID
**Endpoint:** `GET /products/:id`

**Description:** Get detailed product information.

**Response:**
```typescript
{
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
```

---

### Update Product
**Endpoint:** `PATCH /products/:id`

**Description:** Update a product (Seller only - own products).

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Request Body:**
```typescript
{
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
```

**Response:**
```typescript
{
  success: boolean;
  data: Product;
}
```

---

### Delete Product
**Endpoint:** `DELETE /products/:id`

**Description:** Delete a product (Seller only - own products).

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response:**
```typescript
{
  success: boolean;
  message: string;
}
```

---

## Sellers

### Create Seller Profile
**Endpoint:** `POST /sellers`

**Description:** Create a seller profile for the authenticated user.

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Request Body:**
```typescript
{
  shopName: string;              // Required
  shopSlug?: string;             // Auto-generated if not provided
  description?: string;
  logo?: string;
  banner?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  taxId?: string;
}
```

**Response:**
```typescript
{
  success: boolean;
  data: Seller;
}
```

---

### Get My Seller Profile
**Endpoint:** `GET /sellers/me`

**Description:** Get the authenticated seller's profile.

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response:**
```typescript
Seller
```

---

### Get All Sellers
**Endpoint:** `GET /sellers`

**Description:** Get a paginated list of sellers.

**Query Parameters:**
```typescript
{
  page?: number;
  limit?: number;
  search?: string;               // Search by shop name
}
```

**Response:**
```typescript
{
  data: Seller[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
```

---

### Get Seller by ID
**Endpoint:** `GET /sellers/:id`

**Description:** Get detailed seller information.

**Response:**
```typescript
{
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
```

---

### Update Seller Profile
**Endpoint:** `PATCH /sellers/me`

**Description:** Update the authenticated seller's profile.

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Request Body:**
```typescript
{
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
```

**Response:**
```typescript
{
  success: boolean;
  data: Seller;
}
```

---

### Get Seller Statistics
**Endpoint:** `GET /sellers/me/stats`

**Description:** Get statistics for the authenticated seller.

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response:**
```typescript
{
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  todayRevenue: number;
  totalViews?: number;
  pendingOrders?: number;
  completedOrders?: number;
}
```

---

## Orders

### Create Order
**Endpoint:** `POST /orders`

**Description:** Create a new order.

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Request Body:**
```typescript
{
  items: [
    {
      productId: string;
      quantity: number;
    }
  ];
  shippingAddress?: string;
}
```

**Response:**
```typescript
{
  success: boolean;
  data: Order;
}
```

---

### Get My Orders (Customer)
**Endpoint:** `GET /orders/my-orders`

**Description:** Get orders for the authenticated customer.

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Query Parameters:**
```typescript
{
  page?: number;
  limit?: number;
  status?: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  paymentStatus?: 'pending' | 'paid' | 'failed' | 'refunded' | 'partially_refunded';
}
```

**Response:**
```typescript
{
  data: Order[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
```

---

### Get Seller Orders
**Endpoint:** `GET /orders/seller-orders`

**Description:** Get orders for the authenticated seller.

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Query Parameters:**
```typescript
{
  page?: number;
  limit?: number;
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
```

**Response:**
```typescript
{
  data: Order[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
```

---

### Get Order by ID
**Endpoint:** `GET /orders/:id`

**Description:** Get detailed order information.

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response:**
```typescript
{
  id: string;
  orderNumber: string;
  customerId: string;
  customer?: User;
  sellerId: string;
  seller?: Seller;
  items: [
    {
      id: string;
      productId: string;
      product?: Product;
      quantity: number;
      price: number;
      totalPrice: number;
    }
  ];
  totalAmount: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  shippingAddress?: string;
  createdAt: string;
  updatedAt: string;
}
```

---

### Update Order Status (Seller)
**Endpoint:** `PATCH /orders/:id/status`

**Description:** Update order status (Seller only - own orders).

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Request Body:**
```typescript
{
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}
```

**Response:**
```typescript
{
  success: boolean;
  data: Order;
}
```

---

### Cancel Order
**Endpoint:** `POST /orders/:id/cancel`

**Description:** Cancel an order (Customer or Seller).

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Request Body:**
```typescript
{
  reason?: string;
}
```

**Response:**
```typescript
{
  success: boolean;
  message: string;
}
```

---

## Settings

### Get System Settings (Admin)
**Endpoint:** `GET /settings/system`

**Description:** Get system-wide settings.

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response:**
```typescript
{
  id: string;
  maintenanceMode: boolean;
  registrationEnabled: boolean;
  [key: string]: any;
}
```

---

### Update System Settings (Admin)
**Endpoint:** `PATCH /settings/system`

**Description:** Update system-wide settings.

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Request Body:**
```typescript
{
  maintenanceMode?: boolean;
  registrationEnabled?: boolean;
  [key: string]: any;
}
```

**Response:**
```typescript
{
  success: boolean;
  data: SystemSettings;
}
```

---

### Get Point Rules (Admin)
**Endpoint:** `GET /settings/points/rules`

**Description:** Get all point rules.

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response:**
```typescript
{
  data: [
    {
      name: string;
      points: number;
      enabled: boolean;
      description?: string;
    }
  ]
}
```

---

### Update Point Rule (Admin)
**Endpoint:** `PATCH /settings/points/rules/:name`

**Description:** Update a specific point rule.

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Request Body:**
```typescript
{
  points?: number;
  enabled?: boolean;
}
```

**Response:**
```typescript
{
  success: boolean;
  data: PointRule;
}
```

---

### Get Level Settings (Admin)
**Endpoint:** `GET /settings/levels`

**Description:** Get all level settings.

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response:**
```typescript
{
  data: [
    {
      level: string;
      minPoints: number;
      maxPoints: number;
      benefits: string[];
    }
  ]
}
```

---

### Update Level Settings (Admin)
**Endpoint:** `PATCH /settings/levels/:level`

**Description:** Update settings for a specific level.

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Request Body:**
```typescript
{
  minPoints?: number;
  maxPoints?: number;
  benefits?: string[];
}
```

**Response:**
```typescript
{
  success: boolean;
  data: LevelSettings;
}
```

---

## Common Response Formats

### Success Response
```typescript
{
  data: T;                       // Response data (type varies)
  message?: string;              // Optional success message
  success: true;
}
```

### Error Response
```typescript
{
  message: string;               // Error message
  statusCode: number;            // HTTP status code
  error?: string;                // Error type (e.g., 'Bad Request')
}
```

---

## HTTP Status Codes

- `200` - OK: Successful request
- `201` - Created: Resource successfully created
- `400` - Bad Request: Invalid request parameters
- `401` - Unauthorized: Missing or invalid authentication
- `403` - Forbidden: Insufficient permissions
- `404` - Not Found: Resource not found
- `409` - Conflict: Resource conflict (e.g., duplicate email)
- `422` - Unprocessable Entity: Validation error
- `500` - Internal Server Error: Server error

---

## Authentication

Most endpoints require authentication using JWT tokens. Include the access token in the Authorization header:

```
Authorization: Bearer {accessToken}
```

When the access token expires, use the refresh token endpoint to obtain a new one.

---

## Pagination

All list endpoints support pagination with the following query parameters:

- `page` (default: 1) - Page number
- `limit` (default: 10) - Items per page

Pagination response format:
```typescript
{
  data: T[];                     // Array of items
  total: number;                 // Total items count
  page: number;                  // Current page
  limit: number;                 // Items per page
  totalPages: number;            // Total pages
}
```

---

## Search & Filtering

List endpoints support search and filtering:

- `search` - Search by relevant fields (name, email, phone, etc.)
- Entity-specific filters (status, role, category, etc.)

---

## Sorting

Many list endpoints support sorting:

- `sortBy` - Field to sort by (e.g., 'createdAt', 'price', 'name')
- `sortOrder` - Sort direction: 'asc' or 'desc'

---

## Rate Limiting

API rate limits may apply. Check response headers for rate limit information:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640000000
```

---

## Notes

1. All timestamps are in ISO 8601 format
2. All monetary values are in the smallest currency unit (e.g., cents)
3. Roles hierarchy: admin > manager > seller > user > visitor
4. Sellers can only manage their own products and orders
5. Admin and manager roles have access to all management endpoints

---

Generated: 2025-12-22
