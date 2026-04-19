import dbConnect from "@/lib/db.js"; // تأكد من مسار ملف الاتصال بقاعدة البيانات
import { NextResponse } from "next/server";
import Hero from "@/lib/models/Hero.js"; // تأكد من مسار موديل الهيرو

import dbConnect from "@/lib/db.js"; // تأكد من مسار ملف الاتصال بقاعدة البيانات
import { NextResponse } from "next/server";
import Hero from "@/lib/models/Hero.js"; // تأكد من مسار موديل الهيرو

// 1. جلب كل السلايدات (GET)
export async function GET() {
  try {
    await dbConnect();
    const slides = await Hero.find({ isActive: true }).sort({ order: 1 });
    return NextResponse.json({ success: true, data: slides }, { status: 200 });
  } catch (error) {
    console.error("Error fetching hero slides:", error);
    // Return empty array if DB not available
    return NextResponse.json({ success: true, data: [] }, { status: 200 });
  }
}

// 2. إضافة سلايد جديد (POST)
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const slide = await Hero.create(body);
    return NextResponse.json({ success: true, data: slide }, { status: 201 });
  } catch (error) {
    console.error("Error creating hero slide:", error);
    return NextResponse.json({ success: false, error: "Database not available" }, { status: 500 });
  }
}
  }
}
