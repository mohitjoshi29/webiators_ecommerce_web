import axios from 'axios';
import type { ProductsResponse, Product, Category, AuthResponse, LoginFormData } from '@/types';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong';
    console.error('API Error:', message);
    return Promise.reject(error);
  },
);

export const productAPI = {
  getAll: (limit = 20, skip = 0) =>
    api.get<ProductsResponse>(`/products?limit=${limit}&skip=${skip}`),
  getById: (id: number) => api.get<Product>(`/products/${id}`),
  search: (query: string) =>
    api.get<ProductsResponse>(`/products/search?q=${query}`),
  getByCategory: (category: string) =>
    api.get<ProductsResponse>(`/products/category/${category}`),
  getCategories: () => api.get<Category[]>('/products/categories'),
  add: (data: Partial<Product>) => api.post<Product>('/products/add', data),
  update: (id: number, data: Partial<Product>) =>
    api.put<Product>(`/products/${id}`, data),
  delete: (id: number) => api.delete<Product>(`/products/${id}`),
};

export const authAPI = {
  login: (data: LoginFormData) =>
    api.post<AuthResponse>('/auth/login', data),
  getProfile: () => api.get<AuthResponse>('/auth/me'),
};

export default api;
