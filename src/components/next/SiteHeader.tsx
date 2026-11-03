"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/about", label: "About" },
  { href: "/classes", label: "Classes" },
  { href: "/gallery/photos", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  function isLinkActive(href: string) {
    return href === "/"
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);
  }

  function isNavLinkActive(href: string) {
    return href === "/gallery/photos"
      ? isLinkActive("/gallery")
      : isLinkActive(href);
  }

  return (
    <header className="site-header">
      <div className="site-header__inner page-width">
        <Link
          href="/"
          className={`brand${isLinkActive("/") ? " is-active" : ""}`}
          aria-label="Maa Sharda Sangeet Academy home"
          aria-current={isLinkActive("/") ? "page" : undefined}
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/maa-sharda.jpeg"
            alt=""
            width={52}
            height={52}
            priority
            className="brand__logo"
          />
          <span className="brand__name">
            <strong>Maa Sharda</strong>
            <small>Sangeet Academy</small>
          </span>
        </Link>

        <button
          type="button"
          className="menu-toggle"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          id="primary-navigation"
          className={`primary-navigation${menuOpen ? " is-open" : ""}`}
          aria-label="Main navigation"
        >
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              className={isNavLinkActive(link.href) ? "is-active" : undefined}
              aria-current={isNavLinkActive(link.href) ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/registration"
          className={`button button--small navigation-cta${isLinkActive("/registration") ? " is-active" : ""}`}
          aria-current={isLinkActive("/registration") ? "page" : undefined}
          onClick={() => setMenuOpen(false)}
        >
          <span>Join the academy</span>
          <span className="navigation-cta__arrow" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </header>
  );
}
