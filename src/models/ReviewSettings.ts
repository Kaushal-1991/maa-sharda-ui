import mongoose, { type InferSchemaType, type Model } from "mongoose";

const reviewSettingsSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  enabled: { type: Boolean, required: true, default: true },
});

export type ReviewSettingsDocument = InferSchemaType<
  typeof reviewSettingsSchema
>;

const ReviewSettings =
  (mongoose.models.ReviewSettings as Model<ReviewSettingsDocument> | undefined) ||
  mongoose.model<ReviewSettingsDocument>("ReviewSettings", reviewSettingsSchema);

export default ReviewSettings;
