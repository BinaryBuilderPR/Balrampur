import { connectDB } from "@/lib/db";
import Training from "@/models/Training";
import mongoose from "mongoose";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Dashboard({ params }: Props) {
  const resolvedParams = await params;   // ✅ FIX
  const id = resolvedParams.id;

  await connectDB();

  const training = await Training.findOne({
    _id: new mongoose.Types.ObjectId(id)
  }).lean();

  const responses = training.responses;

const totalResponses = responses.length;

const programmeRatings = responses.map(r => r.programme[0]);
const trainerRatings = responses.map(r => r.trainer[0]);

const avgProgramme =
  programmeRatings.reduce((a, b) => a + b, 0) / totalResponses;

const avgTrainer =
  trainerRatings.reduce((a, b) => a + b, 0) / totalResponses;

const overall = (avgProgramme + avgTrainer) / 2;

const percentage = (overall / 4) * 100;

  if (!training) {
    return <div className="p-10">Training Not Found</div>;
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">
        Feedback Details
      </h1>

      <div className="bg-white shadow p-6 rounded mb-6">
        <p><strong>Title:</strong> {training.title}</p>
        <p><strong>Date:</strong> {training.date}</p>
        <p><strong>Instructor:</strong> {training.instructor}</p>
        <p><strong>Total Responses:</strong> {training.responses.length}</p>
        <p>Average Programme Rating: {avgProgramme.toFixed(2)}</p>
        <p>Average Trainer Rating: {avgTrainer.toFixed(2)}</p>
        <p>Overall Satisfaction: {percentage.toFixed(1)}%</p>
      </div>

      <div className="bg-blue-50 p-4 rounded">
        <p className="font-semibold mb-2">Feedback Link:</p>
        <a
          href={`/feedback/${id}`}
          className="text-blue-600 underline"
        >
          {`http://localhost:3000/feedback/${id}`}
        </a>
      </div>
    </div>
  );
}