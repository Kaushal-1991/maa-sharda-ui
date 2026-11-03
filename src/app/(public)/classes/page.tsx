import type { Metadata } from "next";
import Link from "next/link";
import ClassGalleryPhotos from "../../../components/next/ClassGalleryPhotos";
import { defaultClasses } from "../../../data/classes";

export const metadata: Metadata = {
  title: "Classes",
  description: "Explore classical music, light music, harmonium and guitar classes at Maa Sharda Sangeet Academy.",
};

export default function ClassesPage() {
  return (
    <main>
      <section className="about-banner" aria-label="Music classes at Maa Sharda Sangeet Academy">
        <img
          src="/classes-banner.png"
          alt="Learn, practise and perform at Maa Sharda Sangeet Academy. Classes include vocal music, guitar, keyboard, tabla, harmonium and classical dance."
        />
      </section>

      <section className="music-ribbon" aria-label="Explore music classes">
        <div className="music-ribbon__inner page-width">
          <p className="music-ribbon__label">
            <span aria-hidden="true">♪</span>
            Find your rhythm
          </p>
          <nav className="music-ribbon__courses" aria-label="Jump to a class">
            <a href="#class-classical-music">Classical music</a>
            <span aria-hidden="true">✦</span>
            <a href="#class-light-music">Singing</a>
            <span aria-hidden="true">✦</span>
            <a href="#class-harmonium">Harmonium</a>
            <span aria-hidden="true">✦</span>
            <a href="#class-guitar">Guitar</a>
          </nav>
          <Link href="/registration" className="music-ribbon__cta">
            Join a class <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="section section--cream classes-learning-section">
        <div className="page-width split">
          <div className="content-copy classes-learning-card">
            <p className="eyebrow">A better way to learn</p>
            <h2>Learn at your pace.</h2>
            <p>
              Each class focuses on fundamentals, confidence and expressive sound.
              Students learn through guided practice, feedback and a consistent
              routine that nurtures enjoyment as well as growth.
            </p>
            <p>
              Our goal is simple: help every learner improve steadily while
              developing a deeper love for music.
            </p>
          </div>
          <div className="split__image">
            <img
              src="/classes-learning.png"
              alt="Students learning and performing music together at Maa Sharda Sangeet Academy"
            />
          </div>
        </div>
      </section>

      <section className="page-section classes-list-section">
        <div className="page-width">
          <div className="section-heading classes-heading">
            <p className="eyebrow">Explore our classes</p>
            <h1>Find your sound.</h1>
            <p>
              Whether you are just starting or refining your skills, find a
              welcoming class to learn, practise and grow.
            </p>
          </div>
          <div className="class-grid">
            {defaultClasses.map((course) => (
              <article
                key={course.id}
                id={`class-${course.id}`}
                className="class-card"
              >
                <div className="class-card__number">
                  {course.displayOrder.toString().padStart(2, "0")}
                </div>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ClassGalleryPhotos />

      <section className="classes-video-section" aria-labelledby="classes-video-title">
        <div className="page-width classes-video">
          <div className="classes-video__copy">
            <p className="eyebrow">Music in motion</p>
            <h2 id="classes-video-title">Feel the music.</h2>
            <p>
              Every note tells a story. Watch, listen and get inspired to start
              your own musical journey with us.
            </p>
            <a
              className="classes-video__link"
              href="https://www.youtube.com/watch?v=IK_88DGa2m8"
              target="_blank"
              rel="noreferrer"
            >
              Watch on YouTube <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="classes-video__frame">
            <iframe
              src="https://www.youtube-nocookie.com/embed/IK_88DGa2m8?rel=0"
              title="Music performance by Maa Sharda Sangeet Academy"
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </section>

    </main>
  );
}
