import connectDB from "@/lib/db";
import Order from "@/lib/models/Order";
import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {
  try {
    await connectDB();
    const { status } = await request.json();

    if (!status || !["pending", "confirmed", "cancelled"].includes(status)) {
      return NextResponse.json(
        { error: "حالة الطلب غير صالحة" },
        { status: 400 },
      );
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      params.id,
      { status },
      { new: true },
    );

    if (!updatedOrder) {
      return NextResponse.json(
        { error: "لم يتم العثور على الطلب" },
        { status: 404 },
      );
    }

    return NextResponse.json(updatedOrder, { status: 200 });
  } catch (error) {
    console.error("Update order status error:", error);
    return NextResponse.json(
      { error: "فشل تحديث حالة الطلب" },
      { status: 500 },
    );
  }
}
