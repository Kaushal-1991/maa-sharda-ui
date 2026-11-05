import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PublicReviewsPage from "../../../components/next/PublicReviewsPage";

export const metadata: Metadata = {
  title: "Reviews & Ratings",
  description:
    "Read learner reviews and share your experience at Maa Sharda Sangeet Academy.",
};

export default function ReviewsPage() {
  return (
    <main>
      <section className="reviews-page-banner" aria-label="Maa Sharda reviews and ratings banner">
        <div className="reviews-page-banner__media">
          <Image
            src="/reviews-banner.png"
            alt="Maa Sharda Sangeet Academy Reviews & Ratings banner"
            fill
            priority
            sizes="100vw"
          />
        </div>
      </section>

      <section className="music-ribbon" aria-label="Explore the academy">
        <div className="music-ribbon__inner page-width">
          <p className="music-ribbon__label">
            <span aria-hidden="true">♪</span>
            Voices of our community
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
          <a href="#share-review" className="music-ribbon__cta">
            Share your story <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <PublicReviewsPage />
    </main>
  );
}
