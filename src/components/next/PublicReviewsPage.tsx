"use client";

import { useEffect, useState } from "react";
import ReviewStars from "./ReviewStars";

type Review = {
  id: string;
  name: string;
  course: string;
  rating: number;
  message: string;
  createdAt: string;
};

type ReviewData = {
  enabled: boolean;
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

type ReviewForm = {
  name: string;
  course: string;
  rating: number;
  message: string;
};

const emptyReviewData: ReviewData = {
  enabled: true,
  reviews: [],
  averageRating: 0,
  totalReviews: 0,
  page: 1,
  pageSize: 10,
  totalPages: 0,
};

function getErrorMessage(payload: unknown, fallback: string): string {
  if (
    payload &&
    typeof payload === "object" &&
    "error" in payload &&
    typeof payload.error === "string"
  ) {
    return payload.error;
  }
  return fallback;
}

export default function PublicReviewsPage() {
  const [data, setData] = useState(emptyReviewData);
  const [page, setPage] = useState(1);
  const [refreshVersion, setRefreshVersion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [form, setForm] = useState<ReviewForm>({
    name: "",
    course: "",
    rating: 0,
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    let active = true;

    async function loadReviews() {
      setLoading(true);
      setLoadError("");
      try {
        const response = await fetch(`/api/reviews?page=${page}&limit=10`);
        const payload: unknown = await response.json();
        if (!response.ok) {
          throw new Error(getErrorMessage(payload, "Could not load reviews."));
        }
        if (active) {
          const result = payload as ReviewData;
          setData(result);
          setPage(result.page);
        }
      } catch (error) {
        if (active) {
          setLoadError(
            error instanceof Error ? error.message : "Could not load reviews.",
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadReviews();
    return () => {
      active = false;
    };
  }, [page, refreshVersion]);

  async function submitReview(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    setSuccessMessage("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const payload: unknown = await response.json();
      if (!response.ok) {
        throw new Error(getErrorMessage(payload, "Could not submit your review."));
      }

      setForm({ name: "", course: "", rating: 0, message: "" });
      setPage(1);
      setRefreshVersion((current) => current + 1);
      setSuccessMessage(
        "Thank you! Your review is now live on the website.",
      );
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Could not submit your review.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  const firstReviewNumber = data.totalReviews
    ? (data.page - 1) * data.pageSize + 1
    : 0;
  const lastReviewNumber = Math.min(data.page * data.pageSize, data.totalReviews);

  return (
    <section className="reviews-page-section">
      <div className="page-width">
        {!data.enabled && !loading ? (
          <div className="reviews-disabled" role="status">
            Reviews and ratings are temporarily unavailable.
          </div>
        ) : (
          <>
            <header className="reviews-page-heading">
              <div>
                <p className="eyebrow">Real voices, real progress</p>
                <h2>Stories from our music community</h2>
                <p>Discover how learners are finding their rhythm at Maa Sharda.</p>
              </div>
              <div className="reviews-summary reviews-page-summary" aria-label={`${data.averageRating} average rating from ${data.totalReviews} reviews`}>
                <strong>{data.averageRating ? data.averageRating.toFixed(1) : "—"}</strong>
                <span>
                  <ReviewStars rating={Math.round(data.averageRating)} />
                  Average from {data.totalReviews} {data.totalReviews === 1 ? "review" : "reviews"}
                </span>
              </div>
            </header>

            {loadError ? (
              <p className="reviews-message reviews-message--error" role="alert">{loadError}</p>
            ) : null}

            <div className="reviews-page-layout">
              <section className="reviews-list" id="reviews-list" aria-labelledby="reviews-list-title">
                <div className="reviews-list__heading">
                  <div>
                    <p>LEARNER EXPERIENCES</p>
                    <h3 id="reviews-list-title">All reviews</h3>
                  </div>
                  <span>
                    {loading
                      ? "Loading reviews..."
                      : `${firstReviewNumber}–${lastReviewNumber} of ${data.totalReviews}`}
                  </span>
                </div>

                {loading ? (
                  <p className="reviews-page-empty">Loading learner reviews...</p>
                ) : data.reviews.length ? (
                  <div className="reviews-list__items" aria-live="polite">
                    {data.reviews.map((review) => (
                      <article className="reviews-page-card" key={review.id}>
                        <div className="reviews-page-card__top">
                          <span className="reviews-avatar" aria-hidden="true">
                            {review.name.charAt(0).toUpperCase()}
                          </span>
                          <span className="reviews-page-card__identity">
                            <strong>{review.name}</strong>
                            <small>{review.course}</small>
                          </span>
                          <span className="reviews-page-card__rating">
                            <ReviewStars rating={review.rating} />
                            <small>{review.rating}.0</small>
                          </span>
                        </div>
                        <blockquote>{review.message}</blockquote>
                        <time dateTime={review.createdAt}>
                          {new Intl.DateTimeFormat("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }).format(new Date(review.createdAt))}
                        </time>
                      </article>
                    ))}
                  </div>
                ) : (
                  <p className="reviews-page-empty">
                    No reviews yet. Be the first to share your learning experience.
                  </p>
                )}

                {data.totalPages > 1 ? (
                  <nav className="reviews-pagination" aria-label="Review pages">
                    <button
                      type="button"
                      className="reviews-pagination__step"
                      disabled={loading || page <= 1}
                      onClick={() => setPage((current) => Math.max(1, current - 1))}
                    >
                      <span aria-hidden="true">←</span> Previous 10
                    </button>
                    <div className="reviews-pagination__pages">
                      {Array.from({ length: data.totalPages }, (_, index) => index + 1)
                        .filter((pageNumber) =>
                          pageNumber === 1 ||
                          pageNumber === data.totalPages ||
                          Math.abs(pageNumber - page) <= 1,
                        )
                        .map((pageNumber, index, pages) => (
                          <span className="reviews-pagination__item" key={pageNumber}>
                            {index > 0 && pages[index - 1] !== pageNumber - 1 ? (
                              <span className="reviews-pagination__ellipsis" aria-hidden="true">…</span>
                            ) : null}
                            <button
                              type="button"
                              className={pageNumber === page ? "is-current" : ""}
                              aria-current={pageNumber === page ? "page" : undefined}
                              disabled={loading}
                              onClick={() => setPage(pageNumber)}
                            >
                              {pageNumber}
                            </button>
                          </span>
                        ))}
                    </div>
                    <button
                      type="button"
                      className="reviews-pagination__step"
                      disabled={loading || page >= data.totalPages}
                      onClick={() => setPage((current) => Math.min(data.totalPages, current + 1))}
                    >
                      Next 10 reviews <span aria-hidden="true">→</span>
                    </button>
                  </nav>
                ) : null}
              </section>

              <aside className="reviews-submit-panel" id="share-review">
                <div className="reviews-submit-panel__top">
                  <span aria-hidden="true">✦</span>
                  <p>YOUR STORY MATTERS</p>
                </div>
                <h3>Share your experience</h3>
                <p className="review-form__intro">
                  Your words can encourage someone else to begin their own music journey.
                </p>
                <form className="review-form" onSubmit={submitReview}>
                  <label htmlFor="review-name">Your name</label>
                  <input
                    id="review-name"
                    name="name"
                    autoComplete="name"
                    maxLength={80}
                    minLength={2}
                    required
                    value={form.name}
                    onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                    placeholder="e.g. Ananya Sharma"
                  />
                  <label htmlFor="review-course">Course</label>
                  <select
                    id="review-course"
                    name="course"
                    required
                    value={form.course}
                    onChange={(event) => setForm((current) => ({ ...current, course: event.target.value }))}
                  >
                    <option value="" disabled>Select your course</option>
                    <option>Classical Music</option>
                    <option>Light Music & Singing</option>
                    <option>Harmonium</option>
                    <option>Guitar</option>
                    <option>Other</option>
                  </select>
                  <fieldset className="review-form__rating">
                    <legend>Your rating</legend>
                    <div role="group" aria-label="Choose a rating from 1 to 5 stars">
                      {Array.from({ length: 5 }, (_, index) => {
                        const value = index + 1;
                        return (
                          <button
                            key={value}
                            type="button"
                            className={value <= form.rating ? "is-selected" : ""}
                            aria-label={`${value} ${value === 1 ? "star" : "stars"}`}
                            aria-pressed={form.rating === value}
                            onClick={() => setForm((current) => ({ ...current, rating: value }))}
                          >
                            ★
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                  <label htmlFor="review-message">Your review</label>
                  <textarea
                    id="review-message"
                    name="message"
                    rows={4}
                    minLength={10}
                    maxLength={1200}
                    required
                    value={form.message}
                    onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                    placeholder="What did you enjoy about learning here?"
                  />
                  {formError ? <p className="reviews-message reviews-message--error" role="alert">{formError}</p> : null}
                  {successMessage ? <p className="reviews-message reviews-message--success" role="status">{successMessage}</p> : null}
                  <p className="reviews-form-note">Your review will appear as soon as you submit it.</p>
                  <button className="review-form__submit" type="submit" disabled={submitting || form.rating === 0}>
                    {submitting ? "Submitting..." : "Submit your review"}
                    <span aria-hidden="true">→</span>
                  </button>
                </form>
              </aside>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
