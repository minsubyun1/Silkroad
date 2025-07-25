import AsyncStorage from "@react-native-async-storage/async-storage";
import instance from "./axiosInstance";

export const registerProduct = async (formData: FormData) => {
  const response = await instance.post('/products', formData);
  return response.data;
};

export const fetchAllProducts = async () => {
  const response = await instance.get('/products');
  return response.data;
};

export const fetchProductDetail = async (productId: number) => {
  const response = await instance.get(`/products/${productId}`);
  return response.data;
};

export const fetchSearchProducts = async ({
  keyword,
  category,
}: {
  keyword?: string;
  category?: string;
}) => {
  const res = await instance.get('/products/search', {
    params: {
      keyword,
      category,
    },
  });
  return res.data; 
};