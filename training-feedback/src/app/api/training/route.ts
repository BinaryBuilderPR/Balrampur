import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Training from "@/models/Training";

export async function GET() {
  try {
    await connectDB();

    const trainings = await Training.find().lean();

    return NextResponse.json(trainings);
  } catch (error) {
    console.error("GET ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const training = await Training.create({
      title: body.title,
      date: body.date,
      instructor: body.instructor,
    });

    return NextResponse.json({
      success: true,
      id: training._id,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}