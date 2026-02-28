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

export default function FeedbackForm() {
  const [submitted, setSubmitted] = useState(false);
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

    setSubmitted(true);
  };

  const RatingRow = ({
    value,
    onChange,
    color
  }: {
    value: number;
    onChange: (val: number) => void;
    color: string;
  }) => {
    const options = [
      { label: "Strongly Disagree", rating: 1 },
      { label: "Disagree", rating: 2 },
      { label: "Agree", rating: 3 },
      { label: "Strongly Agree", rating: 4 }
    ];

    return (
      <div className="flex flex-wrap items-center gap-6 mt-4">
        {options.map((opt) => (
          <div key={opt.rating} className="flex items-center gap-2">
            <button
              onClick={() => onChange(opt.rating)}
              className={`w-10 h-10 rounded-full border font-semibold transition-all duration-200
                ${
                  value === opt.rating
                    ? `${color} text-white scale-110 shadow-md`
                    : "bg-white hover:bg-gray-100"
                }`}
            >
              {opt.rating}
            </button>

            <span className="text-sm text-gray-600 whitespace-nowrap">
              {opt.label}
            </span>
          </div>
        ))}
      </div>
    );
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-md">
          <h1 className="text-3xl font-bold text-green-600 mb-4">
            🎉 Thank You!
          </h1>
          <p className="text-gray-700">
            Your feedback has been submitted successfully.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-4xl">

        <h1 className="text-3xl font-bold text-center mb-10">
          Training Feedback
        </h1>

        {/* Programme Section */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-6 text-blue-600 border-b pb-2">
            Programme Feedback
          </h2>

          {programmeQuestions.map((q, index) => (
            <div key={index} className="mb-8">
              <p className="font-medium">{q}</p>

              <RatingRow
                value={programme[index]}
                onChange={(val) =>
                  handleProgrammeChange(index, val)
                }
                color="bg-blue-600"
              />
            </div>
          ))}
        </div>

        {/* Trainer Section */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-6 text-green-600 border-b pb-2">
            Trainer Feedback
          </h2>

          {trainerQuestions.map((q, index) => (
            <div key={index} className="mb-8">
              <p className="font-medium">{q}</p>

              <RatingRow
                value={trainer[index]}
                onChange={(val) =>
                  handleTrainerChange(index, val)
                }
                color="bg-green-600"
              />
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={submitFeedback}
            className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
}