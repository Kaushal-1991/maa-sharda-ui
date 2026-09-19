import React from 'react'
import { ActionIcon, Avatar, Burger, Group, Menu, Text, Tooltip } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../../Slice/UserSlice';
import { removeJwt } from '../../Slice/JwtSlice';
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state:any)=>state.user);

  const handleLogout = () =>{
    dispatch(removeJwt());
    dispatch(removeUser());
    navigate("/login");
  }
  return (
    <header className="admin-topbar">
      <Group gap="sm">
        <Burger hiddenFrom="md" size="sm" aria-label="Open navigation" />
        <Text className="admin-topbar__title">Administration</Text>
      </Group>
      <Group gap="xs">
        <Tooltip label="Notifications"><ActionIcon variant="subtle" color="gray" size="lg" aria-label="Notifications">♧</ActionIcon></Tooltip>
        <Menu shadow="md" width={180} position="bottom-end">
          <Menu.Target><button className="admin-profile" type="button"><Avatar size="sm" radius="xl" color="orange">TS</Avatar><span>{user.name}</span>⌄</button></Menu.Target>
          <Menu.Dropdown>
            <Menu.Item color="red" onClick={handleLogout}>
              Sign out
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </header>
  )
}

export default Header
