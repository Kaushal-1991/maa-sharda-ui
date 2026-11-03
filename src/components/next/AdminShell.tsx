"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "⌂" },
  { href: "/admin/students", label: "Students", icon: "♙" },
];

export default function AdminShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [logoutError, setLogoutError] = useState("");

  if (pathname === "/admin/login") {
    return <div className="admin-login-shell">{children}</div>;
  }

  async function handleLogout() {
    setLogoutError("");
    try {
      const response = await fetch("/api/auth/admin/logout", { method: "POST" });
      if (!response.ok) {
        throw new Error("Unable to sign out. Please try again.");
      }
      window.location.assign("/admin/login");
    } catch (error) {
      setLogoutError(error instanceof Error ? error.message : "Unable to sign out.");
    }
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link href="/admin/dashboard" className="admin-brand">
          <img src="/maa-sharda.jpeg" alt="" width={42} height={42} />
          <span>
            Maa Sharda
            <small>Academy admin</small>
          </span>
        </Link>
        <nav className="admin-sidebar__nav" aria-label="Admin navigation">
          {navigation.map((item) => (
            <Link
              href={item.href}
              key={item.href}
              className={pathname === item.href ? "is-active" : ""}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              <span aria-hidden="true">{item.icon}</span>
              {item.label}
            </Link>
          ))}
          <div className="admin-sidebar__group">
            <p>Gallery</p>
            <Link
              href="/admin/gallery/photos"
              className={pathname === "/admin/gallery/photos" ? "is-active" : ""}
              aria-current={pathname === "/admin/gallery/photos" ? "page" : undefined}
            >
              <span aria-hidden="true">▧</span>
              Photos
            </Link>
            <Link
              href="/admin/gallery/videos"
              className={pathname === "/admin/gallery/videos" ? "is-active" : ""}
              aria-current={pathname === "/admin/gallery/videos" ? "page" : undefined}
            >
              <span aria-hidden="true">▷</span>
              Videos
            </Link>
          </div>
        </nav>
        <div className="admin-sidebar__footer">
          <span aria-hidden="true">♪</span>
          <p>Making music, one student at a time.</p>
        </div>
      </aside>
      <div className="admin-main">
        <header className="admin-topbar">
          <div>
            <p>MAA SHARDA SANGEET ACADEMY</p>
            <span>Administration</span>
          </div>
          <button type="button" className="admin-logout" onClick={handleLogout}>
            Sign out <span aria-hidden="true">↗</span>
          </button>
        </header>
        {logoutError ? (
          <p className="admin-error" role="alert">{logoutError}</p>
        ) : null}
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}
