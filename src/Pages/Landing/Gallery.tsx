import { Container, Modal, Tabs, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import {
  IconCalendarEvent,
  IconMusic,
  IconPhoto,
  IconSchool,
  IconSparkles,
  IconUpload,
  IconVideo,
  IconZoomIn,
} from "@tabler/icons-react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import classOneImage from "../../images/class-1.jpg";
import classTwoImage from "../../images/class-2.jpg";
import classThreeImage from "../../images/class-3.jpg";
import classFourImage from "../../images/class-4.jpg";
import albumCoverImage from "../../images/classical-sitar-background.png";
import eventOneImage from "../../images/event-1.jpg";
import eventTwoImage from "../../images/event-2.jpg";
import eventThreeImage from "../../images/event-3.jpg";
import eventFourImage from "../../images/event-4.jpg";
import eventFiveImage from "../../images/event-5.jpg";
import {
  GalleryCategory,
  GalleryMediaRecord,
  getGalleryMedia,
} from "../../Service/GalleryMediaService";

type GalleryMediaType = "photos" | "videos";

type GalleryProps = {
  mediaType: GalleryMediaType;
};

const eventPhotos = [
  { image: eventOneImage, label: "Swarum Band live performance" },
  { image: eventTwoImage, label: "Live singing at a music event" },
  { image: eventThreeImage, label: "Musicians performing together" },
  { image: eventFourImage, label: "A soulful musical performance" },
  { image: eventFiveImage, label: "Live music accompaniment" },
];

const classPhotos = [
  { image: classOneImage, label: "Music class at Maa Sharda Sangeet Academy" },
  { image: classTwoImage, label: "Students learning music" },
  { image: classThreeImage, label: "Music practice session" },
  { image: classFourImage, label: "Classroom music learning" },
];


const GalleryVideo = ({ src, label, category }: { src: string; label: string; category: GalleryCategory }) => {
  const fallbackPoster = category === "album" ? albumCoverImage : category === "classes" ? classOneImage : eventOneImage;
  const [poster, setPoster] = useState<string>();
  useEffect(() => {
    let cancelled = false;
    const preview = document.createElement("video");
    preview.muted = true;
    preview.playsInline = true;
    preview.preload = "auto";
    preview.onloadeddata = () => {
      if (cancelled || !preview.videoWidth || !preview.videoHeight) return;
      const scale = Math.min(1, 640 / preview.videoWidth);
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(preview.videoWidth * scale);
      canvas.height = Math.round(preview.videoHeight * scale);
      const context = canvas.getContext("2d");
      if (!context) return;
      context.drawImage(preview, 0, 0, canvas.width, canvas.height);
      try {
        setPoster(canvas.toDataURL("image/jpeg", 0.82));
      } catch {
        // The video remains playable if its browser cannot create a cover image.
      }
      preview.pause();
      preview.removeAttribute("src");
      preview.load();
    };
    preview.src = src;
    preview.load();
    return () => {
      cancelled = true;
      preview.pause();
      preview.removeAttribute("src");
      preview.load();
    };
  }, [src]);

  return <video src={src} poster={poster || fallbackPoster} controls preload="metadata" aria-label={label} />;
};

const Gallery = ({ mediaType }: GalleryProps) => {
  const isPhotos = mediaType === "photos";
  const [activeTab, setActiveTab] = useState<string | null>("events");
  const activeCategory: GalleryCategory =
    activeTab === "classes" || activeTab === "album" ? activeTab : "events";
  const [selectedPhoto, setSelectedPhoto] = useState<
    (typeof eventPhotos)[number] | null
  >(null);
  const [uploadedMedia, setUploadedMedia] = useState<
    { record: GalleryMediaRecord; url: string }[]
  >([]);
  const [loadingMedia, setLoadingMedia] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let objectUrls: string[] = [];
    setUploadedMedia([]);
    setLoadingMedia(true);

    getGalleryMedia(mediaType, activeCategory)
      .then((records) => {
        const entries = records.flatMap((record) => {
          if (record.videoUrl) return [{ record, url: record.videoUrl }];
          if (!record.file) return [];

          const url = URL.createObjectURL(record.file);
          objectUrls.push(url);
          return [{ record, url }];
        });

        if (cancelled) {
          objectUrls.forEach((url) => URL.revokeObjectURL(url));
        } else {
          setUploadedMedia(entries);
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          console.error("Could not load gallery media.", error);
        }
      })
      .finally(() => {
        if (!cancelled) setLoadingMedia(false);
      });

    return () => {
      cancelled = true;
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [activeCategory, mediaType]);

  useEffect(() => {
    if (isPhotos && activeTab === "album") setActiveTab("events");
  }, [activeTab, isPhotos]);

  const renderPhotos = (photos: typeof eventPhotos) => (
    <div className="gallery-photo-grid">
      {photos.map((photo, index) => (
        <figure className="gallery-photo-card" key={`${index}-${photo.label}`}>
          <button
            type="button"
            className="gallery-photo-button"
            onClick={() => setSelectedPhoto(photo)}
            aria-label={`Open photo: ${photo.label}`}
          >
            <img src={photo.image} alt={photo.label} loading="lazy" />
            <span className="gallery-photo-zoom" aria-hidden="true">
              <IconZoomIn size={20} />
            </span>
          </button>
        </figure>
      ))}
    </div>
  );

  const renderVideos = () =>
    loadingMedia ? (
      <Text c="dimmed">Loading videos…</Text>
    ) : uploadedMedia.length > 0 ? (
      <div className="gallery-video-grid">
        {uploadedMedia.map(({ record, url }) => (
          <figure className="gallery-video-card" key={record.id}>
            <GalleryVideo src={url} label={record.name} category={record.category} />
          </figure>
        ))}
      </div>
    ) : (
      <div className="gallery-empty-state">
        <span className="gallery-empty-state__icon" aria-hidden="true">
          <IconVideo size={30} stroke={1.5} />
          <IconUpload size={16} stroke={1.8} />
        </span>
        <div className="gallery-empty-state__copy">
          <Text className="eyebrow">COMING SOON</Text>
          <Title order={3}>The next performance is on its way.</Title>
          <Text>Academy videos will appear here as soon as they are added.</Text>
        </div>
      </div>
    );

  return (
    <div className="gallery-page">
      <Header />
      <Modal
        opened={selectedPhoto !== null}
        onClose={() => setSelectedPhoto(null)}
        title={selectedPhoto?.label}
        centered
        size="auto"
        classNames={{ content: "gallery-photo-modal", body: "gallery-photo-modal__body" }}
      >
        {selectedPhoto && (
          <img
            className="gallery-photo-modal__image"
            src={selectedPhoto.image}
            alt={selectedPhoto.label}
          />
        )}
      </Modal>
      <main>
        <section className={`gallery-hero gallery-hero--${mediaType}`}>
          <Container size="lg" className="gallery-hero__inner">
            <div className="gallery-hero__copy">
              <Text className="eyebrow">MOMENTS IN MUSIC</Text>
              <Title order={1}>{isPhotos ? "Photo Gallery" : "Video Gallery"}</Title>
              <Text>
                Explore performances, events and music learning at Maa Sharda
                Sangeet Academy.
              </Text>
            </div>
            <div className="gallery-hero__visual" aria-hidden="true">
              {isPhotos ? (
                <IconPhoto size={104} stroke={1.2} color="#f4c98d" />
              ) : (
                <IconVideo size={104} stroke={1.2} color="#f4c98d" />
              )}
            </div>
          </Container>
        </section>
        <section className={`gallery-content gallery-content--${mediaType}`}>
          <Container size="lg">
            <Tabs
              value={activeTab}
              onChange={setActiveTab}
              keepMounted={false}
              variant="unstyled"
              className="gallery-tabs"
            >
              <Tabs.List>
                <Tabs.Tab value="events" leftSection={<IconCalendarEvent size={19} stroke={1.7} color="#b7791f" />}>
                  Events
                </Tabs.Tab>
                <Tabs.Tab value="classes" leftSection={<IconSchool size={19} stroke={1.7} color="#9f1239" />}>
                  Classes
                </Tabs.Tab>
                {!isPhotos && (
                  <Tabs.Tab value="album" leftSection={<IconPhoto size={19} stroke={1.7} color="#d49a43" />}>
                    Album
                  </Tabs.Tab>
                )}
              </Tabs.List>
              <div className="gallery-section-heading" key={`${mediaType}-${activeTab}`}>
                <div className="gallery-section-heading__text">
                  <Text className="eyebrow">
                    {activeTab === "classes" ? "LEARNING TOGETHER" : activeTab === "album" ? "ACADEMY MOMENTS" : "LIVE & IN TUNE"}
                  </Text>
                  <Title order={2}>
                    {activeTab === "classes" ? "Music from our classes" : activeTab === "album" ? "Videos from our academy" : "Memories from our events"}
                  </Title>
                  <Text className="gallery-section-heading__copy">
                    {activeTab === "classes"
                      ? "A glimpse of the practice, progress and joy in every lesson."
                      : activeTab === "album"
                        ? "Watch the moments shared by our academy."
                        : "Celebrating the artists, performances and moments we share."}
                  </Text>
                </div>
                <div className="gallery-section-heading__art" aria-hidden="true">
                  <span className="gallery-section-heading__art-disc">
                    {isPhotos ? (
                      <IconPhoto size={34} stroke={1.4} color="#f4c98d" />
                    ) : (
                      <IconVideo size={34} stroke={1.4} color="#f4c98d" />
                    )}
                  </span>
                  <IconMusic className="gallery-section-heading__art-note" size={25} stroke={1.6} color="#b7791f" />
                  <IconSparkles className="gallery-section-heading__art-spark" size={20} stroke={1.6} color="#9f1239" />
                </div>
              </div>
              <Tabs.Panel value="events" pt="xl">
                {isPhotos
                  ? renderPhotos([
                      ...eventPhotos,
                      ...uploadedMedia.map(({ record, url }) => ({
                        image: url,
                        label: record.name,
                      })),
                    ])
                  : renderVideos()}
              </Tabs.Panel>
              <Tabs.Panel value="classes" pt="xl">
                {isPhotos
                  ? renderPhotos([
                      ...classPhotos,
                      ...uploadedMedia.map(({ record, url }) => ({
                        image: url,
                        label: record.name,
                      })),
                    ])
                  : renderVideos()}
              </Tabs.Panel>
              {!isPhotos && (
                <Tabs.Panel value="album" pt="xl">
                  {renderVideos()}
                </Tabs.Panel>
              )}
            </Tabs>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Gallery;
