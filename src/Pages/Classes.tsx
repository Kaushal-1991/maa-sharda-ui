import { Carousel } from '@mantine/carousel';
import { useEffect, useState } from 'react';
import { Anchor, Button, Container, Group, Paper, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
import classHeroImage from '../images/class-1.jpg';
import classTwoImage from '../images/class-2.jpg';
import classThreeImage from '../images/class-3.jpg';
import classFourImage from '../images/class-4.jpg';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

const classOptions = [
  { number: '01', icon: '♬', title: 'Classical Music', copy: 'Learn sur, taal, rhythm and expression through a patient classical foundation.' },
  { number: '02', icon: '♫', title: 'Light Music & Singing', copy: 'Develop your voice, confidence and feeling through songs you love to perform.' },
  { number: '03', icon: '🎹', title: 'Harmonium', copy: 'Understand accompaniment, chords and melody while supporting every performance.' },
  { number: '04', icon: '🎸', title: 'Guitar', copy: 'Start with chords and rhythm, then grow into expressive song-based playing.' },
];

const galleryItems = [
  { image: classTwoImage, label: 'class image' },
  { image: classThreeImage, label: 'class image' },
  { image: classFourImage, label: 'class image' },
];

const demoYoutubeVideoId = 'kJQP7kiw5Fk';
const tusharYoutubeSearchUrl = 'https://www.youtube.com/results?search_query=tushar+singh+thakur';
const youtubeApiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
const youtubeUploadsPlaylistId = process.env.REACT_APP_YOUTUBE_UPLOADS_PLAYLIST_ID;

type YoutubeVideo = {
  id: string;
  title: string;
};

const Classes = () => {
  const [youtubeVideos, setYoutubeVideos] = useState<YoutubeVideo[]>([
    { id: demoYoutubeVideoId, title: 'Demo music video' },
  ]);

  useEffect(() => {
    if (!youtubeApiKey || !youtubeUploadsPlaylistId) {
      return;
    }

    const loadYoutubeVideos = async () => {
      try {
        const params = new URLSearchParams({
          part: 'snippet',
          maxResults: '8',
          playlistId: youtubeUploadsPlaylistId,
          key: youtubeApiKey,
        });
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?${params.toString()}`,
        );

        if (!response.ok) {
          throw new Error('YouTube videos could not be loaded');
        }

        const data = await response.json();
        const videos = data.items
          .map((item: any) => ({
            id: item.snippet?.resourceId?.videoId,
            title: item.snippet?.title || 'Maa Sharda music video',
          }))
          .filter((video: YoutubeVideo) => video.id);

        if (videos.length > 0) {
          setYoutubeVideos(videos);
        }
      } catch {
        // Keep the demo video visible when the API is unavailable.
      }
    };

    loadYoutubeVideos();
  }, []);

  const featuredVideos = youtubeVideos.slice(0, 4);

  return (
    <div className="classes-page">
      <Header />
      <main>
        <section className="classes-hero">
          <Container size="lg" className="classes-hero__inner">
            <div className="classes-hero__copy">
              <Text className="eyebrow">MUSIC CLASSES IN KOLPANDAY</Text>
              <Title order={1}>Find the class that brings your sound alive.</Title>
              <Text className="classes-hero__lead">
                Maa Sharda Sangeet Academy in Kolpanday, Azamgarh, Uttar Pradesh is a welcoming
                space to learn music, practise with purpose and grow with confidence.
              </Text>
              <Group mt="xl" gap="sm">
                <Button component={Link} to="/register" className="hero-button" radius="md">
                  Join a class <span aria-hidden="true">→</span>
                </Button>
                <Anchor component={Link} to="/about" className="classes-link">Meet the mentor</Anchor>
              </Group>
            </div>
            <div className="classes-hero__image">
              <img src={classHeroImage} alt="Music learning at Maa Sharda Sangeet Academy" />
              <div className="classes-location-badge">
                <Text size="xs">OUR HOME</Text>
                <Text fw={700}>Kolpanday · Azamgarh · UP</Text>
              </div>
            </div>
          </Container>
        </section>

        <section className="class-list-section">
          <Container size="lg">
            <div className="classes-section-heading">
              <div>
                <Text className="eyebrow">WHAT WE TEACH</Text>
                <Title order={2}>A clear path from first note to full song.</Title>
              </div>
              <Text>Choose a direction, practise with guidance and let your own musical personality grow.</Text>
            </div>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
              {classOptions.map((musicClass) => (
                <Paper className="class-detail-card" key={musicClass.title} p="xl" radius="lg">
                  <div className="class-detail-card__top">
                    <span className="class-detail-card__icon">{musicClass.icon}</span>
                    <Text className="class-detail-card__number">{musicClass.number}</Text>
                  </div>
                  <Title order={3}>{musicClass.title}</Title>
                  <Text mt="sm">{musicClass.copy}</Text>
                </Paper>
              ))}
            </SimpleGrid>
          </Container>
        </section>

        <section className="classes-video-section">
          <Container size="lg" className="classes-video__inner">
            <div className="classes-video__copy">
              <Text className="eyebrow">SEE THE JOURNEY</Text>
              <Title order={2}>Music is easier to understand when you can feel it.</Title>
              <Text>Watch, listen and take inspiration from Indian music practice and performance. A good lesson begins with attention, then becomes expression.</Text>
              <Group gap="lg" mt="lg">
                <Anchor href={tusharYoutubeSearchUrl} target="_blank" rel="noreferrer" className="classes-link">
                  Tushar on YouTube <span aria-hidden="true">↗</span>
                </Anchor>
              </Group>
            </div>
            <Carousel
              withIndicators
              withControls
              slideSize="100%"
              className="youtube-video-carousel"
            >
              {featuredVideos.map((video) => (
                <Carousel.Slide key={video.id}>
                  <div className="classes-video-frame">
                    <iframe
                      title={video.title}
                      src={`https://www.youtube.com/embed/${video.id}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <Text className="youtube-video-title">{video.title}</Text>
                </Carousel.Slide>
              ))}
            </Carousel>
          </Container>
        </section>

        <section className="classes-gallery-section">
          <Container size="lg">
            <div className="classes-section-heading">
              <div>
                <Text className="eyebrow">A GLIMPSE INTO THE COMMUNITY</Text>
                <Title order={2}>Practice, perform and grow together.</Title>
              </div>
              <Text>Every musician brings a different colour to the academy.</Text>
            </div>
            <Carousel withIndicators withControls slideSize={{ base: '100%', sm: '50%', md: '33.333333%' }} slideGap="lg" className="classes-gallery-carousel">
              {galleryItems.map((item) => (
                <Carousel.Slide key={item.label}>
                  <div className="classes-gallery-card">
                    <img src={item.image} alt={item.label} />
                    {/* <Text>{item.label}</Text> */}
                  </div>
                </Carousel.Slide>
              ))}
            </Carousel>
          </Container>
        </section>

        <section className="about-page-cta classes-cta">
          <Container size="lg" className="about-page-cta__inner">
            <Stack gap={6}>
              <Text className="eyebrow">YOUR NEXT NOTE</Text>
              <Title order={2}>Ready to start learning in Kolpanday?</Title>
            </Stack>
            <Button component={Link} to="/register" className="hero-button" radius="md">Register now <span aria-hidden="true">→</span></Button>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Classes;
