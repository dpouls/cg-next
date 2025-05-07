import api from '@/lib/axios';

export interface User {
  profile_image_filename: string | null;
  profile_image_uploaded_at: string | null;
  uuid: string;
  email: string;
  first_name: string;
  last_name: string;
}

export const getCurrentUser = async (): Promise<User> => {
  try {
    const { data } = await api.get<User>('/api/v1/user/me');
    return data;
  } catch (error) {
    throw new Error('Failed to fetch user data');
  }
};

export const updateUser = async (userData: Partial<User>): Promise<User> => {
  try {
    const { data } = await api.patch<User>('/api/v1/users/me/', userData);
    return data;
  } catch (error) {
    throw new Error('Failed to update user data');
  }
};

export const uploadProfileImage = async (file: File): Promise<User> => {
  try {
    const formData = new FormData();
    formData.append('profile_image', file);

    const { data } = await api.patch<User>('/api/v1/users/me/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch (error) {
    throw new Error('Failed to upload profile image');
  }
}; 