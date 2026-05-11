import connectDB from "@/lib/db"; // تأكد إن المسار صح (db أو mongodb)
import Product from "@/lib/models/product"; // تأكد من المسار حسب مشروعك
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

// --- دالة الجلب (GET) ---
import mongoose from "mongoose"; // استيراد mongoose للتحويل اليدوي

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const filter = category ? { category } : {};
  try {
    await connectDB();
    const id = searchParams.get("id");

    if (id) {
      // التأكد إن الـ ID بتنسيق MongoDB صحيح قبل البحث
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json(
          { error: "تنسيق الـ ID غير صحيح" },
          { status: 400 },
        );
      }

      const product = await Product.findById(id);

      if (!product) {
        console.log("❌ المنتج مش موجود في الداتابيز بالـ ID ده:", id);
        return NextResponse.json(
          { error: "عفواً، الكرسي ده مش موجود" },
          { status: 404 },
        );
      }
      return NextResponse.json(product, { status: 200 });
    }
    const query = category && category !== "all" ? { category } : {};
    const products = await Product.find(query).sort({ createdAt: -1 });
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "مشكلة في السيرفر" }, { status: 500 });
  }
}

// --- دالة التعديل (PUT) ---
export async function PUT(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "ID غير صحيح" }, { status: 400 });
    }

    const data = await request.json();
    const updatedProduct = await Product.findByIdAndUpdate(id, data, {
      returnDocument: "after",
    });
    if (updatedProduct) {
      revalidateTag("products-data"); // إعادة التحقق من الكاش للمنتجات
    }

    if (!updatedProduct) {
      return NextResponse.json({ error: "المنتج مش موجود" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "✅ المنتج اتعدل بنجاح",
        product: updatedProduct,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json(
      {
        message: "❌ مشكلة في التعديل",
        error: error.message,
      },
      { status: 500 },
    );
  }
}

// --- دالة الحذف (DELETE) ---
export async function DELETE(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "ID غير صحيح" }, { status: 400 });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json({ error: "المنتج مش موجود" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "🗑️ المنتج اتمسح بنجاح",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json(
      {
        message: "❌ مشكلة في المسح",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
