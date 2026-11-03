import axiosInstance from "../Interceptor/AxioxInterceptor";

export const registerStudent = async (studentData: any) => {
  return axiosInstance.post("/api/students/register", studentData);
};

export const fetchStudents = async () => {
  const response = await axiosInstance.get("/api/students/getAll");
  return response.data;
};

export const countStudents = async () => {
  const response = await axiosInstance.get("/api/students/count");
  return response.data;
};

export const deleteStudents = async (id: number) => {
  const response = await axiosInstance.delete(`/api/students/delete/${id}`);
  return response.data;
};

export const registrationStudent = async (id: number, status: string) => {
  const response = await axiosInstance.put(
    `/api/students/registrationStatus/${id}/${status}`,
  );
  return response.data;
};
