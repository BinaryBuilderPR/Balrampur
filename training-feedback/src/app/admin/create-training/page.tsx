"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import QRCode from "qrcode";

export default function CreateTraining() {
  const router = useRouter();
  

  const [form, setForm] = useState({
    title: "",
    date: "",
    instructor: "",
  });

  const [qr, setQr] = useState<string | null>(null);
  const [feedbackUrl, setFeedbackUrl] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!form.title || !form.date || !form.instructor) {
      alert("Please fill all fields");
      return;
    }

    const res = await fetch("/api/training", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      const url = `${window.location.origin}/feedback/${data.id}`;

      const qrImage = await QRCode.toDataURL(url);

      setFeedbackUrl(url);
      setQr(qrImage);
    } else {
      alert("Failed to create training");
    }
  };

  const copyLink = () => {
    if (!feedbackUrl) return;
    navigator.clipboard.writeText(feedbackUrl);
    alert("Link copied!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        {!qr ? (
          <>
            <h1 className="text-2xl font-bold mb-6 text-center">
              Create Training
            </h1>

            <input
              type="text"
              placeholder="Training Title"
              className="w-full border p-2 mb-4 rounded"
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />

            <input
              type="date"
              className="w-full border p-2 mb-4 rounded"
              onChange={(e) =>
                setForm({ ...form, date: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Instructor Name"
              className="w-full border p-2 mb-6 rounded"
              onChange={(e) =>
                setForm({ ...form, instructor: e.target.value })
              }
            />

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Generate Feedback Form
            </button>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4 text-center">
              Scan to Open Feedback
            </h2>

            <img src={qr} alt="QR Code" className="mx-auto w-60 mb-4" />

            <p className="text-sm break-all mb-4 text-center">
              {feedbackUrl}
            </p>

            <button
              onClick={copyLink}
              className="w-full bg-green-600 text-white py-2 rounded mb-3"
            >
              Copy Link
            </button>

            <button
              onClick={() =>
                router.push("/admin")
              }
              className="w-full bg-gray-700 text-white py-2 rounded"
            >
              Go to Dashboard
            </button>
          </>
        )}
      </div>
    </div>
  );
}