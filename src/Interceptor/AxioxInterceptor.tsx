import axios, { InternalAxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
      baseURL : process.env.REACT_APP_API_URL || "http://localhost:8080",
      headers:{
        "Content-Type":"application/json"
      }
});

axiosInstance.interceptors.request.use(
    (config : InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("token");    
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
},);

// Handle expired/invalid JWT
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);


export default axiosInstance;