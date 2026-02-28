"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [trainings, setTrainings] = useState<any[]>([]);
  const [selectedTraining, setSelectedTraining] = useState<any | null>(null);

  const fetchTrainings = async () => {
    const res = await fetch("/api/training");
    const data = await res.json();
    setTrainings(data);
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this training?"
    );

    if (!confirmDelete) return;

    await fetch(`/api/training/${id}`, {
      method: "DELETE",
    });

    fetchTrainings(); // refresh data
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      {trainings.length === 0 ? (
        <p>No trainings created yet.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3">Title</th>
              <th className="border p-3">Instructor</th>
               <th className="border p-3">Created On</th>
              <th className="border p-3">Responses</th>
              <th className="border p-3">Avg Programme</th>
              <th className="border p-3">Avg Trainer</th>
              <th className="border p-3">Satisfaction</th>
              <th className="border p-3">Form</th>
              <th className="border p-3">Actions</th>
              <th className="border p-3">View</th>
            </tr>
          </thead>

          <tbody>
            {trainings.map((training) => {
              const responses = training.responses || [];
              const totalResponses = responses.length;

              let avgProgramme = 0;
              let avgTrainer = 0;
              let percentage = 0;

              if (totalResponses > 0) {
                const programmeRatings = responses.map(
                  (r: any) => r.programme[0]
                );

                const trainerRatings = responses.map(
                  (r: any) => r.trainer[0]
                );

                avgProgramme =
                  programmeRatings.reduce(
                    (a: number, b: number) => a + b,
                    0
                  ) / totalResponses;

                avgTrainer =
                  trainerRatings.reduce(
                    (a: number, b: number) => a + b,
                    0
                  ) / totalResponses;

                const overall =
                  (avgProgramme + avgTrainer) / 2;

                percentage = (overall / 4) * 100;
              }

              return (
                <tr key={training._id}>
                  <td className="border p-3">
                    {training.title}
                  </td>
                  <td className="border p-3">
                    {training.instructor}
                  </td>


 <td className="border p-3">
    {training.createdAt
      ? new Date(training.createdAt).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "-"}
  </td>




                  <td className="border p-3">
                    {totalResponses}
                  </td>
                  <td className="border p-3">
                    {avgProgramme.toFixed(2)}
                  </td>
                  <td className="border p-3">
                    {avgTrainer.toFixed(2)}
                  </td>
                  <td className="border p-3">
                    {percentage.toFixed(1)}%
                  </td>

                  {/* Open Form */}
                  <td className="border p-3">
                    <a
                      href={`/feedback/${training._id}`}
                      target="_blank"
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Open Form
                    </a>
                  </td>

                  {/* Delete */}
                  <td className="border p-3">
                    <button
                      onClick={() =>
                        handleDelete(String(training._id))
                      }
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                  <td className="border p-3">
  <button
    onClick={() => setSelectedTraining(training)}
    className="bg-purple-600 text-white px-3 py-1 rounded"
  >
    View Responses
  </button>
</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}


      {selectedTraining && (
  <div className="mt-10 bg-white p-6 rounded-xl shadow-lg">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">
        Responses for {selectedTraining.title}
      </h2>

      <button
        onClick={() => setSelectedTraining(null)}
        className="text-red-500 font-semibold"
      >
        Close
      </button>
    </div>

    {selectedTraining.responses.length === 0 ? (
      <p>No responses submitted yet.</p>
    ) : (
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Programme Avg</th>
            <th className="border p-2">Trainer Avg</th>
            <th className="border p-2">Submitted On</th>
          </tr>
        </thead>
        <tbody>
          {selectedTraining.responses.map(
            (response: any, index: number) => {
              const programmeAvg =
                response.programme.reduce(
                  (a: number, b: number) => a + b,
                  0
                ) / response.programme.length;

              const trainerAvg =
                response.trainer.reduce(
                  (a: number, b: number) => a + b,
                  0
                ) / response.trainer.length;

              return (
                <tr key={index}>
                  <td className="border p-2">
                    {programmeAvg.toFixed(2)}
                  </td>
                  <td className="border p-2">
                    {trainerAvg.toFixed(2)}
                  </td>
                  <td className="border p-2">
                    {new Date(
                      response.submittedAt
                    ).toLocaleString()}
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    )}
  </div>
)}
    </div>
  );
}