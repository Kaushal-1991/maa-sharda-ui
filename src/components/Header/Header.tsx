import { Anchor, Button, Container, Group, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import maaShardaLogo from '../../images/maa-sharda.jpeg';

const Header = () => {
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
        <Button component={Link} to="/register" className="header-button" radius="md" size="sm">
          Join the academy
        </Button>
      </Container>
    </header>
  );
};

export default Header;