import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import tusharPhoto from "../../../images/about-page-image.jpg";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Maa Sharda Sangeet Academy and the guiding philosophy behind the music classes.",
};

export default function AboutPage() {
  return (
    <main>
      <section className="about-banner" aria-label="Maa Sharda Sangeet Academy">
        <img
          src="/about-banner.png"
          alt="Maa Sharda Sangeet Academy — Where Music Becomes a Way of Life"
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

      <section className="about-approach">
        <div className="page-width about-approach__inner">
          <div className="about-approach__visual">
            <div className="about-approach__image">
              <Image
                src={tusharPhoto}
                alt="Tushar Singh Rajpoot singing into a microphone"
                priority
                sizes="(max-width: 760px) 100vw, 48vw"
              />
            </div>
            <div className="about-approach__badge">
              <span className="about-approach__badge-icon" aria-hidden="true">♪</span>
              <span>
                <strong>Tushar Singh Rajpoot</strong>
                <small>Founder &amp; Music Mentor</small>
              </span>
            </div>
          </div>
          <div className="about-approach__copy">
            <p className="about-approach__eyebrow">
              <span aria-hidden="true">✦</span> Our approach
            </p>
            <h1>Find your voice.</h1>
            <p className="about-approach__lead">
              At Maa Sharda Sangeet Academy, music is more than a lesson—it is a
              journey of listening, practice and expression. Whether you are
              just beginning or building on what you know, you will find a
              welcoming space to learn at your own pace.
            </p>
            <p>
              Led by founder and mentor Tushar Singh Rajpoot, our lessons bring
              together patient guidance, strong foundations and the confidence
              to perform—so every student can discover a sound of their own.
            </p>
            <p className="about-approach__education-intro">
              Tushar’s own journey reflects a deep commitment to learning. He
              began with a qualification from Prayag Sangeet Samiti, completed
              his bachelor’s degree at Kashi Vidyapith, and went on to earn
              his master’s degree from the University of Delhi. This strong
              academic foundation brings added depth and credibility to the
              guidance he offers every student.
            </p>
            <ol className="about-approach__education" aria-label="Tushar's education">
              <li>
                <span className="about-approach__education-number" aria-hidden="true">01</span>
                <span>
                  <strong>Prayag Sangeet Samiti</strong>
                  <small>Initial qualification</small>
                </span>
              </li>
              <li>
                <span className="about-approach__education-number" aria-hidden="true">02</span>
                <span>
                  <strong>Kashi Vidyapith</strong>
                  <small>Bachelor’s degree</small>
                </span>
              </li>
              <li>
                <span className="about-approach__education-number" aria-hidden="true">03</span>
                <span>
                  <strong>University of Delhi</strong>
                  <small>Master’s degree</small>
                </span>
              </li>
            </ol>
            <div className="about-approach__highlights" aria-label="Our teaching approach">
              <span>Personal guidance</span>
              <span>Strong foundations</span>
              <span>Confident performance</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--cream about-values-section">
        <div className="page-width">
          <div className="section-heading about-values-heading">
            <p className="eyebrow">Our values</p>
            <h2>The values behind every note.</h2>
            <p>
              Great music grows from more than practice. These are the values
              that help every student find their rhythm and flourish.
            </p>
          </div>
          <div className="value-grid">
            <article className="value-card">
              <div className="value-card__topline">
                <span className="value-card__icon" aria-hidden="true">♫</span>
                <span className="value-card__number">01</span>
              </div>
              <h3>Discipline</h3>
              <p>Practice becomes powerful when it is regular, focused and steady.</p>
            </article>
            <article className="value-card">
              <div className="value-card__topline">
                <span className="value-card__icon" aria-hidden="true">♪</span>
                <span className="value-card__number">02</span>
              </div>
              <h3>Expression</h3>
              <p>Students are encouraged to make every performance personal and expressive.</p>
            </article>
            <article className="value-card">
              <div className="value-card__topline">
                <span className="value-card__icon" aria-hidden="true">♡</span>
                <span className="value-card__number">03</span>
              </div>
              <h3>Support</h3>
              <p>Learning thrives in an environment where guidance is kind and consistent.</p>
            </article>
            <article className="value-card">
              <div className="value-card__topline">
                <span className="value-card__icon" aria-hidden="true">✦</span>
                <span className="value-card__number">04</span>
              </div>
              <h3>Confidence</h3>
              <p>Each lesson builds the clarity and courage needed to perform and improve.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="about-journey">
        <div className="page-width">
          <div className="about-journey__heading">
            <p className="about-journey__eyebrow">Your musical journey</p>
            <h2>Every great melody starts with one note.</h2>
            <p>
              Start with curiosity, grow through practice, and let your own
              musical voice take shape.
            </p>
          </div>
          <div className="about-journey__steps">
            <article className="about-journey__step">
              <span className="about-journey__number">01</span>
              <span className="about-journey__icon" aria-hidden="true">♫</span>
              <h3>Discover</h3>
              <p>
                Find the sound that speaks to you, from singing and classical
                music to harmonium and guitar.
              </p>
            </article>
            <article className="about-journey__step">
              <span className="about-journey__number">02</span>
              <span className="about-journey__icon" aria-hidden="true">♪</span>
              <h3>Find your rhythm</h3>
              <p>
                Build strong foundations through thoughtful practice and
                patient, personal guidance.
              </p>
            </article>
            <article className="about-journey__step">
              <span className="about-journey__number">03</span>
              <span className="about-journey__icon" aria-hidden="true">✦</span>
              <h3>Grow with confidence</h3>
              <p>
                Bring what you learn to life and discover your own way of
                expressing music.
              </p>
            </article>
          </div>
          <Link href="/classes" className="about-journey__link">
            Explore our classes <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
