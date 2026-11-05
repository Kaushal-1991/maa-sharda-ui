export default function ReviewStars({
  rating,
  label,
}: {
  rating: number;
  label?: string;
}) {
  return (
    <span className="reviews-stars" aria-label={label ?? `${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <span
          key={index}
          className={index < rating ? "is-filled" : ""}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </span>
  );
}
