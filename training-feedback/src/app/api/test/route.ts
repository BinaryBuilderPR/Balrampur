import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Training from "@/models/Training";

export async function GET() {
  await connectDB();

  const test = await Training.create({
    title: "Test Training",
    date: "2026-02-22",
    instructor: "Admin"
  });

  return NextResponse.json({
    message: "Database Working ✅",
    data: test
  });
}