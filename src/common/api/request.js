import axios from 'axios';

const request = axios.create({
    baseURL: 'http://192.168.1.18:5001/', // 修改为你实际的 API 基础路径
    timeout: 20000,
    withCredentials: true, // 确保请求时带上凭证（如 Cookie
});

request.interceptors.response.use(
    response => response.data,
    error => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

export default request;