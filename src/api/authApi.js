import axiosClient from './axiosClient';

const authApi = {
    login: (uname, pass) => {
        return axiosClient.post('/auth/login', {username: uname, password: pass})
    },
};
  
export default authApi;