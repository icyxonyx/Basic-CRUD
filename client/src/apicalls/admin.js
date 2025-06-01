import { axiosInstance } from ".";

// get all users
export const GetAllUsers = async () => {
    try {
      const response = await axiosInstance.get("/api/admin/get-all-users");
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  // delete a user
export const DeleteUser = async (payload) => {
  try {
      const response = await axiosInstance.post("/api/admin/delete-user", payload);
      return response.data;
  } catch (error) {
      return error.response;
  }
}