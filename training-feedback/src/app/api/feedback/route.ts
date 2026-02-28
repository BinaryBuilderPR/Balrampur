import { connectDB } from "@/lib/db";
import Training from "@/models/Training";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const training = await Training.findById(body.id);

      if (!training) {
       return NextResponse.json(
      { error: "Training not found" },
        { status: 404 }
    );                      
    }

    training.responses.push({
      programme: body.programme,
      trainer: body.trainer
    });

    await training.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}