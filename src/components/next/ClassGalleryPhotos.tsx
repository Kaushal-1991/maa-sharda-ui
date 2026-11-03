"use client";

import { useEffect, useState } from "react";

type ClassPhoto = {
  id: string;
  name: string;
  url: string;
};

type ClassGalleryResponse = {
  media?: ClassPhoto[];
  error?: string;
};

function photoTitle(name: string) {
  return name.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ");
}

export default function ClassGalleryPhotos() {
  const [photos, setPhotos] = useState<ClassPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadPhotos() {
      try {
        const response = await fetch(
          "/api/gallery?type=photos&category=classes&limit=7",
          { signal: controller.signal, cache: "no-store" },
        );
        const result: ClassGalleryResponse = await response.json();
        if (!response.ok) {
          throw new Error(result.error || "Unable to load class photos.");
        }
        setPhotos((result.media ?? []).slice(0, 7));
      } catch (loadError) {
        if (loadError instanceof DOMException && loadError.name === "AbortError") {
          return;
        }
        setError(
          loadError instanceof Error ? loadError.message : "Unable to load class photos.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    void loadPhotos();
    return () => controller.abort();
  }, []);

  if (!isLoading && !error && photos.length === 0) {
    return null;
  }

  return (
    <section className="class-photo-gallery" aria-labelledby="class-photo-gallery-title">
      <div className="page-width">
        <header className="class-photo-gallery__heading">
          <div>
            <p className="eyebrow">Life in the classroom</p>
            <h2 id="class-photo-gallery-title">Learning, one note at a time.</h2>
            <p>Real moments from lessons, practice and our growing music community.</p>
          </div>
          <span>{photos.length || (isLoading ? "…" : "0")} / 7 photos</span>
        </header>
        {error ? <p className="class-photo-gallery__error" role="status">{error}</p> : null}
        {isLoading ? <p className="class-photo-gallery__loading">Loading class photos…</p> : null}
        {!isLoading && photos.length ? (
          <div className="class-photo-gallery__grid">
            {photos.map((photo, index) => (
              <figure className="class-photo-gallery__item" key={photo.id}>
                <img
                  src={photo.url}
                  alt={photoTitle(photo.name)}
                  loading={index < 3 ? "eager" : "lazy"}
                />
                <figcaption>
                  <span>{photoTitle(photo.name)}</span>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
