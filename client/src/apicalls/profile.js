import { axiosInstance } from ".";

// update user
export const UpdateUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/profile/update-user", payload);
    return response.data;
  } catch (error) {
    return error.response ? error.response.data : { success: false, message: error.message };
  }
};
