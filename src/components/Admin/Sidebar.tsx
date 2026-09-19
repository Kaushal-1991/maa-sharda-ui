
import React from 'react';
import { Button, Divider, Text } from '@mantine/core';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeJwt } from '../../Slice/JwtSlice';
import { removeUser } from '../../Slice/UserSlice';
import { IconLogout } from '@tabler/icons-react';

import maaShardaLogo from '../../images/maa-sharda.jpeg';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  {
    label: 'Dashboard',
    icon: '▦',
    url: '/admin/dashboard',
  },
  {
    label: 'Students',
    icon: '♙',
    url: '/admin/students',
  },
  // {
  //   label: 'Teachers',
  //   icon: '♟',
  //   url: '/admin/teachers',
  // },
  // {
  //   label: 'Classes',
  //   icon: '▤',
  //   url: '/admin/classes',
  // },
];

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(removeJwt());
    dispatch(removeUser());

    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');

    navigate('/login');
  };

  return (
    <aside
      className={`admin-sidebar ${
        isOpen ? 'sidebar-open' : ''
      }`}
    >

      {/* Logo */}
      <div className="sidebar-logo">

        <img
          src={maaShardaLogo}
          alt="Maa Sharda Academy"
          className="sidebar-logo-image"
        />

        <div className="sidebar-logo-text">
          <Text fw={700} c="white">
            Maa Sharda
          </Text>

          <Text size="xs" c="gray.4">
            Academy
          </Text>
        </div>

        {/* Mobile Close Button */}
        <button
          className="sidebar-close"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          ×
        </button>

      </div>

      {/* Navigation */}
      <nav className="sidebar-navigation">

        {navigation.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            onClick={onClose}
            className={({ isActive }) =>
              `sidebar-link ${
                isActive ? 'active' : ''
              }`
            }
          >

            <span className="sidebar-icon">
              {item.icon}
            </span>

            <span className="sidebar-label">
              {item.label}
            </span>

          </NavLink>
        ))}

      </nav>

      {/* Bottom Logout */}
      <div className="sidebar-bottom">

        <Divider
          color="rgba(255,255,255,0.12)"
          mb="md"
        />

        <Button
          fullWidth
          leftSection={<IconLogout size={18} />}
          onClick={handleLogout}
          className="sidebar-logout"
        >
          Logout
        </Button>

      </div>

    </aside>
  );
};

export default Sidebar;

