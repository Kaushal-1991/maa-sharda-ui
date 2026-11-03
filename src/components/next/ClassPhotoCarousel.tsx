"use client";

import Image, { type StaticImageData } from "next/image";
import {
  type KeyboardEvent as ReactKeyboardEvent,
  type TouchEvent as ReactTouchEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import eventOne from "../../images/event-1.jpg";
import eventTwo from "../../images/event-2.jpg";
import eventThree from "../../images/event-3.jpg";
import eventFour from "../../images/event-4.jpg";

const slideDuration = 5000;

const photos: { image: StaticImageData; alt: string }[] = [
  { image: eventOne, alt: "Students sharing a musical moment at the academy" },
  { image: eventTwo, alt: "A live performance at Maa Sharda Sangeet Academy" },
  { image: eventThree, alt: "Academy students celebrating their musical journey" },
  { image: eventFour, alt: "Students enjoying a music event at the academy" },
];

export default function ClassPhotoCarousel() {
  const [activePhoto, setActivePhoto] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timer = window.setTimeout(() => {
      setActivePhoto((current) => (current + 1) % photos.length);
    }, slideDuration);

    return () => window.clearTimeout(timer);
  }, [activePhoto]);

  function showPhoto(index: number) {
    setActivePhoto((index + photos.length) % photos.length);
  }

  function handleKeyDown(event: ReactKeyboardEvent<HTMLElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPhoto(activePhoto - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      showPhoto(activePhoto + 1);
    }
  }

  function handleTouchStart(event: ReactTouchEvent<HTMLDivElement>) {
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  }

  function handleTouchEnd(event: ReactTouchEvent<HTMLDivElement>) {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) {
      return;
    }

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    if (Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY)) {
      showPhoto(activePhoto + (deltaX < 0 ? 1 : -1));
    }
  }

  const visiblePhotos = [-1, 0, 1].map((offset) => {
    const index = (activePhoto + offset + photos.length) % photos.length;
    return { ...photos[index], index, offset };
  });

  return (
    <section
      className="class-photo-carousel"
      aria-label="Academy photos"
      aria-roledescription="carousel"
      onKeyDown={handleKeyDown}
    >
      <h2 className="class-photo-carousel__title">Moments in music</h2>
      <div className="class-photo-carousel__instruments" aria-hidden="true">
        <span className="class-photo-carousel__instrument class-photo-carousel__instrument--guitar">🎸</span>
        <span className="class-photo-carousel__instrument class-photo-carousel__instrument--piano">🎹</span>
        <span className="class-photo-carousel__instrument class-photo-carousel__instrument--violin">🎻</span>
        <span className="class-photo-carousel__instrument class-photo-carousel__instrument--drum">🥁</span>
      </div>
      <div
        className="class-photo-carousel__frame"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {visiblePhotos.map((photo) => (
          <div
            className={`class-photo-carousel__slide${photo.offset === 0 ? " is-active" : ""}`}
            aria-hidden={photo.offset !== 0}
            key={photo.index}
          >
            <Image
              src={photo.image}
              alt={photo.alt}
              fill
              sizes="(max-width: 760px) 88vw, (max-width: 1100px) 42vw, 360px"
              className="class-photo-carousel__image"
              priority={photo.index === 0}
            />
          </div>
        ))}

        <button
          type="button"
          className="class-photo-carousel__arrow class-photo-carousel__arrow--previous"
          aria-label="Previous photo"
          onClick={() => showPhoto(activePhoto - 1)}
        >
          <span aria-hidden="true">‹</span>
        </button>
        <button
          type="button"
          className="class-photo-carousel__arrow class-photo-carousel__arrow--next"
          aria-label="Next photo"
          onClick={() => showPhoto(activePhoto + 1)}
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>
    </section>
  );
}
