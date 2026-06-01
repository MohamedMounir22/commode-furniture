"use client";
import React, { useState } from "react";
// تأكد من صحة مسار الـ Card كامبوننت حسب مشروعك
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("card"); // الفيزا هي الخيار الافتراضي
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState(null);

  // إجمالي السعر (تقدر بعدين تخليه ديناميكي يقرأ من السلة أو الـ Context)
  const totalAmount = 1500;

  // 1. فانكشن الدفع بالفيزا عن طريق الـ API Route اللي عملناه لـ Paymob
  const handlePaymobPayment = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/paymob", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalAmount,
          billingData: {
            firstName: "محمد",
            lastName: "منير",
            email: "mounir@example.com",
            phone: "01060010114" // التليفون اللي هتوصل عليه رسائل التأكيد
          }
        })
      });

      const data = await res.json();
      if (data.url) {
        // تحويل العميل تلقائياً لصفحة الـ Iframe الآمنة بتاعة Paymob
        window.location.href = data.url;
      } else {
        alert("حدث خطأ في الاتصال ببوابة الدفع، تأكد من ملف الـ .env.local");
      }
    } catch (err) {
      console.error("Checkout Error:", err);
      alert("مشكلة في السيرفر، جرب تاني يا هندسة");
    } finally {
      setLoading(false);
    }
  };

  // 2. فانكشن الدفع عبر انستا باي (حفظ الطلب يدوياً)
  const handleInstaPayPayment = () => {
    if (!receipt) {
      alert("برجاء رفع صورة إيصال التحويل لتأكيد طلبك عبر انستا باي");
      return;
    }
    setLoading(true);
    // هنا مستقبلاً هتبعت الصورة والطلب للـ Database عندك
    alert("تم تسجيل طلبك بنجاح! جاري مراجعة إيصال تحويل InstaPay يدوياً.");
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6 my-10" dir="rtl">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold font-heading text-foreground">إتمام عملية الشراء</h1>
        <p className="text-sm text-muted-foreground">اختر طريقة الدفع المناسبة لشحن طلبك فوراً</p>
      </div>

      {/* 💳 خيار الدفع الإلكتروني: فيزا / ماستر كارد */}
      <Card
        className={`cursor-pointer transition-all border hover:border-amber-500/50 ${paymentMethod === "card" ? "ring-2 ring-amber-600 bg-amber-50/5" : ""}`}
        onClick={() => setPaymentMethod("card")}
      >
        <CardHeader>
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="card"
              name="payment"
              checked={paymentMethod === "card"}
              onChange={() => setPaymentMethod("card")}
              className="accent-amber-600 h-4 w-4 cursor-pointer"
            />
            <CardTitle className="cursor-pointer">الدفع الإلكتروني (فيزا / ماستر كارد)</CardTitle>
          </div>
          <CardDescription>ادفع بأمان عبر بوابة Paymob المشفرة (ندعم الكروت من داخل وخارج مصر)</CardDescription>
        </CardHeader>
        {paymentMethod === "card" && (
          <CardContent className="text-muted-foreground text-xs pb-4 animate-fade-in">
            💡 عند الضغط على تأكيد، سيتم تحويلك لصفحة دفع آمنة تابعة لـ Paymob لتجيز العملية بشكل سليم.
          </CardContent>
        )}
      </Card>

      {/* 📱 خيار الدفع عبر InstaPay */}
      <Card
        className={`cursor-pointer transition-all border hover:border-green-500/50 ${paymentMethod === "instapay" ? "ring-2 ring-green-600 bg-green-50/5" : ""}`}
        onClick={() => setPaymentMethod("instapay")}
      >
        <CardHeader>
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="instapay"
              name="payment"
              checked={paymentMethod === "instapay"}
              onChange={() => setPaymentMethod("instapay")}
              className="accent-green-600 h-4 w-4 cursor-pointer"
            />
            <CardTitle className="cursor-pointer">الدفع الفوري عبر تطبيق InstaPay</CardTitle>
          </div>
          <CardDescription>تحويل مباشر سريع بدون أي رسوم إضافية للورشة</CardDescription>
        </CardHeader>

        {paymentMethod === "instapay" && (
          <CardContent className="space-y-4 pb-4 animate-fade-in">
            <div className="bg-muted p-4 rounded-xl border text-sm space-y-2">
              <div>📌 <strong>العنوان (IPA):</strong> commode@instapay</div>
              <div>📱 <strong>رقم التليفون:</strong> 01060010114</div>
              <div>👤 <strong>الاسم:</strong> محمد منير</div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-foreground">ارفع سكرين شوت الإيصال بعد التحويل:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setReceipt(e.target.files[0])}
                className="block w-full text-xs text-muted-foreground file:ml-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-muted file:text-foreground hover:file:bg-muted/80 cursor-pointer"
              />
            </div>
          </CardContent>
        )}
      </Card>

      {/* 🚀 الزرار النهائي الديناميكي */}
      <button
        onClick={paymentMethod === "card" ? handlePaymobPayment : handleInstaPayPayment}
        disabled={loading}
        className={`w-full p-4 rounded-xl text-white font-medium text-base shadow-sm transition-all ${
          paymentMethod === "card"
            ? "bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400"
            : "bg-green-600 hover:bg-green-700 disabled:bg-green-400"
        }`}
      >
        {loading ? "جاري المعالجة الفورية..." : `تأكيد وطلب أثاثك بمبلغ ${totalAmount} ج.م`}
      </button>
    </div>
  );
}
