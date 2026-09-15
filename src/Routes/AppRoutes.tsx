import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import About from '../Pages/About';
import Classes from '../Pages/Classes';
import Contact from '../Pages/Contact';
import Events from '../Pages/Events';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import AdminDashboard from '../Pages/AdminDashboard';
import AdminSection from '../Pages/AdminSection';
import Register from '../Pages/Register';
import AdminLayout from '../components/Admin/AdminLayout';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Navigate to="/dashboard" replace />} />
        <Route path="/about" element={<About />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path=":section" element={<AdminSection />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
