import axiosClient from './axiosClient';

const productApi = {
    getAll: () => axiosClient.get('/products'),
    getById: (id) => axiosClient.get(`/products/${id}`),
    getAllCategory: () => axiosClient.get('/products/categories'),
};
  
export default productApi;