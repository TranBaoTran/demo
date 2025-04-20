import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

const setAuthHeader = (token) => {
  if (token) {
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosClient.defaults.headers.common['Authorization'];
  }
};

export const storeToken = (token) => {
  localStorage.setItem('authToken', token);
  setAuthHeader(token);
};

export const getCart = () => {
  var cartData = localStorage.getItem('cartProducts');
  return cartData ? JSON.parse(cartData) : [];
};

export let getCartItems = () => {
  const storedCartData = localStorage.getItem('cartProducts');
  const cartData = storedCartData ? JSON.parse(storedCartData) : [];
  const totalQuantity = cartData.reduce((sum, item) => sum + item.quantity, 0);
  return totalQuantity;
}

export const getToken = () => {
  return localStorage.getItem('authToken');
};

export const clearToken = () => {
  localStorage.removeItem('authToken');
  setAuthHeader(null);
};

export const clearCart = () => {
  localStorage.removeItem('cartProducts');
};

axiosClient.interceptors.request.use(
  (config) => {
      const token = getToken();
      if(token){
          config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
  },
  (error) => {
      return Promise.reject(error);
  }
);

export default axiosClient;
