
import connectDB from "@/lib/db";
import Product from "@/lib/models/product";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import mongoose from "mongoose";

// --- جلب منتج واحد بالـ ID ---
export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params; // Next.js بياخد الـ id من اسم المجلد [id]

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "تنسيق الـ ID غير صحيح" }, { status: 400 });
    }

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ error: "عفواً، المنتج ده مش موجود" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "مشكلة في السيرفر" }, { status: 500 });
  }
}


