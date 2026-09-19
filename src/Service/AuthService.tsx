import axiosInstance from "../Interceptor/AxioxInterceptor";

export const login = async(data:any) => {
     const response = await axiosInstance.post("/api/auth/login", data);
     return response.data;
}
