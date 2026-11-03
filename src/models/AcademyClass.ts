import mongoose, { type InferSchemaType } from "mongoose";

const academyClassSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, trim: true, lowercase: true },
    title: { type: String, required: true, trim: true, maxlength: 100 },
    description: { type: String, required: true, trim: true, maxlength: 1000 },
    imageUrl: { type: String, trim: true, maxlength: 500, default: "" },
    displayOrder: { type: Number, min: 0, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

academyClassSchema.index({ slug: 1 }, { unique: true });
academyClassSchema.index({ isActive: 1, displayOrder: 1 });

export type AcademyClassDocument = InferSchemaType<
  typeof academyClassSchema
> & {
  _id: mongoose.Types.ObjectId;
};

const AcademyClass =
  mongoose.models.AcademyClass ||
  mongoose.model("AcademyClass", academyClassSchema);

export default AcademyClass;
