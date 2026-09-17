import axiosInstance from "../Interceptor/AxioxInterceptor";

export const registerStudent = async (studentData: any) => {  
    return axiosInstance.post("/api/students/register", studentData);
}
