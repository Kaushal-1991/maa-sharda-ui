import { Anchor, Burger, Button, Container, Drawer, Group, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link } from 'react-router-dom';
import maaShardaLogo from '../../images/maa-sharda.jpeg';

const Header = () => {
  const [opened, { close, toggle }] = useDisclosure(false);

  return (
    <header className="site-header">
      <Container size="lg" className="site-header__inner">
        <Anchor component={Link} to="/" underline="never" className="brand">
          <img
            src={maaShardaLogo}
            alt="Maa Sharda Sangeet Academy logo"
            className="brand__logo"
          />
          <Text fw={800} size="lg" className="brand__name">
            <span>Maa Sharda</span>
            <small>Sangeet Academy</small>
          </Text>
        </Anchor>
        <Group gap="lg" visibleFrom="sm">
          <Anchor component={Link} to="/" className="header-link">Home</Anchor>
          <Anchor component={Link} to="/about" className="header-link">About</Anchor>
          <Anchor component={Link} to="/classes" className="header-link">Classes</Anchor>
          <Anchor component={Link} to="/events" className="header-link">Events</Anchor>
          <Anchor component={Link} to="/contact" className="header-link">Contact</Anchor>
        </Group>
        <Button component={Link} to="/register" className="header-button" radius="md" size="sm" visibleFrom="sm">
          Join the academy
        </Button>
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
          className="header-menu-toggle"
          aria-label={opened ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={opened}
          aria-controls="mobile-navigation"
        />
      </Container>
      <Drawer
        opened={opened}
        onClose={close}
        position="top"
        size="auto"
        padding="md"
        withCloseButton={false}
        classNames={{ content: 'mobile-nav-drawer', body: 'mobile-nav-drawer__body' }}
      >
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
          <Stack gap={4}>
            <Anchor component={Link} to="/" className="mobile-nav__link" onClick={close}>Home</Anchor>
            <Anchor component={Link} to="/about" className="mobile-nav__link" onClick={close}>About</Anchor>
            <Anchor component={Link} to="/classes" className="mobile-nav__link" onClick={close}>Classes</Anchor>
            <Anchor component={Link} to="/events" className="mobile-nav__link" onClick={close}>Events</Anchor>
            <Anchor component={Link} to="/contact" className="mobile-nav__link" onClick={close}>Contact</Anchor>
          </Stack>
          <Button component={Link} to="/register" className="mobile-nav__cta" fullWidth radius="md" onClick={close}>
            Join the academy
          </Button>
        </nav>
      </Drawer>
    </header>
  );
};

export default Header;
