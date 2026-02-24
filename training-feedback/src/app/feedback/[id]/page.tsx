"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

const programmeQuestions = [
  "Objectives were clearly explained",
  "Programme was well structured",
  "Presentation was appropriate",
  "Quality of presentation was high",
  "Time allocation was reasonable"
];

const trainerQuestions = [
  "Faculty inputs were appropriate",
  "Communication was clear",
  "Queries were answered",
  "Participants were involved"
];

export default function ṣ() {
  const { id } = useParams();

  const [programme, setProgramme] = useState<number[]>(
    Array(programmeQuestions.length).fill(0)
  );

  const [trainer, setTrainer] = useState<number[]>(
    Array(trainerQuestions.length).fill(0)
  );

  const handleProgrammeChange = (index: number, value: number) => {
    const updated = [...programme];
    updated[index] = value;
    setProgramme(updated);
  };

  const handleTrainerChange = (index: number, value: number) => {
    const updated = [...trainer];
    updated[index] = value;
    setTrainer(updated);
  };

  const submitFeedback = async () => {
    if (programme.includes(0) || trainer.includes(0)) {
      alert("Please answer all questions");
      return;
    }

    await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, programme, trainer })
    });

    alert("Feedback Submitted Successfully!");
  };

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Training Feedback
      </h1>

      {/* Programme Section */}
      <h2 className="text-xl font-semibold mb-4">
        Programme Feedback
      </h2>

      {programmeQuestions.map((q, index) => (
        <div key={index} className="mb-4">
          <p className="mb-2">{q}</p>
          {[1, 2, 3, 4].map((rating) => (
            <button
              key={rating}
              onClick={() =>
                handleProgrammeChange(index, rating)
              }
              className={`px-3 py-1 mr-2 border rounded ${
                programme[index] === rating
                  ? "bg-blue-600 text-white"
                  : ""
              }`}
            >
              {rating}
            </button>
          ))}
        </div>
      ))}

      {/* Trainer Section */}
      <h2 className="text-xl font-semibold mt-6 mb-4">
        Trainer Feedback
      </h2>

      {trainerQuestions.map((q, index) => (
        <div key={index} className="mb-4">
          <p className="mb-2">{q}</p>
          {[1, 2, 3, 4].map((rating) => (
            <button
              key={rating}
              onClick={() =>
                handleTrainerChange(index, rating)
              }
              className={`px-3 py-1 mr-2 border rounded ${
                trainer[index] === rating
                  ? "bg-green-600 text-white"
                  : ""
              }`}
            >
              {rating}
            </button>
          ))}
        </div>
      ))}

      <button
        onClick={submitFeedback}
        className="bg-black text-white px-6 py-2 mt-6 rounded"
      >
        Submit Feedback
      </button>
    </div>
  );
}