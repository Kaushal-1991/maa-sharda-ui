import React from 'react'
import { Text } from '@mantine/core';
import { Link, NavLink} from 'react-router-dom';
import maaShardaLogo from '../../images/maa-sharda.jpeg';

const navigation = [
  { label: 'Dashboard', icon: '▦', url: '/admin/dashboard' },
  { label: 'Students', icon: '♙', url: '/admin/students' },
  // { label: 'Classes', icon: '◷', url: '/admin/class' },
  // { label: 'Events', icon: '★', url: '/admin/event' },
];

const Sidebar = () => {
  return (
    <aside className="admin-sidebar">
      <Link className="admin-brand" to="/admin" aria-label="Maa Sharda admin dashboard">
        <img src={maaShardaLogo} alt="Maa Sharda Sangeet Academy" />
        <span><b>Maa Sharda</b><small>ADMIN PANEL</small></span>
      </Link>

      <nav className="admin-nav" aria-label="Admin navigation">
        <Text className="admin-nav__heading">MAIN NAVIGATION</Text>
        {navigation.map((item) => (
          <NavLink
            key={item.label}
            to={item.url}
            end={item.url === '/admin'}
            className={({ isActive }) => `admin-nav__link ${isActive ? 'is-active' : ''}`}
          >
            <span aria-hidden="true">{item.icon}</span>{item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
