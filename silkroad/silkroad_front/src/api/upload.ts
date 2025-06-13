import instance from './axiosInstance';

export const uploadProfileImage = async (image: {
    uri: string;
    name: string;
    type: string;
}) => {
    const formData = new FormData();
    formData.append('file', {
        uri: image.uri,
        name: image.name,
        type: image.type,
    } as any);

    const response = await instance.post(`/upload/profile-image`, formData, {
        headers: {'Content-Type' : 'multipart/form-data'},
    })

    return response.data.data;
}