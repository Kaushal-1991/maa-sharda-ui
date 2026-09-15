import { Carousel } from '@mantine/carousel';
import { Anchor, Button, Container, Group, Paper, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
import aboutImage from '../images/about-image.jpg';
import aboutHeroImage from '../images/about-page-image.jpg';
import badalImage from '../images/badal.jpg';
import roshniImage from '../images/roshni.jpg';
import pawanImage from '../images/pawan.jpg';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

const groupMembers = [
  {
    name: 'Pawan',
    role: 'Sufi · Folk Singer',
    work: 'Brings soulful Sufi expression and the warmth of folk music to every performance.',
    image: pawanImage,
  },
  {
    name: 'Roshni',
    role: 'Bollywood Singer',
    work: 'Adds emotion, melody and contemporary Bollywood energy to the musical community.',
    image: roshniImage,
  },
  {
    name: 'Badal',
    role: 'Organ Player · Performer',
    work: 'Creates rich accompaniment and supports singers with rhythm, harmony and live performance.',
    image: badalImage,
  },
];

const About = () => {
  return (
    <div className="about-page">
      <Header />
      <main>
        <section className="about-page-hero">
          <Container size="lg" className="about-page-hero__inner">
            <div className="about-page-hero__copy">
              <Text className="eyebrow">THE PERSON BEHIND THE MUSIC</Text>
              <Title order={1}>
                Meet <em>Tushar Singh Thakur</em>
                <span className="mentor-hero-subtitle">Owner of Swarum Band</span>
              </Title>
              <Text className="about-page-hero__lead">
                Musician, singer and mentor helping every learner discover a sound that feels
                truly their own.
              </Text>
              <div className="instrument-banner">
                <span className="instrument-banner__icon" aria-hidden="true">♬</span>
                <div>
                  <Text className="instrument-banner__kicker">THE SOUND OF PRACTICE</Text>
                  <Text fw={700}>From sitar strings to a confident voice.</Text>
                </div>
              </div>
              <Group mt="xl" gap="sm">
                <Button component={Link} to="/register" className="hero-button" radius="md">
                  Start learning <span aria-hidden="true">→</span>
                </Button>
                <Anchor component={Link} to="/" className="about-back-link">
                  Back to home
                </Anchor>
              </Group>
            </div>
            <div className="mentor-portrait-wrap">
              <div className="mentor-portrait-frame">
                <img src={aboutHeroImage} alt="Tushar Singh Rajpoot performing with a guitar" />
              </div>
              <div className="mentor-portrait-label">
                <Text size="xs">MUSICIAN • SINGER • TEACHER</Text>
                <Text fw={700}>Learn with feeling.</Text>
              </div>
            </div>
          </Container>
        </section>

        <section className="tushar-profile">
          <Container size="lg" className="tushar-profile__inner">
            <div className="tushar-profile__image">
              <img src={aboutImage} alt="Tushar Singh Rajpoot with a guitar" />
              <span>01 / THE MENTOR</span>
            </div>
            <div className="tushar-profile__copy">
              <Text className="eyebrow">ABOUT TUSHAR SINGH RAJPOOT</Text>
              <Title order={2}>A performer’s ear. A teacher’s patience.</Title>
              <Text>
                Tushar Singh Rajpoot is a musician, singer and teacher who brings the joy of live
                music into every lesson. He helps learners understand rhythm, melody and musical
                expression through clear practice and encouraging guidance.
              </Text>
              <Text mt="md">
                His teaching is personal and purposeful: listen closely, practise with care and
                grow with confidence. Whether you are beginning with a single note or preparing
                to share a complete song, Tushar creates room for your own voice to develop.
              </Text>
              <Group mt="xl" gap="sm">
                <span className="profile-tag">MUSICIAN</span>
                <span className="profile-tag">SINGER</span>
                <span className="profile-tag">TEACHER</span>
              </Group>
            </div>
          </Container>
        </section>

        <section className="member-gallery">
          <Container size="lg">
            <div className="section-heading member-gallery-heading">
              <div>
                <Text className="eyebrow">THE PEOPLE BEHIND THE SOUND</Text>
                <Title order={2}>A music community that grows together.</Title>
              </div>
              <Text className="section-copy member-gallery-intro">
                Every lesson becomes richer when musicians learn, listen and perform together.
              </Text>
            </div>
            <Carousel
              withIndicators
              withControls
              slideSize={{ base: '100%', sm: '50%', md: '33.333333%' }}
              slideGap="lg"
              className="member-carousel"
            >
              {groupMembers.map((member, index) => (
                <Carousel.Slide key={member.name}>
                  <div className="member-photo-card">
                    <img src={member.image} alt={member.name} />
                    <span className="member-photo-card__index">0{index + 1}</span>
                    <div className="member-photo-card__caption">
                      <Text className="member-photo-card__name" fw={700}>{member.name}</Text>
                      <Text size="xs" className="member-photo-card__role">{member.role}</Text>
                      <Text size="xs" className="member-photo-card__work">{member.work}</Text>
                    </div>
                  </div>
                </Carousel.Slide>
              ))}
            </Carousel>
          </Container>
        </section>

        <section className="mentor-values">
          <Container size="lg">
            <div className="section-heading mentor-values-heading">
              <div>
                <Text className="eyebrow">WHAT LEARNERS FIND HERE</Text>
                <Title order={2}>A practice space with heart.</Title>
              </div>
              <Text className="section-copy mentor-values-intro">
                Thoughtful guidance, joyful practice and the confidence to share your sound.
              </Text>
            </div>
            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
              <Paper className="mentor-value-card" p="xl" radius="lg">
                <Text className="value-number">01</Text>
                <Title order={3}>Patient guidance</Title>
                <Text mt="sm">Lessons shaped around your pace, confidence and musical goals.</Text>
              </Paper>
              <Paper className="mentor-value-card" p="xl" radius="lg">
                <Text className="value-number">02</Text>
                <Title order={3}>Real practice</Title>
                <Text mt="sm">Build strong foundations through repetition that feels joyful and useful.</Text>
              </Paper>
              <Paper className="mentor-value-card" p="xl" radius="lg">
                <Text className="value-number">03</Text>
                <Title order={3}>Stage confidence</Title>
                <Text mt="sm">Turn your preparation into expression, presence and memorable performance.</Text>
              </Paper>
            </SimpleGrid>
          </Container>
        </section>

        <section className="about-page-cta">
          <Container size="lg" className="about-page-cta__inner">
            <Stack gap={6}>
              <Text className="eyebrow">YOUR SOUND STARTS HERE</Text>
              <Title order={2}>Ready to find your musical voice?</Title>
            </Stack>
            <Button component={Link} to="/register" className="hero-button" radius="md">
              Join the academy <span aria-hidden="true">→</span>
            </Button>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
