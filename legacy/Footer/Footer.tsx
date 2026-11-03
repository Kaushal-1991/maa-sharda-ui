import { Anchor, Container, Group, Text } from '@mantine/core';
import {
  IconCalendarEvent,
  IconCopyright,
  IconHome,
  IconInfoCircle,
  IconLogin,
  IconMail,
  IconMusic,
  IconPhoto,
  IconSchool,
  IconUserPlus,
  IconVideo,
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="site-footer">
      <Container size="lg" className="site-footer__inner">
        <div>
          <Text className="footer-title">Maa Sharda Sangeet Academy</Text>
          <Text size="sm" className="footer-copy footer-copy--icon">
            <IconMusic size={16} aria-hidden="true" />
            Where every learner finds their rhythm.
          </Text>
        </div>
        <Group gap="lg">
          <Anchor component={Link} to="/" className="footer-link footer-link--icon">
            <IconHome size={16} aria-hidden="true" />
            Home
          </Anchor>
          <Anchor component={Link} to="/about" className="footer-link footer-link--icon">
            <IconInfoCircle size={16} aria-hidden="true" />
            About
          </Anchor>
          <Anchor component={Link} to="/classes" className="footer-link footer-link--icon">
            <IconSchool size={16} aria-hidden="true" />
            Classes
          </Anchor>
          <Anchor component={Link} to="/events" className="footer-link footer-link--icon">
            <IconCalendarEvent size={16} aria-hidden="true" />
            Events
          </Anchor>
          <Anchor component={Link} to="/gallery/photos" className="footer-link footer-link--icon">
            <IconPhoto size={16} aria-hidden="true" />
            Photos
          </Anchor>
          <Anchor component={Link} to="/gallery/videos" className="footer-link footer-link--icon">
            <IconVideo size={16} aria-hidden="true" />
            Videos
          </Anchor>
          <Anchor component={Link} to="/contact" className="footer-link footer-link--icon">
            <IconMail size={16} aria-hidden="true" />
            Contact
          </Anchor>
          <Anchor component={Link} to="/register" className="footer-link footer-link--icon">
            <IconUserPlus size={16} aria-hidden="true" />
            Register
          </Anchor>
          <Anchor component={Link} to="/login" className="footer-link footer-link--icon">
            <IconLogin size={16} aria-hidden="true" />
            Login
          </Anchor>
        </Group>
      </Container>
      <Container size="lg" className="footer-bottom">
        <Text size="xs" className="footer-copy--icon">
          <IconCopyright size={14} aria-hidden="true" />
          2026 Maa Sharda Sangeet Academy
        </Text>
        <Text size="xs">Made for music, learning and expression.</Text>
      </Container>
    </footer>
  );
};

export default Footer;