import React from 'react'
import Header from '../components/Admin/Header'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Admin/Sidebar'

const AdminDashboard = () => {
  return (
    <div className="admin-lte">
      <Sidebar />
      <div className="admin-workspace">
        <Header />
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard
