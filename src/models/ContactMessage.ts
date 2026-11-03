import mongoose, { type InferSchemaType } from "mongoose";

const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true, maxlength: 20, default: "" },
    subject: { type: String, trim: true, maxlength: 120, default: "" },
    message: { type: String, required: true, trim: true, maxlength: 3000 },
    status: { type: String, enum: ["NEW", "READ"], default: "NEW" },
  },
  { timestamps: true },
);

contactMessageSchema.index({ status: 1, createdAt: -1 });

export type ContactMessageDocument = InferSchemaType<
  typeof contactMessageSchema
> & {
  _id: mongoose.Types.ObjectId;
};

const ContactMessage =
  mongoose.models.ContactMessage ||
  mongoose.model("ContactMessage", contactMessageSchema);

export default ContactMessage;
