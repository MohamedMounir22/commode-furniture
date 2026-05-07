import connectDB from "@/lib/db";
import LastDelivered from "@/lib/models/LastDelivered";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

// --- Get all last delivered items ---
export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const isActive = searchParams.get("isActive");

    const query = isActive !== null ? { isActive: isActive === "true" } : {};
    const items = await LastDelivered.find(query)
      .sort({ order: 1, createdAt: -1 });

    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch last delivered items" },
      { status: 500 }
    );
  }
}

// --- Create a new last delivered item (POST) ---
export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();

    const newItem = await LastDelivered.create(data);

    if (newItem) {
      revalidateTag("last-delivered-data");
    }

    return NextResponse.json(
      {
        message: "Last delivered item added successfully",
        item: newItem,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error adding last delivered item",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// --- Update a last delivered item (PUT) ---
export async function PUT(request) {
  try {
    await connectDB();
    const data = await request.json();
    const { _id, ...updateData } = data;

    if (!_id) {
      return NextResponse.json(
        { error: "ID is required for update" },
        { status: 400 }
      );
    }

    const updatedItem = await LastDelivered.findByIdAndUpdate(
      _id,
      { ...updateData, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return NextResponse.json(
        { error: "Last delivered item not found" },
        { status: 404 }
      );
    }

    revalidateTag("last-delivered-data");

    return NextResponse.json(
      {
        message: "Last delivered item updated successfully",
        item: updatedItem,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error updating last delivered item",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// --- Delete a last delivered item (DELETE) ---
export async function DELETE(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID is required for deletion" },
        { status: 400 }
      );
    }

    const deletedItem = await LastDelivered.findByIdAndDelete(id);

    if (!deletedItem) {
      return NextResponse.json(
        { error: "Last delivered item not found" },
        { status: 404 }
      );
    }

    revalidateTag("last-delivered-data");

    return NextResponse.json(
      { message: "Last delivered item deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error deleting last delivered item",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
