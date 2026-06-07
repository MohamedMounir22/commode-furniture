"use client";
import { useCart } from "@/lib/context/CartContext";
import { useEffect, useState } from "react";
// تأكد من صحة مسار الـ Card كامبوننت حسب مشروعك
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("card"); // الفيزا هي الخيار الافتراضي
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState("");
  const { cart, cartTotal, cartCount } = useCart();

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleReceiptChange = (event) => {
    const file = event.target.files?.[0] || null;
    if (!file) return;

    if (previewUrl) URL.revokeObjectURL(previewUrl);

    const tempPreviewUrl = URL.createObjectURL(file);
    setReceipt(file);
    setPreviewUrl(tempPreviewUrl);
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 12;
      });
    }, 120);
  };

  const totalAmount = cartTotal;

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error("فشل قراءة الصورة"));
      reader.readAsDataURL(file);
    });

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
  const handleInstaPayPayment = async () => {
    if (!customerName.trim() || !customerPhone.trim() || !address.trim()) {
      alert("برجاء إدخال الاسم ورقم الهاتف والعنوان قبل تأكيد الطلب");
      return;
    }

    if (!receipt) {
      alert("برجاء رفع صورة إيصال التحويل لتأكيد طلبك عبر انستا باي");
      return;
    }

    setLoading(true);

    try {
      const receiptImage = await fileToBase64(receipt);

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentMethod: "instapay",
          customerName,
          phone: customerPhone,
          address: address,
          totalAmount,
          items: cart,
          receiptImage,
        }),
      });

      const data = await response.json();
      console.log("InstaPay order response:", data);


      if (!response.ok) {
        throw new Error(data.error || "فشل حفظ الطلب");
      }

      alert("تم حفظ طلبك بنجاح في قاعدة البيانات، وجاري مراجعة الإيصال من الإدارة.");
    } catch (error) {
      console.error("InstaPay order error:", error);
      alert(error.message || "حدث خطأ أثناء حفظ الطلب");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6 my-10" dir="rtl">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold font-heading text-foreground">إتمام عملية الشراء</h1>
        <p className="text-sm text-muted-foreground">اختر طريقة الدفع المناسبة لشحن طلبك فوراً</p>
        <p className="text-xs text-muted-foreground">العناصر في السلة: {cartCount} · الإجمالي الحالي: {totalAmount} ج.م</p>
      </div>


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
              <div> <strong>الحساب</strong> حساب بنكي</div>
              <div>📱 <strong>رقم تليفون التحويل:</strong> 01011761133</div>
              <div>👤 <strong>الاسم:</strong> osama m***** h**** k****</div>
            </div>

            <div className="space-y-3">
              <div className="grid gap-3">
                <label className="text-xs font-medium text-foreground">الاسم الكامل</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="اكتب اسمك بالكامل"
                  className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <label className="text-xs font-medium text-foreground">رقم الهاتف</label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="01xxxxxxxxx"
                  className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <label className="text-xs font-medium text-foreground">العنوان</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="اكتب عنوان التوصيل"
                  rows={3}
                  className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <label className="block text-xs font-medium text-foreground">ارفع سكرين شوت الإيصال بعد التحويل:</label>

              <input
                type="file"
                accept="image/*"
                onChange={handleReceiptChange}
                className="hidden"
                id="receiptInput"
              />

              <label
                htmlFor="receiptInput"
                className="cursor-pointer inline-flex items-center gap-2 font-bold py-3 px-6 rounded-xl shadow-lg transition-all active:scale-95 bg-green-600 hover:bg-green-700 text-white"
              >
                <span>{receipt ? `تم اختيار الصورة: ${receipt.name}` : "رفع صورة الإيصال 📸"}</span>
              </label>

              {isUploading && (
                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-green-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                    style={{ width: `${uploadProgress}%` }}
                  />
                  <p className="text-xs text-green-700 mt-1 text-center font-medium">
                    جاري رفع الصورة... {uploadProgress}%
                  </p>
                </div>
              )}

              {previewUrl && !isUploading && (
                <div className="rounded-xl border bg-muted/30 p-3">
                  <img
                    src={previewUrl}
                    alt="إيصال التحويل"
                    className="h-48 w-full rounded-lg object-cover border"
                  />
                </div>
              )}
            </div>
          </CardContent>
        )}
      </Card>




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
