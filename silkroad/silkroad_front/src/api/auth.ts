import instance from "./axiosInstance";

export const singup = async (data: {
    username: string;
    password: string;
    name: string;
    location: string;
    profileImageUrl: string;
}) => {
    const response = await instance.post('/users', data);
    return response.data;
};

export const loginApi = async (data: {
    username: string;
    password: string;
}) => {
    const response = await instance.post(`/auth/login`, data);
    return response.data.data;
}

export const getMyProfile = async () => {
    const response = await instance.get('/users/me');
    return response.data.data;
}

export const updateMyProfile = async ({
  name,
  location,
  profileImageUrl,
}: {
  name: string;
  location: string;
  profileImageUrl: string;
}) => {
  const response = await instance.patch('/users/me', {
    name,
    location,
    profileImageUrl,
  });
  return response.data;
};