import { useState, useEffect } from 'react';
import { wcAPI, WCProduct, WCCategory, WCOrder } from '@/lib/woocommerce';

// Custom hook to replace useQuery for products
export function useProducts(categoryId?: string) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<{ products: { nodes: WCProduct[] } } | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const params: Record<string, string | number> = {};
        if (categoryId) {
          params.category = categoryId;
        }
        const products = await wcAPI.getProducts(params);
        setData({ products: { nodes: products } });
        setError(null);
      } catch (err) {
        setError(err as Error);
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [categoryId]);

  return { loading, error, data };
}

// Custom hook to replace useQuery for a single product
export function useProduct(slug: string) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<{ product: WCProduct | null } | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      if (!slug) return;
      
      try {
        setLoading(true);
        const product = await wcAPI.getProductBySlug(slug);
        setData({ product });
        setError(null);
      } catch (err) {
        setError(err as Error);
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [slug]);

  return { loading, error, data };
}

// Custom hook to replace useQuery for categories
export function useCategories() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<{ productCategories: { nodes: WCCategory[] } } | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        const categories = await wcAPI.getCategories();
        setData({ productCategories: { nodes: categories } });
        setError(null);
      } catch (err) {
        setError(err as Error);
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return { loading, error, data };
}

// Custom hook to replace useQuery for customer orders
export function useCustomerOrders(customerId?: number) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<{ customer: { orders: { nodes: WCOrder[] } } } | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      if (!customerId) {
        setData(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const orders = await wcAPI.getCustomerOrders(customerId);
        setData({ customer: { orders: { nodes: orders } } });
        setError(null);
      } catch (err) {
        setError(err as Error);
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [customerId]);

  return { loading, error, data };
}

// Custom hook to replace useMutation for product search
export function useProductSearch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<{ products: { nodes: WCProduct[] } } | null>(null);

  const searchProducts = async (searchTerm: string) => {
    try {
      setLoading(true);
      setError(null);
      const products = await wcAPI.searchProducts(searchTerm);
      setData({ products: { nodes: products } });
    } catch (err) {
      setError(err as Error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, searchProducts };
}

// Custom hook to replace useMutation for user registration
export function useRegisterUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const register = async (variables: { username: string; email: string; password: string }) => {
    try {
      setLoading(true);
      setError(null);
      
      const customerData = {
        username: variables.username,
        email: variables.email,
        first_name: '',
        last_name: '',
        billing: {
          first_name: '',
          last_name: '',
          company: '',
          address_1: '',
          address_2: '',
          city: '',
          state: '',
          postcode: '',
          country: '',
          email: variables.email,
          phone: ''
        }
      };
      
      const customer = await wcAPI.createCustomer(customerData);
      
      // Note: WooCommerce REST API doesn't handle authentication like GraphQL
      // You'll need to implement custom authentication or use WordPress REST API
      return { data: { registerUser: { user: customer } } };
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return [register, { loading, error }] as const;
}

// Custom hook to replace useMutation for login
export function useLoginUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const login = async (variables: { username: string; password: string }) => {
    try {
      setLoading(true);
      setError(null);
      
      // Note: WooCommerce REST API doesn't handle authentication directly
      // You'll need to use WordPress REST API for authentication
      // This is a placeholder implementation
      
      const response = await fetch('https://bcms.wigsbyjade.com/wp-json/jwt-auth/v1/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: variables.username,
          password: variables.password,
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      
      // Store token in cookies (similar to the original implementation)
      const Cookies = (await import('js-cookie')).default;
      Cookies.set('auth-token', data.token);
      
      return { data: { login: { authToken: data.token, user: data.user } } };
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return [login, { loading, error }] as const;
}