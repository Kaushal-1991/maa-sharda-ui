import mongoose, { type InferSchemaType } from "mongoose";

const galleryMediaSchema = new mongoose.Schema(
  {
    fileId: { type: mongoose.Schema.Types.ObjectId, required: true },
    type: { type: String, required: true, enum: ["photos", "videos"] },
    category: { type: String, required: true, enum: ["events", "classes", "album"] },
    name: { type: String, required: true, trim: true, maxlength: 255 },
    mimeType: { type: String, required: true, maxlength: 100 },
    size: { type: Number, required: true, min: 1 },
  },
  { timestamps: true },
);

galleryMediaSchema.index({ type: 1, category: 1, createdAt: -1 });

export type GalleryMediaDocument = InferSchemaType<
  typeof galleryMediaSchema
> & {
  _id: mongoose.Types.ObjectId;
};

const GalleryMedia =
  mongoose.models.GalleryMedia ||
  mongoose.model("GalleryMedia", galleryMediaSchema);

export default GalleryMedia;
