import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Training from "@/models/Training";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    // ✅ IMPORTANT FIX
    const { id } = await context.params;

    console.log("ID RECEIVED:", id);

    const deleted = await Training.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Deleted successfully",
    });

  } catch (error) {
    console.error("DELETE ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}