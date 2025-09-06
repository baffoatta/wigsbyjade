import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

// Initialize WooCommerce REST API
// Note: For server-side rendering, we can use the consumer secret safely
// For client-side operations, you might want to use a JWT token or different authentication method
const consumerKey = process.env.NEXT_PUBLIC_WC_CONSUMER_KEY || "";
const consumerSecret = process.env.WC_CONSUMER_SECRET || process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET || "";

// Debug logging (remove in production)
console.log("WooCommerce API Config:", {
  url: "https://bcms.wigsbyjade.com",
  consumerKey: consumerKey ? `${consumerKey.substring(0, 10)}...` : "MISSING",
  consumerSecret: consumerSecret ? `${consumerSecret.substring(0, 10)}...` : "MISSING",
  hasKey: !!consumerKey,
  hasSecret: !!consumerSecret
});

const WooCommerce = new WooCommerceRestApi({
  url: "https://bcms.wigsbyjade.com",
  consumerKey,
  consumerSecret,
  version: "wc/v3",
  queryStringAuth: true, // Use query string auth for better compatibility
  timeout: 30000 // 30 second timeout
});

export default WooCommerce;

// Types for WooCommerce REST API responses
export interface WCProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  date_created: string;
  date_modified: string;
  type: string;
  status: string;
  featured: boolean;
  catalog_visibility: string;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  purchasable: boolean;
  total_sales: number;
  virtual: boolean;
  downloadable: boolean;
  manage_stock: boolean;
  stock_quantity: number | null;
  stock_status: string;
  backorders: string;
  backorders_allowed: boolean;
  backordered: boolean;
  sold_individually: boolean;
  weight: string;
  shipping_required: boolean;
  shipping_taxable: boolean;
  reviews_allowed: boolean;
  average_rating: string;
  rating_count: number;
  upsell_ids: number[];
  cross_sell_ids: number[];
  parent_id: number;
  purchase_note: string;
  categories: WCProductCategory[];
  tags: WCProductTag[];
  images: WCProductImage[];
  attributes: WCProductAttribute[];
  default_attributes: WCProductDefaultAttribute[];
  variations: number[];
  grouped_products: number[];
  menu_order: number;
  price_html: string;
  related_ids: number[];
  meta_data: WCMetaData[];
  date_on_sale_from: string | null;
  date_on_sale_from_gmt: string | null;
  date_on_sale_to: string | null;
  date_on_sale_to_gmt: string | null;
}

export interface WCProductImage {
  id: number;
  date_created: string;
  date_modified: string;
  src: string;
  name: string;
  alt: string;
  position: number;
}

export interface WCProductCategory {
  id: number;
  name: string;
  slug: string;
}

export interface WCProductTag {
  id: number;
  name: string;
  slug: string;
}

export interface WCProductAttribute {
  id: number;
  name: string;
  position: number;
  visible: boolean;
  variation: boolean;
  options: string[];
}

export interface WCProductDefaultAttribute {
  id: number;
  name: string;
  option: string;
}

export interface WCMetaData {
  id: number;
  key: string;
  value: string;
}

export interface WCTax {
  id: number;
  total: string;
  subtotal: string;
}

export interface WCCategory {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  display: string;
  image: WCCategoryImage | null;
  menu_order: number;
  count: number;
}

export interface WCCategoryImage {
  id: number;
  date_created: string;
  date_modified: string;
  src: string;
  name: string;
  alt: string;
}

export interface WCOrder {
  id: number;
  parent_id: number;
  number: string;
  order_key: string;
  created_via: string;
  version: string;
  status: string;
  currency: string;
  date_created: string;
  date_modified: string;
  discount_total: string;
  discount_tax: string;
  shipping_total: string;
  shipping_tax: string;
  cart_tax: string;
  total: string;
  total_tax: string;
  prices_include_tax: boolean;
  customer_id: number;
  customer_ip_address: string;
  customer_user_agent: string;
  customer_note: string;
  billing: WCBillingAddress;
  shipping: WCShippingAddress;
  payment_method: string;
  payment_method_title: string;
  transaction_id: string;
  date_paid: string | null;
  date_completed: string | null;
  cart_hash: string;
  meta_data: WCMetaData[];
  line_items: WCOrderLineItem[];
}

export interface WCBillingAddress {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email: string;
  phone: string;
}

export interface WCShippingAddress {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

export interface WCOrderLineItem {
  id: number;
  name: string;
  product_id: number;
  variation_id: number;
  quantity: number;
  tax_class: string;
  subtotal: string;
  subtotal_tax: string;
  total: string;
  total_tax: string;
  taxes: WCTax[];
  meta_data: WCMetaData[];
  sku: string;
  price: number;
}

export interface WCCustomer {
  id: number;
  date_created: string;
  date_modified: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  username: string;
  billing: WCBillingAddress;
  shipping: WCShippingAddress;
  is_paying_customer: boolean;
  avatar_url: string;
  meta_data: WCMetaData[];
}

// Alternative direct HTTP approach for server-side calls
async function makeWCRequest(endpoint: string, params?: Record<string, string | number>) {
  const baseUrl = "https://bcms.wigsbyjade.com/wp-json/wc/v3";
  const queryParams = new URLSearchParams({
    consumer_key: consumerKey,
    consumer_secret: consumerSecret,
    ...params
  });
  
  const url = `${baseUrl}/${endpoint}?${queryParams}`;
  console.log("Making direct WC request to:", url.replace(consumerSecret, "***"));
  
  const response = await fetch(url);
  console.log("Direct WC response status:", response.status, response.statusText);
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error("WC API Error Response:", errorText);
    throw new Error(`WooCommerce API Error: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}

// Helper functions for API calls
export const wcAPI = {
  // Products - using direct HTTP calls for better server-side compatibility
  async getProducts(params?: Record<string, string | number>): Promise<WCProduct[]> {
    try {
      console.log("Fetching products with params:", params);
      const data = await makeWCRequest("products", params);
      console.log("Products fetched successfully, count:", data.length);
      return data;
    } catch (error: any) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  async getProduct(id: string | number): Promise<WCProduct> {
    try {
      const response = await WooCommerce.get(`products/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  },

  async getProductBySlug(slug: string): Promise<WCProduct | null> {
    try {
      const data = await makeWCRequest("products", { slug });
      return data.length > 0 ? data[0] : null;
    } catch (error) {
      console.error("Error fetching product by slug:", error);
      throw error;
    }
  },

  // Categories
  async getCategories(params?: Record<string, string | number>): Promise<WCCategory[]> {
    try {
      const data = await makeWCRequest("products/categories", params);
      return data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },

  // Orders (requires authentication)
  async getOrders(params?: Record<string, string | number>): Promise<WCOrder[]> {
    try {
      const response = await WooCommerce.get("orders", params);
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  },

  async getCustomerOrders(customerId: number): Promise<WCOrder[]> {
    try {
      const response = await WooCommerce.get("orders", { customer: customerId });
      return response.data;
    } catch (error) {
      console.error("Error fetching customer orders:", error);
      throw error;
    }
  },

  // Search products
  async searchProducts(searchTerm: string): Promise<WCProduct[]> {
    try {
      const data = await makeWCRequest("products", { search: searchTerm });
      return data;
    } catch (error) {
      console.error("Error searching products:", error);
      throw error;
    }
  },

  // Customers (requires authentication)
  async getCustomer(id: number): Promise<WCCustomer> {
    try {
      const response = await WooCommerce.get(`customers/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching customer:", error);
      throw error;
    }
  },

  async createCustomer(customerData: Partial<WCCustomer>): Promise<WCCustomer> {
    try {
      const response = await WooCommerce.post("customers", customerData);
      return response.data;
    } catch (error) {
      console.error("Error creating customer:", error);
      throw error;
    }
  }
};