import mongoose, { type InferSchemaType } from "mongoose";

const academyReviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    course: { type: String, required: true, trim: true, maxlength: 100 },
    rating: { type: Number, required: true, min: 1, max: 5 },
    message: { type: String, required: true, trim: true, maxlength: 1200 },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "APPROVED",
    },
  },
  { timestamps: true },
);

academyReviewSchema.index({ rating: -1, createdAt: -1 });

export type AcademyReviewDocument = InferSchemaType<
  typeof academyReviewSchema
> & {
  _id: mongoose.Types.ObjectId;
};

const AcademyReview =
  mongoose.models.AcademyReview ||
  mongoose.model("AcademyReview", academyReviewSchema);

export default AcademyReview;
