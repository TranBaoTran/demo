import axiosClient, { getToken } from "./axiosClient";

export const getUserIdFromToken = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return decoded.userId || decoded.id || decoded.sub;
  } catch (error) {
    console.error('Cannot decode Token', error);
    return null;
  }
};

const cartApi = {
  getCartById: () => {
    const userId = getUserIdFromToken();
    if (!userId) {
      console.error("Cannot find userID from token");
      return Promise.reject("User ID not valid");
    }

    return axiosClient.get(`/carts/user/${userId}`);
  },
};

export default cartApi;