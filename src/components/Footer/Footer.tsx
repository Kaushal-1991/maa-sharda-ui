import { Anchor, Container, Group, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="site-footer">
      <Container size="lg" className="site-footer__inner">
        <div>
          <Text className="footer-title">Maa Sharda Sangeet Academy</Text>
          <Text size="sm" className="footer-copy">
            Where every learner finds their rhythm.
          </Text>
        </div>
        <Group gap="lg">
          <Anchor component={Link} to="/" className="footer-link">
            Home
          </Anchor>
          <Anchor component={Link} to="/about" className="footer-link">
            About
          </Anchor>
          <Anchor component={Link} to="/classes" className="footer-link">
            Classes
          </Anchor>
          <Anchor component={Link} to="/events" className="footer-link">
            Events
          </Anchor>
          <Anchor component={Link} to="/contact" className="footer-link">
            Contact
          </Anchor>
          <Anchor component={Link} to="/register" className="footer-link">
            Register
          </Anchor>
          <Anchor component={Link} to="/login" className="footer-link">
            Login
          </Anchor>
        </Group>
      </Container>
      <Container size="lg" className="footer-bottom">
        <Text size="xs">© 2026 Maa Sharda Sangeet Academy</Text>
        <Text size="xs">Made for music, learning and expression.</Text>
      </Container>
    </footer>
  );
};

export default Footer;