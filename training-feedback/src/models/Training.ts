import mongoose from "mongoose";

const ResponseSchema = new mongoose.Schema({
  programme: [Number],
  trainer: [Number],
  submittedAt: { type: Date, default: Date.now }
});

const TrainingSchema = new mongoose.Schema({
  title: String,
  date: String,
  instructor: String,
  responses: [ResponseSchema],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Training ||
  mongoose.model("Training", TrainingSchema);