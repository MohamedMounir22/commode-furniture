import connectDB from "@/lib/db";
import Order from "@/lib/models/Order";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const orders = await Order.find({}).sort({ createdAt: -1 }).lean();

    return NextResponse.json(
      orders.map((order) => ({
        ...order,
        _id: order._id.toString(),
      })),
      { status: 200 },
    );
  } catch (error) {
    console.error("Orders GET error:", error);
    return NextResponse.json({ error: "فشل جلب الطلبات" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    const order = await Order.create({
      paymentMethod: body.paymentMethod || "instapay",
      customerName: body.customerName || "عميل",
      phone: body.phone || "",
      address: body.address || "",
      totalAmount: Number(body.totalAmount || 0),
      items: body.items || [],
      receiptImage: body.receiptImage || "",
      status: "pending",
    });

    const orderData = order.toObject ? order.toObject() : order;

    return NextResponse.json(orderData, { status: 201 });
  } catch (error) {
    console.error("Orders POST error:", error);
    return NextResponse.json({ error: "فشل حفظ الطلب" }, { status: 500 });
  }
}
