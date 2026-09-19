import React from 'react';
import { useSelector } from 'react-redux';
import { ActionIcon } from '@mantine/core';
import { IconBellRinging } from '@tabler/icons-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const user = useSelector((state: any) => state.user);
  const jwt = useSelector((state: any) => state.jwt);

  // Get username safely
  const username = user?.name || 'Admin';

  // Get first letter
  const firstLetter = username.charAt(0).toUpperCase();

  return (
    <header className="admin-header">

      {/* ================= BURGER BUTTON ================= */}
      <button
        className="menu-button"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>


      {/* ================= PAGE TITLE ================= */}
      <div className="header-title">
        Admin Dashboard
      </div>


      {/* ================= RIGHT SIDE ================= */}
      <div className="header-right">

        {jwt && (
          <div className="header-user">

            {/* Notification */}
            <ActionIcon
              variant="subtle"
              size="lg"
              className="notification-button"
              aria-label="Notifications"
            >
              <IconBellRinging
                size={21}
                stroke={1.8}
              />
            </ActionIcon>


            {/* User Name + Role */}
            <div className="header-username">

              <span className="username">
                {username}
              </span>

              <span className="user-role">
                Administrator
              </span>

            </div>


            {/* User Avatar */}
            <div className="header-avatar">
              {firstLetter}
            </div>

          </div>
        )}

      </div>

    </header>
  );
};

export default Header;
