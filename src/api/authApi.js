import axiosClient, { getToken } from './axiosClient';

const authApi = {
    login: (uname, pass) => {
        return axiosClient.post('/auth/login', {username: uname, password: pass})
    },
    getMe: () => {
        if(getToken()){
            return axiosClient.get('/auth/me')
        }
    }
};
  
export default authApi;