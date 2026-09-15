import { ActionIcon, Avatar, Burger, Group, Menu, Text, Tooltip } from '@mantine/core';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import maaShardaLogo from '../../images/maa-sharda.jpeg';

const navigation = [
  { label: 'Dashboard', icon: '▦', to: '/admin' },
  { label: 'Students', icon: '♙', to: '/admin/students' },
  { label: 'Classes', icon: '◷', to: '/admin/classes' },
  { label: 'Events', icon: '★', to: '/admin/events' },
  { label: 'Enquiries', icon: '✉', to: '/admin/enquiries' },
];

const AdminLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-lte">
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
              to={item.to}
              end={item.to === '/admin'}
              className={({ isActive }) => `admin-nav__link ${isActive ? 'is-active' : ''}`}
            >
              <span aria-hidden="true">{item.icon}</span>{item.label}
            </NavLink>
          ))}
          <Text className="admin-nav__heading admin-nav__heading--spaced">SETTINGS</Text>
          <NavLink to="/admin/settings" className="admin-nav__link"><span aria-hidden="true">⚙</span>Academy settings</NavLink>
        </nav>

        <Link className="admin-visit-site" to="/">↗ View public website</Link>
      </aside>

      <section className="admin-workspace">
        <header className="admin-topbar">
          <Group gap="sm">
            <Burger hiddenFrom="md" size="sm" aria-label="Open navigation" />
            <Text className="admin-topbar__title">Administration</Text>
          </Group>
          <Group gap="xs">
            <Tooltip label="Notifications"><ActionIcon variant="subtle" color="gray" size="lg" aria-label="Notifications">♧</ActionIcon></Tooltip>
            <Menu shadow="md" width={180} position="bottom-end">
              <Menu.Target><button className="admin-profile" type="button"><Avatar size="sm" radius="xl" color="orange">TS</Avatar><span>Tushar</span>⌄</button></Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Account</Menu.Label>
                <Menu.Item component={Link} to="/admin/settings">Settings</Menu.Item>
                <Menu.Divider />
                <Menu.Item color="red" onClick={() => navigate('/login')}>Sign out</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </header>
        <main className="admin-content"><Outlet /></main>
        <footer className="admin-footer"><span><b>Copyright © 2026</b> Maa Sharda Sangeet Academy.</span><span>AdminLTE-inspired dashboard</span></footer>
      </section>
    </div>
  );
};

export default AdminLayout;
