




// GET: لجلب كل المنتجات أو الفلترة
import connectDB from "@/lib/db";
import Product from "@/lib/models/product";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

// --- جلب كل المنتجات أو الفلترة بالقسم ---
export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const query = category && category !== "all" ? { category } : {};
    const products = await Product.find(query).sort({ createdAt: -1 });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "مشكلة في السيرفر" }, { status: 500 });
  }
}

// --- إضافة منتج جديد (POST) ---
export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();

    const newProduct = await Product.create(data);

    if (newProduct) {
      revalidateTag("products-data"); // تحديث الكاش فوراً
    }

    return NextResponse.json(
      { message: "🎉 مبروك يا هندسة! القطعة اتسجلت بنجاح", product: newProduct },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "❌ فيه حاجة غلط حصلت وأنا بسجل البيانات", error: error.message },
      { status: 500 }
    );
  }
}




