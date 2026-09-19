import axiosInstance from "../Interceptor/AxioxInterceptor";

export const registerStudent = async (studentData: any) => {  
    return axiosInstance.post("/api/students/register", studentData);
}

export const fetchStudents = async () => {
    const response = await axiosInstance.get("/api/students/getAll");
    return response.data;
};
