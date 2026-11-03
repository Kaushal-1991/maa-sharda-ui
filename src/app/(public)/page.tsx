import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { defaultClasses } from "../../data/classes";
import HeroCarousel from "../../components/next/HeroCarousel";
import RecentGalleryPhotos from "../../components/next/RecentGalleryPhotos";
import guitaristImage from "../../images/about-image.jpg";

const classSymbols: Record<string, string> = {
  "classical-music": "𝄞",
  "light-music": "♫",
  harmonium: "♬",
  guitar: "♪",
};

export const metadata: Metadata = {
  title: "Home",
  description:
    "Maa Sharda Sangeet Academy offers classical music, light music, harmonium and guitar classes in Azamgarh.",
};

export default function HomePage() {
  return (
    <main>
      <HeroCarousel />

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

      <section className="section academy-story" id="about">
        <div className="page-width split academy-story__layout">
          <div className="academy-story__visual">
            <div className="academy-story__image">
              <Image
                src={guitaristImage}
                alt="Tushar singing and playing guitar"
                sizes="(max-width: 760px) 100vw, 46vw"
              />
            </div>
            <div className="academy-story__photo-note">
              <span aria-hidden="true">♪</span>
              <span>
                <strong>Learn with joy</strong>
                <small>Music for every stage</small>
              </span>
            </div>
            <span className="academy-story__spark academy-story__spark--one" aria-hidden="true">✦</span>
            <span className="academy-story__spark academy-story__spark--two" aria-hidden="true">♪</span>
          </div>
          <div className="content-copy">
            <p className="eyebrow academy-story__eyebrow">A little about us</p>
            <h2>
              Find your voice.
              <span> Make music your own.</span>
            </h2>
            <div className="academy-story__rule" aria-hidden="true">
              <span>♪</span>
            </div>
            <p>
              Maa Sharda Sangeet Academy is a welcoming music learning space
              built around patience, creativity and steady progress. Guided by a
              commitment to personal attention, the academy supports students as
              they strengthen their voice, rhythm and technique.
            </p>
            <p>
              Whether a learner is beginning with foundational notes or refining
              their performance, the academy creates a comfortable and uplifting
              environment for every stage of musical growth.
            </p>
            <div className="academy-story__highlights" aria-label="Academy highlights">
              <span><i aria-hidden="true">✦</i> Personal guidance</span>
              <span><i aria-hidden="true">✦</i> All ages welcome</span>
              <span><i aria-hidden="true">✦</i> Learn at your pace</span>
            </div>
            <Link href="/about" className="button academy-story__link">
              Discover our academy <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--cream class-showcase" id="classes">
        <div className="page-width">
          <div className="section-heading">
            <p className="eyebrow class-showcase__eyebrow">
              <span aria-hidden="true">♪</span>
              Find your rhythm
            </p>
            <h2>
              Choose the sound <em>you want to build.</em>
            </h2>
            <p className="class-showcase__intro">
              Discover a new skill, find your sound and enjoy learning at your own pace.
            </p>
          </div>
          <div className="class-grid">
            {defaultClasses.map((course) => (
              <article key={course.id} className="class-card">
                <div className="class-card__topline">
                  <span className="class-card__icon" aria-hidden="true">
                    {classSymbols[course.id] ?? "♪"}
                  </span>
                  <span className="class-card__number">
                    {course.displayOrder.toString().padStart(2, "0")}
                  </span>
                </div>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <span className="class-card__accent" aria-hidden="true">♪</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <RecentGalleryPhotos />

      <section className="closing-invitation" aria-labelledby="closing-invitation-title">
        <div className="closing-invitation__inner page-width">
          <div className="closing-invitation__copy">
            <p className="eyebrow">Your next chapter</p>
            <h2 id="closing-invitation-title">The first note is yours.</h2>
            <p>Choose an instrument, meet your mentor and make music that feels like you.</p>
          </div>
          <Link href="/registration" className="closing-invitation__button">
            Register now <span aria-hidden="true">→</span>
          </Link>
          <span className="closing-invitation__note" aria-hidden="true">♫</span>
        </div>
      </section>
    </main>
  );
}
