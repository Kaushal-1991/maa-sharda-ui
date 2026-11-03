"use client";

import { useState } from "react";
import Link from "next/link";
import {
  validateRegistrationForm,
  type RegistrationField,
  type RegistrationFieldErrors,
} from "../../../lib/registration-form";

const initialState = {
  name: "",
  email: "",
  phone: "",
  musicOption: "",
  mode: "",
  address: "",
};

export default function RegistrationPage() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<{
    type: "success" | "error" | "idle";
    message: string;
  }>({ type: "idle", message: "" });
  const [touched, setTouched] = useState<Partial<Record<RegistrationField, boolean>>>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fieldErrors = validateRegistrationForm(form);

  function getVisibleError(field: RegistrationField): string | undefined {
    return hasSubmitted || touched[field] ? fieldErrors[field] : undefined;
  }

  function markTouched(field: RegistrationField) {
    setTouched((current) => ({ ...current, [field]: true }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setHasSubmitted(true);
    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    if (Object.keys(fieldErrors).length > 0) {
      setIsSubmitting(false);
      setStatus({
        type: "error",
        message: "Please review the highlighted fields and try again.",
      });
      return;
    }

    try {
      const response = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to register student.");
      }

      setStatus({
        type: "success",
        message: "Your registration is confirmed. Our academy team will contact you soon.",
      });
      setForm(initialState);
      setTouched({});
      setHasSubmitted(false);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to register student.";
      setStatus({ type: "error", message });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main>
      <section className="registration-banner" aria-label="Student registration at Maa Sharda Sangeet Academy">
        <img
          src="/registration-banner.png"
          alt="Maa Sharda Sangeet Academy student registration — enroll now and start your musical journey"
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

      <section className="registration-section">
        <div className="page-width registration-layout">
          <aside className="registration-benefits">
            <p className="registration-benefits__eyebrow">
              <span aria-hidden="true">✦</span> Begin your journey
            </p>
            <h1>Start Your Musical Journey.</h1>
            <p className="registration-benefits__intro">
              Join a welcoming community where every student can learn,
              express themselves and grow with confidence.
            </p>
            <div className="registration-benefit-list">
              <article className="registration-benefit">
                <span aria-hidden="true">♫</span>
                <div>
                  <h2>Choose your sound</h2>
                  <p>Classical music, light music, harmonium or guitar.</p>
                </div>
              </article>
              <article className="registration-benefit">
                <span aria-hidden="true">♪</span>
                <div>
                  <h2>Learn your way</h2>
                  <p>Pick home, online or in-person tuition.</p>
                </div>
              </article>
              <article className="registration-benefit">
                <span aria-hidden="true">✦</span>
                <div>
                  <h2>Grow at your pace</h2>
                  <p>Build technique and confidence with supportive guidance.</p>
                </div>
              </article>
            </div>
            <p className="registration-benefits__note">
              <span aria-hidden="true">♡</span> Beginners and all ages are welcome
            </p>
          </aside>

          <div className="form-card registration-form-card">
            <div className="registration-form-card__heading">
              <p>Student registration</p>
              <h2>Take your first step.</h2>
              <span>Share a few details and our academy will be in touch.</span>
            </div>
            {status.type === "success" ? (
              <div className="registration-success" role="status">
                <span className="registration-success__icon" aria-hidden="true">✓</span>
                <p className="registration-success__eyebrow">Registration complete</p>
                <h3>Your musical journey starts here.</h3>
                <p>{status.message}</p>
                <div className="registration-success__note">
                  <span aria-hidden="true">♫</span>
                  <span>Keep an eye on your phone and email for our follow-up.</span>
                </div>
                <button
                  type="button"
                  className="registration-success__again"
                  onClick={() => setStatus({ type: "idle", message: "" })}
                >
                  Register another student <span aria-hidden="true">→</span>
                </button>
              </div>
            ) : <form onSubmit={handleSubmit} noValidate>
              <p className="registration-required-note">
                Fields marked <span aria-hidden="true">*</span> are required. Address is optional.
              </p>
              <div className="form-grid">
                <div className={`form-field${getVisibleError("name") ? " form-field--invalid" : ""}`}>
                  <label htmlFor="name">Name <span className="required-mark" aria-hidden="true">*</span></label>
                  <input
                    id="name"
                    name="name"
                    autoComplete="name"
                    required
                    value={form.name}
                    aria-invalid={Boolean(getVisibleError("name"))}
                    aria-describedby={getVisibleError("name") ? "name-error" : undefined}
                    onBlur={() => markTouched("name")}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, name: event.target.value }))
                    }
                  />
                  {getVisibleError("name") ? <span className="field-error" id="name-error">{getVisibleError("name")}</span> : null}
                </div>
                <div className={`form-field${getVisibleError("email") ? " form-field--invalid" : ""}`}>
                  <label htmlFor="email">Email <span className="required-mark" aria-hidden="true">*</span></label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={form.email}
                    aria-invalid={Boolean(getVisibleError("email"))}
                    aria-describedby={getVisibleError("email") ? "email-error" : undefined}
                    onBlur={() => markTouched("email")}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, email: event.target.value }))
                    }
                  />
                  {getVisibleError("email") ? <span className="field-error" id="email-error">{getVisibleError("email")}</span> : null}
                </div>
                <div className={`form-field${getVisibleError("phone") ? " form-field--invalid" : ""}`}>
                  <label htmlFor="phone">Phone <span className="required-mark" aria-hidden="true">*</span></label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    required
                    maxLength={10}
                    value={form.phone}
                    aria-invalid={Boolean(getVisibleError("phone"))}
                    aria-describedby={getVisibleError("phone") ? "phone-error" : undefined}
                    onBlur={() => markTouched("phone")}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        phone: event.target.value.replace(/\D/g, "").slice(0, 10),
                      }))
                    }
                  />
                  {getVisibleError("phone") ? <span className="field-error" id="phone-error">{getVisibleError("phone")}</span> : null}
                </div>
                <div className={`form-field${getVisibleError("musicOption") ? " form-field--invalid" : ""}`}>
                  <label htmlFor="musicOption">Music option <span className="required-mark" aria-hidden="true">*</span></label>
                  <select
                    id="musicOption"
                    name="musicOption"
                    required
                    value={form.musicOption}
                    aria-invalid={Boolean(getVisibleError("musicOption"))}
                    aria-describedby={getVisibleError("musicOption") ? "musicOption-error" : undefined}
                    onBlur={() => markTouched("musicOption")}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, musicOption: event.target.value }))
                    }
                  >
                    <option value="">Select an option</option>
                    <option value="CLASSICAL_MUSIC">Classical Music</option>
                    <option value="LIGHT_MUSIC">Light Music</option>
                    <option value="HARMONIUM">Harmonium</option>
                    <option value="GUITAR">Guitar</option>
                  </select>
                  {getVisibleError("musicOption") ? <span className="field-error" id="musicOption-error">{getVisibleError("musicOption")}</span> : null}
                </div>
                <div className={`form-field${getVisibleError("mode") ? " form-field--invalid" : ""}`}>
                  <label htmlFor="mode">Tuition mode <span className="required-mark" aria-hidden="true">*</span></label>
                  <select
                    id="mode"
                    name="mode"
                    required
                    value={form.mode}
                    aria-invalid={Boolean(getVisibleError("mode"))}
                    aria-describedby={getVisibleError("mode") ? "mode-error" : undefined}
                    onBlur={() => markTouched("mode")}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, mode: event.target.value }))
                    }
                  >
                    <option value="">Select a mode</option>
                    <option value="HOME">Home Tuition</option>
                    <option value="ONLINE">Online Tuition</option>
                    <option value="OFFLINE">Offline Tuition</option>
                  </select>
                  {getVisibleError("mode") ? <span className="field-error" id="mode-error">{getVisibleError("mode")}</span> : null}
                </div>
                <div className={`form-field form-field--full${getVisibleError("address") ? " form-field--invalid" : ""}`}>
                  <label htmlFor="address">Address <span className="optional-mark">Optional</span></label>
                  <textarea
                    id="address"
                    name="address"
                    maxLength={500}
                    value={form.address}
                    aria-invalid={Boolean(getVisibleError("address"))}
                    aria-describedby={getVisibleError("address") ? "address-error" : undefined}
                    onBlur={() => markTouched("address")}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, address: event.target.value }))
                    }
                  />
                  {getVisibleError("address") ? <span className="field-error" id="address-error">{getVisibleError("address")}</span> : null}
                </div>
              </div>

              {status.message ? (
                <div className="form-message form-error" role="alert">
                  {status.message}
                </div>
              ) : null}

              <button type="submit" className="button" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit registration"}
                {!isSubmitting ? <span aria-hidden="true">→</span> : null}
              </button>
            </form>}
          </div>
        </div>
      </section>
    </main>
  );
}
