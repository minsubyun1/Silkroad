import instance from "./axiosInstance";

export const createChatRoom = async (productId: number) => {
  const res = await instance.post(`/chats/room/${productId}`);
  return res.data.data; // roomId
};

export const getChatRoomDetail = async (roomId: number) => {
  const res = await instance.get(`/chats/room/${roomId}`);
  return res.data.data; // ChatRoomDetailResponse
};

export const getChatMessages = async (roomId: number) => {
  const response = await instance.get(`/chats/room/${roomId}/messages`);
  return response.data.data;
};

export const sendChatMessage = async (roomId: number, message: string) => {
  const response = await instance.post(
    `/chats/room/${roomId}/message`,
    {
      message: message
    }
  );
  return response.data;
};

export const fetchChats = async () => {
  const response = await instance.get(`/chats/rooms`)
  return response.data.data;
}

export const fetchSellChats = async () => {
  const response = await instance.get(`/chats/rooms/sell`)
  return response.data.data;
}

export const fetchBuyChats = async () => {
  const response = await instance.get(`/chats/rooms/buy`)
  return response.data.data;
}