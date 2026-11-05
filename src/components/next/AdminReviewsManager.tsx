"use client";

import { useEffect, useState } from "react";

type Review = {
  id: string;
  name: string;
  course: string;
  rating: number;
  message: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
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

export default function AdminReviewsManager() {
  const [enabled, setEnabled] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeReviewId, setActiveReviewId] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let active = true;

    async function loadReviews() {
      try {
        const response = await fetch("/api/admin/reviews");
        const payload: unknown = await response.json();
        if (!response.ok) {
          throw new Error(getErrorMessage(payload, "Could not load reviews."));
        }
        const result = payload as { enabled: boolean; reviews: Review[] };
        if (active) {
          setEnabled(result.enabled);
          setReviews(result.reviews);
        }
      } catch (loadError) {
        if (active) {
          setError(loadError instanceof Error ? loadError.message : "Could not load reviews.");
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
  }, []);

  async function toggleReviews() {
    setSaving(true);
    setError("");
    setNotice("");
    try {
      const response = await fetch("/api/admin/reviews", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: !enabled }),
      });
      const payload: unknown = await response.json();
      if (!response.ok) {
        throw new Error(getErrorMessage(payload, "Could not update review settings."));
      }
      const result = payload as { enabled: boolean };
      setEnabled(result.enabled);
      setNotice(
        result.enabled
          ? "Reviews and ratings are now visible on the website."
          : "Reviews and ratings are now disabled on the website.",
      );
    } catch (toggleError) {
      setError(
        toggleError instanceof Error
          ? toggleError.message
          : "Could not update review settings.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function moderateReview(id: string, status: "APPROVED" | "REJECTED") {
    setActiveReviewId(id);
    setError("");
    setNotice("");
    try {
      const response = await fetch(`/api/admin/reviews/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const payload: unknown = await response.json();
      if (!response.ok) {
        throw new Error(getErrorMessage(payload, "Could not update this review."));
      }
      const result = payload as { review: Review };
      setReviews((current) =>
        current.map((review) => review.id === id ? result.review : review),
      );
      setNotice(status === "APPROVED" ? "Review approved and published." : "Review rejected and hidden.");
    } catch (moderationError) {
      setError(
        moderationError instanceof Error
          ? moderationError.message
          : "Could not update this review.",
      );
    } finally {
      setActiveReviewId("");
    }
  }

  async function deleteReview(id: string) {
    if (!window.confirm("Delete this review permanently? This cannot be undone.")) {
      return;
    }

    setActiveReviewId(id);
    setError("");
    setNotice("");
    try {
      const response = await fetch(`/api/admin/reviews/${id}`, {
        method: "DELETE",
      });
      const payload: unknown = await response.json();
      if (!response.ok) {
        throw new Error(getErrorMessage(payload, "Could not delete this review."));
      }
      setReviews((current) => current.filter((review) => review.id !== id));
      setNotice("Review deleted.");
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Could not delete this review.",
      );
    } finally {
      setActiveReviewId("");
    }
  }

  return (
    <div className="admin-reviews">
      <header className="admin-page-heading">
        <div>
          <p>STUDENT VOICES</p>
          <h1>Reviews & ratings</h1>
          <span>Control what appears on your website and read learner feedback.</span>
        </div>
      </header>

      <section className="admin-review-settings" aria-labelledby="admin-review-settings-title">
        <div className="admin-review-settings__icon" aria-hidden="true">✦</div>
        <div className="admin-review-settings__copy">
          <p>Website visibility</p>
          <h2 id="admin-review-settings-title">Review & rating system</h2>
          <span>
            {enabled
              ? "Learners can submit ratings and the top reviews are shown on the home page."
              : "Review submission is paused and the review carousel is hidden from the home page."}
          </span>
          {notice ? <small className="admin-review-settings__notice" role="status">{notice}</small> : null}
        </div>
        <button
          className={`admin-review-toggle${enabled ? " is-enabled" : ""}`}
          type="button"
          role="switch"
          aria-checked={enabled}
          aria-label="Enable reviews and ratings"
          disabled={loading || saving}
          onClick={toggleReviews}
        >
          <span />
          {saving ? "Saving..." : enabled ? "Enabled" : "Disabled"}
        </button>
      </section>

      {error ? <p className="admin-error admin-review-error" role="alert">{error}</p> : null}

      <section className="admin-review-list" aria-labelledby="admin-review-list-title">
        <div className="admin-review-list__heading">
          <div>
            <p>LEARNER FEEDBACK</p>
            <h2 id="admin-review-list-title">All reviews</h2>
          </div>
          <span>{reviews.filter((review) => review.status !== "REJECTED").length} visible · {reviews.length} total</span>
        </div>
        {loading ? (
          <p className="admin-review-empty">Loading reviews...</p>
        ) : reviews.length ? (
          <div className="admin-review-list__items">
            {reviews.map((review) => (
              <article className="admin-review-card" key={review.id}>
                <div className="admin-review-card__top">
                  <div>
                    <h3>{review.name}</h3>
                    <span>{review.course}</span>
                    <span className={`admin-review-status admin-review-status--${review.status.toLowerCase()}`}>
                      {review.status === "REJECTED" ? "Hidden" : "Live"}
                    </span>
                  </div>
                  <span className="admin-review-card__rating" aria-label={`${review.rating} out of 5 stars`}>
                    {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                  </span>
                </div>
                <p>{review.message}</p>
                <time dateTime={review.createdAt}>
                  {new Intl.DateTimeFormat("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }).format(new Date(review.createdAt))}
                </time>
                <div className="admin-review-card__actions">
                  {review.status !== "REJECTED" ? (
                    <button
                      type="button"
                      className="admin-review-action"
                      disabled={activeReviewId !== ""}
                      onClick={() => void moderateReview(review.id, "REJECTED")}
                    >
                      {activeReviewId === review.id ? "Saving..." : "Hide review"}
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="admin-review-action admin-review-action--approve"
                      disabled={activeReviewId !== ""}
                      onClick={() => void moderateReview(review.id, "APPROVED")}
                    >
                      {activeReviewId === review.id ? "Saving..." : "Restore review"}
                    </button>
                  )}
                  <button
                    type="button"
                    className="admin-review-action admin-review-action--delete"
                    disabled={activeReviewId !== ""}
                    onClick={() => void deleteReview(review.id)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="admin-review-empty">No reviews yet. Learner feedback will appear here.</p>
        )}
      </section>
    </div>
  );
}
