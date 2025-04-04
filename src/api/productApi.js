import axiosClient from './axiosClient';

const productApi = {
    getAll: (page = 1, limit = 10, category) => {
        console.log(category);
        const skip = (page-1)*limit;
        let url = category ? `/products/category/${category}?limit=${limit}&skip=${skip}` : `/products?limit=${limit}&skip=${skip}`;
        return axiosClient.get(url)
    },
    getById: (id) => axiosClient.get(`/products/${id}`),
    getAllCategory: () => axiosClient.get('/products/categories'),
};
  
export default productApi;