"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateTraining() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    date: "",
    instructor: ""
  });

  const handleSubmit = async () => {
    if (!form.title || !form.date || !form.instructor) {
      alert("Please fill all fields");
      return;
    }

    const res = await fetch("/api/training", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (data.success) {
      router.push(`/admin/dashboard/${data.id}`);
    } else {
      alert("Failed to create training");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Create Training
        </h1>

        <input
          type="text"
          placeholder="Training Title"
          className="w-full border p-2 mb-4 rounded"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          type="date"
          className="w-full border p-2 mb-4 rounded"
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <input
          type="text"
          placeholder="Instructor Name"
          className="w-full border p-2 mb-6 rounded"
          onChange={(e) => setForm({ ...form, instructor: e.target.value })}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Generate Feedback Form
        </button>
      </div>
    </div>
  );
}