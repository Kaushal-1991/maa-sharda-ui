import { Carousel } from '@mantine/carousel';
import {
  Anchor,
  Button,
  Container,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import maaShardaLogo from '../images/maa-sharda.jpeg';
import aboutImage from '../images/about-image.jpg';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

const instruments = [
  {
    icon: 'Sitar',
    title: 'Classical Music',
    copy: 'Build a strong foundation in melody, rhythm and expression.',
    image: 'https://loremflickr.com/900/700/sitar,indian,classical-music',
  },
  {
    icon: '🎙',
    title: 'Light Music',
    copy: 'Find your flow through songs that feel effortless and alive.',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=85',
  },
  {
    icon: '🎹',
    title: 'Harmonium',
    copy: 'Learn accompaniment, notation and confident stage presence.',
    image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=900&q=85',
  },
  {
    icon: '🎸',
    title: 'Guitar',
    copy: 'Play your favourite songs and turn chords into stories.',
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=900&q=85',
  },
];

const Home = () => {
  return (
    <div className="home-page">
      <Header />
      <main>
        <section className="home-hero">
          <Container size="lg" className="hero-inner">
            <div className="hero-copy">
              <Title order={1} className="hero-title">
                Let your <em>music</em> take the lead.
              </Title>
              <Text className="hero-description">
                A warm space to learn, practise and share your musical voice with thoughtful
                mentors and a like-minded community.
              </Text>
              <Group mt="xl" gap="sm">
                <Button component={Link} to="/register" className="hero-button" size="md" radius="md">
                  Begin your journey <span aria-hidden="true">→</span>
                </Button>
                <Button component="a" href="#classes" variant="subtle" color="dark" size="md">
                  Explore classes
                </Button>
              </Group>
            </div>

            <div className="hero-art" aria-label="Music academy highlights">
              <div className="hero-disc hero-disc--back" />
              <div className="hero-disc hero-disc--front">
                <img src={maaShardaLogo} alt="Maa Sharda Sangeet Academy" />
              </div>
              <div className="floating-note floating-note--one">♪</div>
              <div className="floating-note floating-note--two">♫</div>
              <div className="hero-caption">
                <Text size="xs">PLAYLIST FOR LIFE</Text>
                <Text fw={700}>Start with one beautiful note.</Text>
              </div>
            </div>
          </Container>
          <div className="hero-marquee" aria-hidden="true">
            <span>CLASSICAL MUSIC</span>
            <b>✦</b>
            <span>LIGHT MUSIC</span>
            <b>✦</b>
            <span>HARMONIUM</span>
            <b>✦</b>
            <span>GUITAR</span>
          </div>
        </section>

        <section className="about-section" id="about">
          <Container size="lg" className="about-inner">
            <div className="about-image-wrap">
              <div className="about-image-frame">
                <img
                  src={aboutImage}
                  alt="Maa Sharda Sangeet Academy"
                  className="about-image"
                />
              </div>
              <Text className="about-image-note">Rooted in tradition. Open to your sound.</Text>
            </div>
            <div className="about-copy">
              <Text className="eyebrow">MEET YOUR MUSIC MENTOR</Text>
              <Title order={2}>Learn with Tushar Singh Rajpoot.</Title>
              <Text className="about-description">
                Tushar Singh Rajpoot is a passionate musician and singer who believes that music
                becomes meaningful when it is shared. As a dedicated teacher, he guides learners
                with patience, practical training and a deep respect for every student’s unique
                voice. At Maa Sharda Sangeet Academy, his aim is to help each learner practise
                with confidence, understand the beauty of music and enjoy every step of their
                musical journey.
              </Text>
             
              <Anchor component={Link} to="/register" className="about-link">
                Meet your musical guide <span aria-hidden="true">→</span>
              </Anchor>
            </div>
          </Container>
        </section>

        <section className="carousel-section" id="sound">
          <Container size="lg">
            <div className="section-heading">
              <div>
                <Text className="eyebrow">A LITTLE INSPIRATION</Text>
                <Title order={2}>Make space for your sound.</Title>
              </div>
              <Text className="section-copy">Small practice sessions become meaningful progress when you enjoy the journey.</Text>
            </div>
            <Carousel
              withIndicators
              withControls
              slideSize={{ base: '100%', sm: '50%', md: '33.333333%' }}
              slideGap="md"
              className="academy-carousel"
            >
              {instruments.map((instrument) => (
                <Carousel.Slide key={instrument.title}>
                  <Paper
                    className="inspiration-card"
                    p="xl"
                    radius="lg"
                    style={{
                      backgroundImage: `linear-gradient(145deg, rgba(74, 29, 29, 0.92), rgba(159, 18, 57, 0.62)), url(${instrument.image})`,
                    }}
                  >
                    <span
                      className={`card-icon ${instrument.title === 'Classical Music' ? 'card-icon--sitar' : ''}`}
                      role="img"
                      aria-label={`${instrument.title} icon`}
                    >
                      {instrument.icon}
                    </span>
                    <Text className="card-number">0{instruments.indexOf(instrument) + 1}</Text>
                    <Title order={3}>{instrument.title}</Title>
                    <Text size="sm" mt="sm">{instrument.copy}</Text>
                    <Anchor component={Link} to="/register" className="card-link">Learn more →</Anchor>
                  </Paper>
                </Carousel.Slide>
              ))}
            </Carousel>
          </Container>
        </section>

        <section className="home-cta" id="classes">
          <Container size="lg" className="cta-inner">
            <Stack gap={6}>
              <Text className="eyebrow">YOUR NEXT CHAPTER</Text>
              <Title order={2}>The first note is yours.</Title>
              <Text>Choose an instrument, meet your mentor and make music that feels like you.</Text>
            </Stack>
            <Button component={Link} to="/register" className="hero-button" size="md" radius="md">
              Register now <span aria-hidden="true">→</span>
            </Button>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;