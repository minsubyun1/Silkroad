import AsyncStorage from "@react-native-async-storage/async-storage";
import instance from "./axiosInstance";

export const registerProduct = async (formData: FormData) => {
  const response = await instance.post('/products', formData);
  return response.data;
};