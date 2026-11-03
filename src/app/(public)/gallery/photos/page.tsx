import type { Metadata } from "next";
import Link from "next/link";
import GalleryPhotos from "../../../../components/next/GalleryPhotos";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Explore moments of music, learning and performance at Maa Sharda Sangeet Academy.",
};

export default function GalleryPhotosPage() {
  return (
    <main>
      <section className="gallery-banner" aria-label="Maa Sharda Sangeet Academy gallery">
        <img
          src="/gallery-banner.png"
          alt="Maa Sharda Sangeet Academy gallery — explore our music journey"
        />
      </section>

      <section className="music-ribbon" aria-label="Explore music courses">
        <div className="music-ribbon__inner page-width">
          <p className="music-ribbon__label">
            <span aria-hidden="true">♪</span>
            Learn · Play · Grow
          </p>
          <div className="music-ribbon__courses">
            <Link href="/classes">Classical music</Link>
            <span aria-hidden="true">✦</span>
            <Link href="/classes">Singing</Link>
            <span aria-hidden="true">✦</span>
            <Link href="/classes">Harmonium</Link>
            <span aria-hidden="true">✦</span>
            <Link href="/classes">Guitar</Link>
          </div>
          <Link href="/classes" className="music-ribbon__cta">
            Explore classes <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="page-section gallery-page-section">
        <div className="page-width">
          <nav className="gallery-tabs" aria-label="Gallery type">
            <Link href="/gallery/photos" aria-current="page" className="is-active">
              Photos
            </Link>
            <Link href="/gallery/videos">Videos</Link>
          </nav>
          <div className="gallery-section-heading">
            <div>
              <p className="eyebrow">Life at the academy</p>
              <h1>Little moments. Lasting melodies.</h1>
              <p className="gallery-section-heading__intro">
                A glimpse of the practice, performances and people that make
                our musical community special.
              </p>
            </div>
            <p className="gallery-section-heading__hint">
              <span aria-hidden="true">⌕</span>
              Select a photo to view it up close
            </p>
          </div>
          <GalleryPhotos />
        </div>
      </section>
    </main>
  );
}
