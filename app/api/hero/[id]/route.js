import dbConnect from "@/lib/db.js";
import Hero from "@/lib/models/Hero.js";
import { NextResponse } from "next/server";

// 1. تحديث سلايد (PUT)
export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await req.json();

    const updatedSlide = await Hero.findByIdAndUpdate(id, body, {
      returnDocument: 'after',
      runValidators: true,
    });

    if (!updatedSlide) {
      return NextResponse.json(
        { success: false, error: "Slide not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedSlide }, { status: 200 });
  } catch (error) {
    console.error("Error updating hero slide:", error);
    return NextResponse.json(
      { success: false, error: "Database not available" },
      { status: 500 }
    );
  }
}

// 2. حذف سلايد (DELETE)
export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    const deletedSlide = await Hero.findByIdAndDelete(id);

    if (!deletedSlide) {
      return NextResponse.json(
        { success: false, error: "Slide not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: deletedSlide }, { status: 200 });
  } catch (error) {
    console.error("Error deleting hero slide:", error);
    return NextResponse.json(
      { success: false, error: "Database not available" },
      { status: 500 }
    );
  }
}