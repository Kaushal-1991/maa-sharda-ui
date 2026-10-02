import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import About from "../Pages/Landing/About";
import Classes from "../Pages/Landing/Classes";
import Contact from "../Pages/Landing/Contact";
import Events from "../Pages/Landing/Events";
import Gallery from "../Pages/Landing/Gallery";
import Home from "../Pages/Landing/Home";

import RegisterPage from "../Pages/Landing/RegisterPage";
import LoginPages from "../Pages/Landing/LoginPages";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import AdminDashboard from "../Layout/AdminDashboard";
import Dashboard from "../components/Admin/Dashboard";
import Student from "../components/Admin/Student/Student";
import NotFound from "../Pages/NotFound";
import StudentEdit from "../components/Admin/Student/StudentEdit";
import AdminGallery from "../components/Admin/Gallery/AdminGallery";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/events" element={<Events />} />
        <Route path="/gallery/photos" element={<Gallery mediaType="photos" />} />
        <Route path="/gallery/videos" element={<Gallery mediaType="videos" />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/login"
          element={
            <PublicRoutes>
              <LoginPages />
            </PublicRoutes>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoutes>
              <AdminDashboard />
            </ProtectedRoutes>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="students" element={<Student />} />
          <Route path="student-edit" element={<StudentEdit />} />
          <Route path="gallery">
            <Route index element={<Navigate to="photos" replace />} />
            <Route path="photos" element={<AdminGallery mediaType="photos" />} />
            <Route path="videos" element={<AdminGallery mediaType="videos" />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
