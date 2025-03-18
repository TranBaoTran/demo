import axiosClient from './axiosClient';

const productApi = {
    getAll: (page = 1, limit = 10) => {
        const skip = (page-1)*limit;
        return axiosClient.get(`/products?limit=${limit}&skip=${skip}`)
    },
    getById: (id) => axiosClient.get(`/products/${id}`),
    getAllCategory: () => axiosClient.get('/products/categories'),
};
  
export default productApi;