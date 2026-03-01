"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-4xl">

        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-10">
          Training Feedback SaaS 🚀
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          {/* Create Form Card */}
          <div
            onClick={() => router.push("/admin/create-training")}
            className="cursor-pointer bg-blue-600 text-white p-8 rounded-xl hover:scale-105 transition-all duration-300 shadow-md"
          >
            <h2 className="text-xl font-semibold mb-2">
              Create Feedback Form
            </h2>
            <p className="text-sm opacity-90">
              Create a new training feedback form and share it with participants.
            </p>
          </div>

          {/* View Responses Card */}
          <div
            onClick={() => router.push("/admin")}
            className="cursor-pointer bg-green-600 text-white p-8 rounded-xl hover:scale-105 transition-all duration-300 shadow-md"
          >
            <h2 className="text-xl font-semibold mb-2">
              View Responses
            </h2>
            <p className="text-sm opacity-90">
              View submitted feedback responses and analyze ratings.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}