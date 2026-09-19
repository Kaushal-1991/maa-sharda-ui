import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../components/Admin/Header';
import Sidebar from '../components/Admin/Sidebar';

import '../components/Admin/Admin.css';

const AdminDashboard: React.FC = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="admin-layout">

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={handleSidebarClose}
      />

      {/* Main Area */}
      <div className="admin-main">

        {/* Header */}
        <Header
          onMenuClick={handleMenuClick}
        />

        {/* Page Content */}
        <main className="admin-page-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default AdminDashboard;