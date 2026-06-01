import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // 1. استقبال بيانات الطلب من الفرونت إند (السعر وبيانات العميل)
    const { amount, billingData } = await request.json();

    // تحويل المبلغ لقرش (لأن Paymob تتعامل بالـ Cents)
    const amountCents = Math.round(parseFloat(amount) * 100);

    // الخطوة الأولى لـ Paymob: طلب الـ Authentication Token
    const authResponse = await fetch("https://accept.paymob.com/api/auth/tokens", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: process.env.PAYMOB_API_KEY,
      }),
    });
    const authData = await authResponse.json();
    const token = authData.token;

    if (!token) {
      return NextResponse.json({ error: "Failed to get auth token" }, { status: 500 });
    }

    // الخطوة الثانية: تسجيل الطلب وتوليد الـ Order ID
    const orderResponse = await fetch("https://accept.paymob.com/api/ecommerce/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        auth_token: token,
        delivery_needed: "false",
        amount_cents: amountCents,
        currency: "EGP",
        items: [],
      }),
    });
    const orderData = await orderResponse.json();
    const orderId = orderData.id;

    // الخطوة الثالثة: طلب مفتاح الدفع النهائي (Payment Key)
    const paymentKeyResponse = await fetch("https://accept.paymob.com/api/acceptance/payment_keys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        auth_token: token,
        amount_cents: amountCents,
        expiration: 3600, // ساعة واحدة صلاحية الرابط
        order_id: orderId,
        billing_data: {
          apartment: billingData?.apartment || "NA",
          email: billingData?.email || "clinet@commode.com",
          floor: billingData?.floor || "NA",
          first_name: billingData?.firstName || "Customer",
          street: billingData?.street || "NA",
          building: billingData?.building || "NA",
          phone_number: billingData?.phone || "01000000000",
          shipping_method: "PKG",
          postal_code: "NA",
          city: "Damietta",
          country: "EG",
          last_name: billingData?.lastName || "Furniture",
          state: "Damietta",
        },
        currency: "EGP",
        integration_id: parseInt(process.env.NEXT_PUBLIC_PAYMOB_INTEGRATION_ID),
        lock_order_when_paid: "true",
      }),
    });

    const paymentKeyData = await paymentKeyResponse.json();
    const paymentToken = paymentKeyData.token;

    // 2. إرجاع رابط الـ Iframe النهائي للفرونت إند للتحويل المباشر
    const iframeId = process.env.NEXT_PUBLIC_PAYMOB_IFRAME_ID;
    const redirectUrl = `https://accept.paymob.com/api/acceptance/iframes/${iframeId}?payment_token=${paymentToken}`;

    return NextResponse.json({ url: redirectUrl });

  } catch (error) {
    console.error("Paymob Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
