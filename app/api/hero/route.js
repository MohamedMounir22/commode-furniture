import dbConnect from "@/lib/db.js"; // تأكد من مسار ملف الاتصال بقاعدة البيانات
import { NextResponse } from "next/server";
import Hero from "@/lib/models/Hero.js"; // تأكد من مسار موديل الهيرو

// 1. جلب كل السلايدات (GET)
export async function GET() {
  await dbConnect();
  try {
    const slides = await Hero.find({ isActive: true }).sort({ order: 1 });
    return NextResponse.json({ success: true, data: slides }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// 2. إضافة سلايد جديد (POST)
export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    const slide = await Hero.create(body);
    return NextResponse.json({ success: true, data: slide }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
