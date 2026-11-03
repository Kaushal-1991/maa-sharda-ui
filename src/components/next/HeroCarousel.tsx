"use client";

import Image from "next/image";
import {
  type KeyboardEvent as ReactKeyboardEvent,
  type TouchEvent as ReactTouchEvent,
  useEffect,
  useRef,
  useState,
} from "react";

const slideDuration = 4000;

const slides = [
  {
    src: "/academy-banner-1.png",
    alt: "Maa Sharda Sangeet Academy banner with Goddess Saraswati, music courses and students",
  },
  {
    src: "/academy-banner-2.png",
    alt: "Maa Sharda Sangeet Academy banner featuring a music teacher and students",
  },
  {
    src: "/academy-banner-3.png",
    alt: "Maa Sharda Sangeet Academy banner with Goddess Saraswati and a tabla performer",
  },
];

export default function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (
      isPaused ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const timer = window.setTimeout(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, slideDuration);

    return () => window.clearTimeout(timer);
  }, [activeSlide, isPaused]);

  function showSlide(index: number) {
    setActiveSlide((index + slides.length) % slides.length);
  }

  function handleKeyDown(event: ReactKeyboardEvent<HTMLElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showSlide(activeSlide - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      showSlide(activeSlide + 1);
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
      showSlide(activeSlide + (deltaX < 0 ? 1 : -1));
    }
  }

  return (
    <section
      className="banner-carousel"
      aria-label="Maa Sharda Sangeet Academy banners"
      aria-roledescription="carousel"
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(event) => {
        if (
          !(event.relatedTarget instanceof Node) ||
          !event.currentTarget.contains(event.relatedTarget)
        ) {
          setIsPaused(false);
        }
      }}
    >
      <h1 className="banner-carousel__heading">Maa Sharda Sangeet Academy</h1>
      <div
        className="banner-carousel__frame"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, index) => (
          <div
            className={`banner-carousel__slide${index === activeSlide ? " is-active" : ""}`}
            aria-hidden={index !== activeSlide}
            key={slide.src}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="banner-carousel__image"
            />
          </div>
        ))}

        <button
          type="button"
          className="banner-carousel__arrow banner-carousel__arrow--previous"
          aria-label="Previous banner"
          onClick={() => showSlide(activeSlide - 1)}
        >
          <span aria-hidden="true">‹</span>
        </button>
        <button
          type="button"
          className="banner-carousel__arrow banner-carousel__arrow--next"
          aria-label="Next banner"
          onClick={() => showSlide(activeSlide + 1)}
        >
          <span aria-hidden="true">›</span>
        </button>

        <div className="banner-carousel__indicators" role="group" aria-label="Choose a banner">
          {slides.map((slide, index) => (
            <button
              type="button"
              key={slide.src}
              className={`banner-carousel__indicator${index === activeSlide ? " is-active" : ""}`}
              aria-label={`Show banner ${index + 1}`}
              aria-current={index === activeSlide ? "true" : undefined}
              onClick={() => showSlide(index)}
            />
          ))}
        </div>
      </div>
      <span className="banner-carousel__status" aria-live="polite" aria-atomic="true">
        Banner {activeSlide + 1} of {slides.length}
      </span>
    </section>
  );
}
