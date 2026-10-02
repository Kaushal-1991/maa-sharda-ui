import { ActionIcon, Anchor, Burger, Button, Container, Drawer, Group, Menu, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconCalendarEvent,
  IconHome,
  IconInfoCircle,
  IconMail,
  IconPhoto,
  IconSchool,
  IconUserPlus,
  IconVideo,
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import maaShardaLogo from '../../images/maa-sharda.jpeg';

const Header = () => {
  const [opened, { close, toggle }] = useDisclosure(false);
  const [galleryOpened, { toggle: toggleGallery }] = useDisclosure(false);

  return (
    <header className="site-header">
      <Container size="lg" className="site-header__inner">
        <Anchor component={Link} to="/" underline="never" className="brand">
          <img src={maaShardaLogo} alt="Maa Sharda Sangeet Academy logo" className="brand__logo" />
          <Text fw={800} size="lg" className="brand__name"><span>Maa Sharda</span><small>Sangeet Academy</small></Text>
        </Anchor>
        <Group gap="lg" visibleFrom="sm">
          <Anchor component={Link} to="/" className="header-link"><IconHome size={16} aria-hidden="true" />Home</Anchor>
          <Anchor component={Link} to="/about" className="header-link"><IconInfoCircle size={16} aria-hidden="true" />About</Anchor>
          <Anchor component={Link} to="/classes" className="header-link"><IconSchool size={16} aria-hidden="true" />Classes</Anchor>
          <Anchor component={Link} to="/events" className="header-link"><IconCalendarEvent size={16} aria-hidden="true" />Events</Anchor>
          <Menu position="bottom-start" withinPortal>
            <Menu.Target>
              <button type="button" className="header-link header-gallery-trigger">
                <IconPhoto size={17} stroke={1.8} aria-hidden="true" />
                Gallery
              </button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item component={Link} to="/gallery/photos" leftSection={<IconPhoto size={16} aria-hidden="true" />}>Photos</Menu.Item>
              <Menu.Item component={Link} to="/gallery/videos" leftSection={<IconVideo size={16} aria-hidden="true" />}>Videos</Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <Anchor component={Link} to="/contact" className="header-link"><IconMail size={16} aria-hidden="true" />Contact</Anchor>
        </Group>
        <Button component={Link} to="/register" leftSection={<IconUserPlus size={16} />} className="header-button" radius="md" size="sm" visibleFrom="sm">Join the academy</Button>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" className="header-menu-toggle" aria-label={opened ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={opened} aria-controls="mobile-navigation" />
      </Container>
      <Drawer opened={opened} onClose={close} position="top" size="auto" padding="md" withCloseButton={false} classNames={{ content: 'mobile-nav-drawer', body: 'mobile-nav-drawer__body' }}>
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
          <div className="mobile-nav__header">
            <ActionIcon variant="subtle" size="lg" className="mobile-nav__close" onClick={close} aria-label="Close navigation menu">&times;</ActionIcon>
          </div>
          <Stack gap={4}>
            <Anchor component={Link} to="/" className="mobile-nav__link" onClick={close}><IconHome size={17} aria-hidden="true" />Home</Anchor>
            <Anchor component={Link} to="/about" className="mobile-nav__link" onClick={close}><IconInfoCircle size={17} aria-hidden="true" />About</Anchor>
            <Anchor component={Link} to="/classes" className="mobile-nav__link" onClick={close}><IconSchool size={17} aria-hidden="true" />Classes</Anchor>
            <Anchor component={Link} to="/events" className="mobile-nav__link" onClick={close}><IconCalendarEvent size={17} aria-hidden="true" />Events</Anchor>
            <button
              type="button"
              className="mobile-nav__link mobile-nav__gallery-toggle"
              onClick={toggleGallery}
              aria-expanded={galleryOpened}
            >
              <IconPhoto size={17} stroke={1.8} aria-hidden="true" />
              Gallery
            </button>
            {galleryOpened && (
              <div className="mobile-nav__gallery-links">
                <Anchor component={Link} to="/gallery/photos" className="mobile-nav__link" onClick={close}><IconPhoto size={17} aria-hidden="true" />Photos</Anchor>
                <Anchor component={Link} to="/gallery/videos" className="mobile-nav__link" onClick={close}><IconVideo size={17} aria-hidden="true" />Videos</Anchor>
              </div>
            )}
            <Anchor component={Link} to="/contact" className="mobile-nav__link" onClick={close}><IconMail size={17} aria-hidden="true" />Contact</Anchor>
          </Stack>
          <Button component={Link} to="/register" leftSection={<IconUserPlus size={17} />} className="mobile-nav__cta" fullWidth radius="md" onClick={close}>Join the academy</Button>
        </nav>
      </Drawer>
    </header>
  );
};

export default Header;
