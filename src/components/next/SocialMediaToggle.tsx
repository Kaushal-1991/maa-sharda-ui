"use client";

import { useState } from "react";

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

export default function SocialMediaToggle() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className={`social-media${isOpen ? " is-open" : ""}`}>
      <div
        className="social-media__card"
        id="social-media-links"
        hidden={!isOpen}
      >
        <p>Follow us</p>
        <div className="social-media__links">
          {socialLinks.map(({ name, href, icon }) => (
            <a
              href={href}
              key={name}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${name}`}
            >
              <svg
                className={
                  name === "Instagram"
                    ? "social-media__icon--instagram"
                    : undefined
                }
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {icon}
              </svg>
              <span>{name}</span>
            </a>
          ))}
        </div>
      </div>
      <button
        className="social-media__toggle"
        type="button"
        aria-expanded={isOpen}
        aria-controls="social-media-links"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span>Social Media</span>
        <span className="social-media__chevron" aria-hidden="true">
          {isOpen ? "›" : "‹"}
        </span>
      </button>
    </aside>
  );
}
