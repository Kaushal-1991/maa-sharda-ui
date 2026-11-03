"use client";

import Link from "next/link";
import { useState } from "react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/auth/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to sign in.");
      }

      window.location.href = "/admin/dashboard";
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to sign in.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="login-wrap">
      <div className="login-layout">
        <aside className="login-story">
          <div className="login-story__ornament" aria-hidden="true">
            <span>♫</span>
            <span>♪</span>
            <span>𝄞</span>
          </div>
          <p className="login-story__eyebrow">Maa Sharda Sangeet Academy</p>
          <h1>Where every note finds its place.</h1>
          <p className="login-story__copy">
            A dedicated space to support our students, celebrate their progress
            and keep the music moving.
          </p>
          <div className="login-story__signature">
            <span aria-hidden="true">✦</span>
            <span>Learn with purpose. Grow with music.</span>
          </div>
        </aside>
        <section className="login-panel" aria-labelledby="admin-login-title">
          <div className="login-panel__top">
            <div className="login-brand">
              <img src="/maa-sharda.jpeg" alt="" width={48} height={48} />
              <span>
                Maa Sharda
                <small>Academy administration</small>
              </span>
            </div>
            <span className="login-panel__badge">
              <span aria-hidden="true">●</span> Admin portal
            </span>
          </div>

          <div className="login-panel__heading">
            <p>WELCOME BACK</p>
            <h2 id="admin-login-title">Sign in to your space</h2>
            <span>Enter your administrator credentials to continue.</span>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-field">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="username"
                placeholder="admin@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="password">Password</label>
              <div className="login-password-control">
                <input
                  id="password"
                  name="password"
                  type={isPasswordVisible ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
                <button
                  type="button"
                  className="login-password-control__toggle"
                  aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                  aria-pressed={isPasswordVisible}
                  onClick={() => setIsPasswordVisible((visible) => !visible)}
                >
                  {isPasswordVisible ? (
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                      <path d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8" />
                      <path d="M9.9 5.2A10.8 10.8 0 0112 5c5.1 0 8.6 4.3 9.5 6-.4.8-1.4 2.2-3 3.5M6.2 6.2C3.9 7.7 2.7 9.7 2.5 11c.9 1.7 4.4 6 9.5 6 1 0 1.9-.2 2.7-.5" />
                    </svg>
                  ) : (
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z" />
                      <circle cx="12" cy="12" r="2.5" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            {message ? (
              <p className="form-message form-error" role="alert">{message}</p>
            ) : null}
            <button type="submit" className="button login-form__submit" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign in securely"}
              {!isSubmitting ? <span aria-hidden="true">→</span> : null}
            </button>
          </form>

          <div className="login-panel__footer">
            <span aria-hidden="true">♢</span>
            <p>Your sign-in is protected with secure authentication.</p>
          </div>
          <Link href="/" className="login-panel__back">
            <span aria-hidden="true">←</span> Return to the academy website
          </Link>
        </section>
      </div>
    </div>
  );
}
