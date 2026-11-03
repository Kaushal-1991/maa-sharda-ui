import Image from "next/image";
import Link from "next/link";

const currentYear = new Date().getFullYear();

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
