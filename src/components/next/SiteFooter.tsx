import Image from "next/image";
import Link from "next/link";

const currentYear = new Date().getFullYear();

const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com/share/1CHNwoTJ9f/",
    icon: (
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.6 1.6-1.6h1.7V3.5c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.3H7.3v3.1h2.8v8h3.4Z" />
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/tushar_singh_thakur_swarum?dlrf=MTk0Y3ExM3I0bjVuNQ==",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="18" cy="6.5" r="1.25" />
      </>
    ),
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@tushar_singh_thakur?si=4z2YgEzzJJ0w7yB1",
    icon: (
      <path d="M23 7.1a3 3 0 0 0-2.1-2.1C19 4.5 12 4.5 12 4.5s-7 0-8.9.5A3 3 0 0 0 1 7.1 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.9A3 3 0 0 0 3.1 19c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.9 31 31 0 0 0-.5-4.9ZM9.8 15.2V8.8l5.8 3.2-5.8 3.2Z" />
    ),
  },
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__main page-width">
        <div className="footer-brand">
          <Image
            src="/maa-sharda.jpeg"
            alt=""
            width={48}
            height={48}
            className="footer-brand__logo"
          />
          <div>
            <strong>Maa Sharda Sangeet Academy</strong>
            <p className="footer-brand__motto">
              <span aria-hidden="true">♫</span>
              Where every learner finds their rhythm.
            </p>
            <Link href="/registration" className="footer-brand__join">
              Start learning <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <div className="footer-links">
          <div>
            <h2>Explore</h2>
            <Link href="/">Home</Link>
            <Link href="/about">About the academy</Link>
            <Link href="/classes">Music classes</Link>
            <Link href="/gallery/photos">Photos</Link>
            <Link href="/gallery/videos">Videos</Link>
          </div>
          <div>
            <h2>Contact</h2>
            <a href="tel:+917985910923">
              <span aria-hidden="true">☎</span> +91 79859 10923
            </a>
            <a href="mailto:rajtushar276001@gmail.com">
              <span aria-hidden="true">✉</span>
              rajtushar276001@gmail.com
            </a>
            <Link href="/contact">
              <span aria-hidden="true">⌖</span> Kolpanday, Azamgarh, Uttar Pradesh
            </Link>
          </div>
          <div className="footer-social">
            <h2>Follow us</h2>
            <div className="footer-social__links">
              {socialLinks.map(({ name, href, icon }) => (
                <a
                  href={href}
                  key={name}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit us on ${name}`}
                  title={name}
                >
                  <svg
                    className={
                      name === "Instagram"
                        ? "footer-social__icon--instagram"
                        : undefined
                    }
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    {icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="site-footer__bottom">
        <div className="page-width">
          <span>
            © {currentYear} Maa Sharda Sangeet Academy. All rights reserved.
          </span>
          <span>Made for music, learning and expression.</span>
        </div>
      </div>
    </footer>
  );
}
