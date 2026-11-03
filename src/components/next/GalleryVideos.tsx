"use client";

import { useEffect, useState } from "react";

type Video = {
  id: string;
  name: string;
  url: string;
};

type GalleryResponse = {
  media?: Video[];
  error?: string;
};

export default function GalleryVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadVideos() {
      try {
        const response = await fetch("/api/gallery?type=videos&limit=50", {
          signal: controller.signal,
          cache: "no-store",
        });
        const result = (await response.json()) as GalleryResponse;
        if (!response.ok) {
          throw new Error(result.error || "Unable to load gallery videos.");
        }
        setVideos(result.media ?? []);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        setLoadError(
          error instanceof Error ? error.message : "Unable to load gallery videos.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    void loadVideos();
    return () => controller.abort();
  }, []);

  return (
    <>
      {isLoading ? <p className="gallery-video-empty">Loading academy videos…</p> : null}
      {loadError ? <p className="gallery-video-empty" role="alert">{loadError}</p> : null}
      <div className="gallery-video-library">
        {!isLoading && videos.length ? (
          <div className="gallery-video-list">
            {videos.map((video, index) => (
              <article className="gallery-video-card" key={video.id}>
                <div className="gallery-video-card__frame">
                  <video src={video.url} controls preload="metadata" playsInline>
                    Your browser does not support video playback.
                  </video>
                </div>
                <div className="gallery-video-card__caption">
                  <span className="gallery-video-card__icon" aria-hidden="true">♫</span>
                  <div>
                    <h3>{video.name.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ")}</h3>
                    <p>Academy performance <span aria-hidden="true">·</span> {String(index + 1).padStart(2, "0")}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : null}
        <article className="gallery-video-card gallery-video-card--featured">
          <div className="gallery-video-card__frame">
            <iframe
              src="https://www.youtube-nocookie.com/embed/IK_88DGa2m8?rel=0"
              title="Music performance by Maa Sharda Sangeet Academy"
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <div className="gallery-video-card__caption">
            <span className="gallery-video-card__icon" aria-hidden="true">♫</span>
            <div>
              <p className="gallery-video-card__eyebrow">Featured performance</p>
              <h3>A musical moment</h3>
              <p>Listen, feel the rhythm and find inspiration in every note.</p>
            </div>
            <a
              href="https://www.youtube.com/watch?v=IK_88DGa2m8"
              target="_blank"
              rel="noreferrer"
            >
              Open on YouTube <span aria-hidden="true">↗</span>
            </a>
          </div>
        </article>
        {!isLoading && !loadError && videos.length === 0 ? (
          <p className="gallery-video-empty gallery-video-empty--hint">
            More academy videos will appear here as they are uploaded.
          </p>
        ) : null}
      </div>
    </>
  );
}
