"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ReviewStars from "./ReviewStars";

type Review = {
  id: string;
  name: string;
  course: string;
  rating: number;
  message: string;
};

type ReviewData = {
  enabled: boolean;
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
};

const emptyReviewData: ReviewData = {
  enabled: false,
  reviews: [],
  averageRating: 0,
  totalReviews: 0,
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

export default function ReviewsSection() {
  const [data, setData] = useState(emptyReviewData);
  const [activeReview, setActiveReview] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadReviews() {
      try {
        const response = await fetch("/api/reviews?page=1&limit=5");
        const payload: unknown = await response.json();
        if (!response.ok) {
          throw new Error(getErrorMessage(payload, "Could not load reviews."));
        }
        if (active) {
          setData(payload as ReviewData);
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
  }, []);

  useEffect(() => {
    if (
      data.reviews.length < 2 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveReview((current) => (current + 1) % data.reviews.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [data.reviews.length]);

  if (loading || (!data.enabled && !loadError)) {
    return null;
  }

  const currentReview = data.reviews[activeReview];

  return (
    <section className="reviews-section reviews-section--home" aria-labelledby="reviews-title">
      <div className="page-width reviews-section__inner">
        <div className="reviews-section__heading">
          <div>
            <p className="eyebrow"><span aria-hidden="true">✦</span> Notes from our learners</p>
            <h2 id="reviews-title">Their music, <em>their words.</em></h2>
            <p>Every note of encouragement means the world to our academy.</p>
          </div>
          <div className="reviews-summary" aria-label={`${data.averageRating} average rating from ${data.totalReviews} reviews`}>
            <strong>{data.averageRating ? data.averageRating.toFixed(1) : "—"}</strong>
            <span>
              <ReviewStars rating={Math.round(data.averageRating)} />
              Based on {data.totalReviews} {data.totalReviews === 1 ? "review" : "reviews"}
            </span>
          </div>
        </div>

        {loadError ? (
          <p className="reviews-message reviews-message--error" role="status">{loadError}</p>
        ) : null}

        <div className="reviews-home-carousel">
          {currentReview ? (
            <>
              <div className="reviews-showcase__quote" aria-hidden="true">“</div>
              <div className="reviews-showcase__card" aria-live="polite">
                <ReviewStars rating={currentReview.rating} />
                <blockquote>{currentReview.message}</blockquote>
                <div className="reviews-showcase__author">
                  <span className="reviews-avatar" aria-hidden="true">
                    {currentReview.name.charAt(0).toUpperCase()}
                  </span>
                  <span><strong>{currentReview.name}</strong><small>{currentReview.course}</small></span>
                  <span className="reviews-showcase__verified">Learner</span>
                </div>
              </div>
              {data.reviews.length > 1 ? (
                <div className="reviews-controls">
                  <button
                    type="button"
                    aria-label="Previous top review"
                    onClick={() => setActiveReview((activeReview - 1 + data.reviews.length) % data.reviews.length)}
                  >
                    ‹
                  </button>
                  <span>{activeReview + 1} / {data.reviews.length}</span>
                  <button
                    type="button"
                    aria-label="Next top review"
                    onClick={() => setActiveReview((activeReview + 1) % data.reviews.length)}
                  >
                    ›
                  </button>
                </div>
              ) : null}
            </>
          ) : (
            <div className="reviews-empty">
              <span aria-hidden="true">♫</span>
              <h3>Be the first to share your story.</h3>
              <p>Your experience can inspire another learner to begin.</p>
            </div>
          )}
        </div>

        <div className="reviews-section__footer">
          <p>Showing our highest-rated learner stories</p>
          <Link className="reviews-more-link" href="/reviews">
            More reviews <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
