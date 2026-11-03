import mongoose from "mongoose";

const sequenceSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  value: { type: Number, required: true, default: 0 },
});

const Sequence =
  mongoose.models.Sequence || mongoose.model("Sequence", sequenceSchema);

export default Sequence;
