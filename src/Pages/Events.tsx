import { Carousel } from '@mantine/carousel';
import { Anchor, Button, Container, Group, Paper, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
import eventOneImage from '../images/event-1.jpg';
import eventTwoImage from '../images/event-2.jpg';
import eventThreeImage from '../images/event-3.jpg';
import eventFourImage from '../images/event-4.jpg';
import eventFiveImage from '../images/event-5.jpg';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

const events = [
  {
    date: '01',
    month: 'LIVE',
    title: 'Swarum Band Live Sessions',
    copy: 'Soulful vocals, rich accompaniment and a live set shaped around the feeling of every song.',
  },
  {
    date: '02',
    month: 'OPEN',
    title: 'Open Mic & Music Evening',
    copy: 'A welcoming stage for learners, singers and performers to share their sound with the community.',
  },
  {
    date: '03',
    month: 'WORK',
    title: 'Swarum Music Workshop',
    copy: 'Learn how rhythm, voice and instruments come together to create a confident performance.',
  },
];

const performanceGallery = [
  { image: eventTwoImage, label: 'Soulful live vocals' },
  { image: eventFourImage, label: 'Melody and expression' },
  { image: eventFiveImage, label: 'Live accompaniment' },
];

const youtubeVideos = [
  { id: 'kJQP7kiw5Fk', title: 'Swarum Band performance' },
  { id: 'OPf0YbXqDm0', title: 'Live music session' },
  { id: 'OPf0YbXqDm0', title: 'Music and performance inspiration' },
];

const swarumYoutubeUrl = 'https://www.youtube.com/results?search_query=swarum+band';

const Events = () => {
  return (
    <div className="events-page">
      <Header />
      <main>
        <section className="events-hero">
          <Container size="lg" className="events-hero__inner">
            <div className="events-hero__copy">
              <Text className="eyebrow">LIVE MUSIC · COMMUNITY · PERFORMANCE</Text>
              <Title order={1}>Meet <em>Swarum Band.</em></Title>
              <Text className="events-hero__lead">
                Swarum Band brings singers and musicians together to create warm, expressive live
                performances rooted in connection, rhythm and feeling.
              </Text>
              <Group mt="xl" gap="sm">
                <Button component={Link} to="/register" className="hero-button" radius="md">
                  Join the music community <span aria-hidden="true">→</span>
                </Button>
                <Anchor href={swarumYoutubeUrl} target="_blank" rel="noreferrer" className="events-link">
                  Watch the band <span aria-hidden="true">↗</span>
                </Anchor>
              </Group>
            </div>
            <div className="events-hero__image">
              <img src={eventOneImage} alt="Swarum Band performance" />
              <div className="events-hero__badge">
                <Text size="xs">THE SWARUM SOUND</Text>
                <Text fw={700}>Every performance tells a story.</Text>
              </div>
            </div>
          </Container>
        </section>

        <section className="swarum-story">
          <Container size="lg" className="swarum-story__inner">
            <div className="swarum-story__image">
              <img src={eventThreeImage} alt="Swarum Band live performance" />
              <span>01 / THE BAND</span>
            </div>
            <div className="swarum-story__content">
              <Text className="eyebrow">ABOUT SWARUM BAND</Text>
              <Title order={2}>A band built around expression.</Title>
              <Text className="swarum-story__copy">
                Swarum Band is a live music collective led by Tushar Singh Rajpoot. The band brings
                together singers and instrumentalists for soulful Sufi, folk, Bollywood and light
                music performances. Their work is about more than playing songs: it is about creating
                a shared atmosphere where every voice and instrument has a place.
              </Text>
              <Group mt="xl" gap="sm">
                <span className="profile-tag">LIVE MUSIC</span>
                <span className="profile-tag">SUFI & FOLK</span>
                <span className="profile-tag">BOLLYWOOD</span>
                <span className="profile-tag">GAZAL</span>
                <span className="profile-tag">BHAJAN</span>
              </Group>
            </div>
          </Container>
        </section>

        <section className="events-list-section">
          <Container size="lg">
            <div className="events-section-heading">
              <div>
                <Text className="eyebrow">WHAT HAPPENS HERE</Text>
                <Title order={2}>Events with a little more feeling.</Title>
              </div>
              <Text>From intimate practice evenings to full live performances, Swarum Band creates space for music to meet people.</Text>
            </div>
            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
              {events.map((event) => (
                <Paper className="event-card" key={event.title} p="xl" radius="lg">
                  <div className="event-card__date">
                    <strong>{event.date}</strong>
                    <span>{event.month}</span>
                  </div>
                  <Title order={3}>{event.title}</Title>
                  <Text mt="sm">{event.copy}</Text>
                  <Anchor href={swarumYoutubeUrl} target="_blank" rel="noreferrer" className="events-link">
                    See the sound <span aria-hidden="true">↗</span>
                  </Anchor>
                </Paper>
              ))}
            </SimpleGrid>
          </Container>
        </section>

        <section className="events-video-section">
          <Container size="lg">
            <div className="events-section-heading events-video-heading">
              <div>
                <Text className="eyebrow">PERFORMANCE VIDEOS</Text>
                <Title order={2}>See Swarum Band in motion.</Title>
              </div>
              <Anchor href={swarumYoutubeUrl} target="_blank" rel="noreferrer" className="events-link">
                More videos on YouTube <span aria-hidden="true">↗</span>
              </Anchor>
            </div>
            <Carousel withIndicators withControls slideSize="100%" className="events-video-carousel">
              {youtubeVideos.map((video) => (
                <Carousel.Slide key={video.id}>
                  <div className="events-video-frame">
                    <iframe
                      title={video.title}
                      src={`https://www.youtube.com/embed/${video.id}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <Text className="events-video-title">{video.title}</Text>
                </Carousel.Slide>
              ))}
            </Carousel>
          </Container>
        </section>

        <section className="events-gallery-section">
          <Container size="lg">
            <div className="events-section-heading">
              <div>
                <Text className="eyebrow">BAND PERFORMANCE GALLERY</Text>
                <Title order={2}>A glimpse behind the sound.</Title>
              </div>
              <Text>The people, instruments and moments that make every Swarum performance personal.</Text>
            </div>
            <Carousel withIndicators withControls slideSize={{ base: '100%', sm: '50%', md: '33.333333%' }} slideGap="lg" className="events-gallery-carousel">
              {performanceGallery.map((item) => (
                <Carousel.Slide key={item.label}>
                  <div className="events-gallery-card">
                    <img src={item.image} alt={item.label} />
                    <Text>{item.label}</Text>
                  </div>
                </Carousel.Slide>
              ))}
            </Carousel>
          </Container>
        </section>

        <section className="about-page-cta events-cta">
          <Container size="lg" className="about-page-cta__inner">
            <Stack gap={6}>
              <Text className="eyebrow">YOUR NEXT LIVE MOMENT</Text>
              <Title order={2}>Bring your voice to the Swarum circle.</Title>
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


export default Events;
