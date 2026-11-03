"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import {
  type KeyboardEvent as ReactKeyboardEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import classOne from "../../images/class-1.jpg";
import classTwo from "../../images/class-2.jpg";
import classThree from "../../images/class-3.jpg";
import eventOne from "../../images/event-1.jpg";
import eventTwo from "../../images/event-2.jpg";
import eventThree from "../../images/event-3.jpg";
import eventFour from "../../images/event-4.jpg";

type Photo = {
  id: string;
  name: string;
  url: string | StaticImageData;
};

type GalleryResponse = {
  media?: { id: string; name: string; url: string }[];
  error?: string;
};

const samplePhotos: Photo[] = [
  { id: "sample-class-one", name: "Learning together", url: classOne },
  { id: "sample-event-one", name: "A moment on stage", url: eventOne },
  { id: "sample-class-two", name: "Finding the rhythm", url: classTwo },
  { id: "sample-event-two", name: "Music in practice", url: eventTwo },
  { id: "sample-class-three", name: "Growing confidence", url: classThree },
  { id: "sample-event-three", name: "Celebrating music", url: eventThree },
  { id: "sample-event-four", name: "Our academy moments", url: eventFour },
];

export default function RecentGalleryPhotos() {
  const [photos, setPhotos] = useState<Photo[]>(samplePhotos);
  const [loadError, setLoadError] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const [isPaused, setIsPaused] = useState(false);

  const moveCarousel = useCallback((direction: -1 | 1) => {
    setActiveIndex((current) => {
      return (current + direction + photos.length) % photos.length;
    });
  }, [photos.length]);

  useEffect(() => {
    function updateVisibleCount() {
      if (window.innerWidth <= 520) {
        setVisibleCount(1);
      } else if (window.innerWidth <= 760) {
        setVisibleCount(2);
      } else if (window.innerWidth <= 1000) {
        setVisibleCount(3);
      } else {
        setVisibleCount(4);
      }
    }

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadRecentPhotos() {
      try {
        const response = await fetch("/api/gallery?type=photos&limit=7", {
          signal: controller.signal,
          cache: "no-store",
        });
        const result = (await response.json()) as GalleryResponse;
        if (!response.ok) {
          throw new Error(result.error || "Unable to load recent academy photos.");
        }
        if (result.media?.length) {
          setActiveIndex(0);
          setPhotos(
            result.media.slice(0, 7).map((photo) => ({
              id: photo.id,
              name: photo.name.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " "),
              url: photo.url,
            })),
          );
        }
        setLoadError("");
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        setLoadError(
          error instanceof Error
            ? `${error.message} Sample photos are shown instead.`
            : "Unable to load recent academy photos. Sample photos are shown instead.",
        );
      }
    }

    void loadRecentPhotos();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (
      isPaused ||
      photos.length <= visibleCount ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % photos.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [activeIndex, isPaused, photos.length, visibleCount]);

  function handleCarouselKeyDown(event: ReactKeyboardEvent<HTMLElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveCarousel(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      moveCarousel(1);
    }
  }

  const visiblePhotos = Array.from(
    { length: Math.min(visibleCount, photos.length) },
    (_, offset) => ({
      photo: photos[(activeIndex + offset) % photos.length],
      index: (activeIndex + offset) % photos.length,
    }),
  );
  const hasMultipleSets = photos.length > visibleCount;

  return (
    <section
      className="home-recent-gallery"
      aria-labelledby="home-recent-gallery-title"
      aria-roledescription="carousel"
      onKeyDown={handleCarouselKeyDown}
    >
      <div className="page-width">
        <div className="home-recent-gallery__heading">
          <div>
            <p className="eyebrow">From our community</p>
            <h2 id="home-recent-gallery-title">Recent moments in music</h2>
            <p>Practice, performances and memories from the academy.</p>
          </div>
          <div className="home-recent-gallery__actions">
            {hasMultipleSets ? (
              <div className="home-recent-gallery__controls" role="group" aria-label="Photo carousel controls">
                <button
                  type="button"
                  onClick={() => moveCarousel(-1)}
                  aria-label="Show previous photos"
                >
                  <span aria-hidden="true">←</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsPaused((paused) => !paused)}
                  aria-label={isPaused ? "Play photo carousel" : "Pause photo carousel"}
                >
                  <span aria-hidden="true">{isPaused ? "▶" : "Ⅱ"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => moveCarousel(1)}
                  aria-label="Show next photos"
                >
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            ) : null}
            <Link href="/gallery/photos" className="home-recent-gallery__link">
              View full gallery <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        {loadError ? <p className="home-recent-gallery__notice" role="status">{loadError}</p> : null}
        <div
          className="home-recent-gallery__grid"
          role="group"
          aria-label="Recent academy photos"
        >
          {visiblePhotos.map(({ photo, index }) => (
            <Link
              className="home-recent-gallery__photo"
              href="/gallery/photos"
              key={`${photo.id}-${activeIndex}`}
              aria-label={`Photo ${index + 1} of ${photos.length}: ${photo.name}`}
            >
              <span className="home-recent-gallery__image">
                <Image
                  src={photo.url}
                  alt={photo.name}
                  fill
                  sizes="(max-width: 520px) 100vw, (max-width: 760px) 50vw, (max-width: 1000px) 33vw, 25vw"
                  unoptimized={typeof photo.url === "string"}
                />
              </span>
              <span className="home-recent-gallery__caption">
                <span>{photo.name}</span>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
