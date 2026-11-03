"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import classOne from "../../images/class-1.jpg";
import classTwo from "../../images/class-2.jpg";
import classThree from "../../images/class-3.jpg";
import classFour from "../../images/class-4.jpg";
import eventOne from "../../images/event-1.jpg";
import eventTwo from "../../images/event-2.jpg";
import eventThree from "../../images/event-3.jpg";
import eventFour from "../../images/event-4.jpg";
import eventFive from "../../images/event-5.jpg";

const photos: { title: string; src: StaticImageData }[] = [
  { title: "Finding the rhythm", src: classOne },
  { title: "A moment on stage", src: eventOne },
  { title: "Learning together", src: classTwo },
  { title: "Music in practice", src: eventTwo },
  { title: "Growing confidence", src: classThree },
  { title: "A day to remember", src: eventThree },
  { title: "Every note matters", src: classFour },
  { title: "Celebrating music", src: eventFour },
  { title: "Our academy moments", src: eventFive },
];

type Photo = { title: string; src: StaticImageData | string };

type GalleryResponse = {
  media?: { id: string; name: string; url: string }[];
  error?: string;
};

function photoTitle(name: string): string {
  return name.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ");
}

export default function GalleryPhotos() {
  const [galleryPhotos, setGalleryPhotos] = useState<Photo[]>(photos);
  const [loadError, setLoadError] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isLightboxOpen = selectedIndex !== null;

  useEffect(() => {
    const controller = new AbortController();

    async function loadPhotos() {
      try {
        const response = await fetch("/api/gallery?type=photos&limit=50", {
          signal: controller.signal,
          cache: "no-store",
        });
        const result = (await response.json()) as GalleryResponse;
        if (!response.ok) {
          throw new Error(result.error || "Unable to load gallery photos.");
        }
        if (result.media?.length) {
          setSelectedIndex(null);
          setGalleryPhotos(
            result.media.map((photo) => ({
              title: photoTitle(photo.name),
              src: photo.url,
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
            : "Unable to load gallery photos. Sample photos are shown instead.",
        );
      }
    }

    void loadPhotos();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!isLightboxOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedIndex(null);
      } else if (event.key === "ArrowRight") {
        setSelectedIndex((index) =>
          index === null ? null : (index + 1) % galleryPhotos.length,
        );
      } else if (event.key === "ArrowLeft") {
        setSelectedIndex((index) =>
          index === null ? null : (index - 1 + galleryPhotos.length) % galleryPhotos.length,
        );
      } else if (event.key === "Tab") {
        const buttons =
          lightboxRef.current?.querySelectorAll<HTMLButtonElement>(
            "button:not([disabled])",
          );
        if (!buttons?.length) {
          return;
        }

        const firstButton = buttons[0];
        const lastButton = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === firstButton) {
          event.preventDefault();
          lastButton.focus();
        } else if (!event.shiftKey && document.activeElement === lastButton) {
          event.preventDefault();
          firstButton.focus();
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus();
      }
    };
  }, [isLightboxOpen, galleryPhotos.length]);

  const selectedPhoto =
    selectedIndex === null ? null : galleryPhotos[selectedIndex];

  return (
    <>
      {loadError ? (
        <p className="gallery-load-notice" role="status">{loadError}</p>
      ) : null}
      <div className="gallery-showcase-grid">
        {galleryPhotos.map((photo, index) => (
          <button
            type="button"
            className="gallery-showcase-card"
            key={`${photo.title}-${index}`}
            onClick={() => setSelectedIndex(index)}
            aria-label={`View photo: ${photo.title}`}
          >
            {typeof photo.src === "string" ? (
              <img src={photo.src} alt={photo.title} loading="lazy" />
            ) : (
              <Image
                src={photo.src}
                alt={photo.title}
                width={photo.src.width}
                height={photo.src.height}
                sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw"
              />
            )}
            <span className="gallery-showcase-card__caption">
              <span>{photo.title}</span>
              <span aria-hidden="true">↗</span>
            </span>
          </button>
        ))}
      </div>

      {selectedPhoto && (
        <div
          ref={lightboxRef}
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={selectedPhoto.title}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedIndex(null);
            }
          }}
        >
          <button
            type="button"
            className="gallery-lightbox__close"
            ref={closeButtonRef}
            onClick={() => setSelectedIndex(null)}
            aria-label="Close photo"
          >
            ×
          </button>
          <button
            type="button"
            className="gallery-lightbox__arrow gallery-lightbox__arrow--previous"
            onClick={() =>
              setSelectedIndex((index) =>
                index === null ? null : (index - 1 + galleryPhotos.length) % galleryPhotos.length,
              )
            }
            aria-label="Previous photo"
          >
            ‹
          </button>
          <figure className="gallery-lightbox__figure">
            <img
              src={typeof selectedPhoto.src === "string" ? selectedPhoto.src : selectedPhoto.src.src}
              alt={selectedPhoto.title}
            />
            <figcaption>
              <span>{selectedPhoto.title}</span>
              <span>
                {(selectedIndex ?? 0) + 1} / {galleryPhotos.length}
              </span>
            </figcaption>
          </figure>
          <button
            type="button"
            className="gallery-lightbox__arrow gallery-lightbox__arrow--next"
            onClick={() =>
              setSelectedIndex((index) =>
                index === null ? null : (index + 1) % galleryPhotos.length,
              )
            }
            aria-label="Next photo"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
