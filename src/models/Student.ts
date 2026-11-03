import mongoose, { type InferSchemaType } from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    registrationNumber: { type: String, unique: true, sparse: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, match: /^\d{10}$/ },
    musicOption: {
      type: String,
      required: true,
      enum: ["CLASSICAL_MUSIC", "LIGHT_MUSIC", "HARMONIUM", "GUITAR"],
    },
    mode: { type: String, required: true, enum: ["HOME", "ONLINE", "OFFLINE"] },
    address: { type: String, trim: true, maxlength: 500, default: "" },
    registrationStatus: {
      type: String,
      enum: ["PENDING", "COMPLETED"],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

studentSchema.index({ email: 1, phone: 1 }, { unique: true });

export type StudentDocument = InferSchemaType<typeof studentSchema> & {
  _id: mongoose.Types.ObjectId;
};

const Student =
  mongoose.models.Student || mongoose.model("Student", studentSchema);

export default Student;
