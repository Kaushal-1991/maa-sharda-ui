import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import About from '../Pages/About';
import Classes from '../Pages/Classes';
import Contact from '../Pages/Contact';
import Events from '../Pages/Events';
import Home from '../Pages/Home';

import RegisterPage from '../Pages/RegisterPage';
import LoginPages from '../Pages/LoginPages';
import PublicRoutes from './PublicRoutes';
import ProtectedRoutes from './ProtectedRoutes';
import AdminDashboard from '../Layout/AdminDashboard';
import Dashboard from '../components/Admin/Dashboard';
import Student from '../components/Admin/Student';
import NotFound from '../Pages/NotFound';


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<About /> }/>
        <Route path="/classes" element={<Classes />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<PublicRoutes><LoginPages /></PublicRoutes>} />
         <Route path="/admin" element={<ProtectedRoutes><AdminDashboard /></ProtectedRoutes>}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} /> 
          <Route path="students" element={<Student />} /> 
        </Route>
      
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
