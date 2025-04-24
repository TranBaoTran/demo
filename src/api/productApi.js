import axiosClient from './axiosClient';

const productApi = {
    getAll: (page = 1, limit = 10, category) => {
        const skip = (page-1)*limit;
        let url = category ? `/products/category/${category}?limit=${limit}&skip=${skip}` : `/products?limit=${limit}&skip=${skip}`;
        return axiosClient.get(url)
    },
    getById: (id) => axiosClient.get(`/products/${id}`),
    getAllCategory: () => axiosClient.get('/products/categories'),
    searchProduct: (search) => axiosClient.get(`/products/search?q=${search}`),

    getCategories: () => {
        return axiosClient.get(`/products/category-list`);
    },
    
    getAllCategoriesWithCount: async () => {
        try {
        const allProductsRes = await axiosClient.get(`/products?limit=0`);
        const allProducts = allProductsRes.data.products;
        
        const categoriesRes = await productApi.getCategories();
        const categories = categoriesRes.data;
        
        const categoryCounts = allProducts.reduce((acc, product) => {
            acc[product.category] = (acc[product.category] || 0) + 1;
            return acc;
        }, {});
        
        return categories.map(category => ({
            id: category,
            name: capitalizeFirstLetter(category),
            productCount: categoryCounts[category] || 0
        }));
        } 
        catch (error) {
            console.error('Error fetching optimized categories:', error);
            throw error;
        }
    },

};

function capitalizeFirstLetter(string) {
    return string.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
  
export default productApi;