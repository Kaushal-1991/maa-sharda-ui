import Link from "next/link";

export default function ContactPage() {
  return (
    <main>
      <section className="contact-banner" aria-label="Contact Maa Sharda Sangeet Academy">
        <img
          src="/contact-banner.png"
          alt="Maa Sharda Sangeet Academy — Contact us and begin your musical journey"
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

      <section className="contact-intro-section">
        <div className="page-width contact-intro">
          <div className="contact-panel">
            <div className="contact-panel__story">
              <p className="contact-panel__eyebrow">
                <span aria-hidden="true">✦</span> Your musical journey starts here
              </p>
              <h1>Let&apos;s make music together.</h1>
              <p className="contact-panel__intro">
                Curious about classes or ready to begin? We&apos;re happy to
                help you find the right next step.
              </p>
              <a className="contact-panel__call" href="tel:+917985910923">
                <span aria-hidden="true">☎</span>
                Call the academy
                <span aria-hidden="true">↗</span>
              </a>
              <span className="contact-panel__note" aria-hidden="true">♫</span>
            </div>

            <div className="contact-panel__details">
              <div className="contact-panel__details-heading">
                <p>Get in touch</p>
                <span>We&apos;re just a message or visit away.</span>
              </div>
              <div className="contact-list">
                <div className="contact-item">
                  <span className="contact-item__icon" aria-hidden="true">⌖</span>
                  <span className="contact-item__copy">
                    <strong>Visit the academy</strong>
                    <span>Near Ramayan Market, Kolpanday, Azamgarh</span>
                  </span>
                </div>
                <a className="contact-item" href="mailto:rajtushar276001@gmail.com">
                  <span className="contact-item__icon" aria-hidden="true">✉</span>
                  <span className="contact-item__copy">
                    <strong>Send us an email</strong>
                    <span>rajtushar276001@gmail.com</span>
                  </span>
                  <span className="contact-item__arrow" aria-hidden="true">↗</span>
                </a>
                <a className="contact-item" href="tel:+917985910923">
                  <span className="contact-item__icon" aria-hidden="true">☎</span>
                  <span className="contact-item__copy">
                    <strong>Give us a call</strong>
                    <span>+91 79859 10923</span>
                  </span>
                  <span className="contact-item__arrow" aria-hidden="true">↗</span>
                </a>
              </div>

              <a
                className="contact-panel__directions"
                href="https://www.google.com/maps/search/?api=1&query=Near%20Ramayan%20Market%2C%20Kolpanday%2C%20Azamgarh%2C%20Uttar%20Pradesh"
                target="_blank"
                rel="noreferrer"
              >
                <span>Find us near Ramayan Market, Kolpanday</span>
                <strong>Get directions <span aria-hidden="true">↗</span></strong>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-location-section">
        <div className="page-width">
          <div className="contact-location__heading">
            <p className="contact-location__eyebrow">
              <span aria-hidden="true">⌖</span> Find your way to us
            </p>
            <h2>Visit us in Azamgarh.</h2>
            <p>We look forward to welcoming you to the academy.</p>
          </div>
          <div className="contact-location__layout">
            <aside className="contact-location__card">
              <span className="contact-location__card-icon" aria-hidden="true">⌖</span>
              <p className="contact-location__card-label">Come say hello</p>
              <h3>Maa Sharda Sangeet Academy</h3>
              <p className="contact-location__address">
                Near Ramayan Market,
                <br />
                Kolpanday, Azamgarh
              </p>
              <a
                className="contact-location__directions"
                href="https://www.google.com/maps/search/?api=1&query=Near%20Ramayan%20Market%2C%20Kolpanday%2C%20Azamgarh%2C%20Uttar%20Pradesh"
                target="_blank"
                rel="noreferrer"
              >
                Get directions <span aria-hidden="true">↗</span>
              </a>
              <span className="contact-location__card-note" aria-hidden="true">♪</span>
            </aside>
            <div className="map-frame">
              <iframe
                title="Maa Sharda Sangeet Academy location near Ramayan Market, Kolpanday, Azamgarh"
                src="https://www.google.com/maps?q=Near%20Ramayan%20Market%2C%20Kolpanday%2C%20Azamgarh%2C%20Uttar%20Pradesh&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
