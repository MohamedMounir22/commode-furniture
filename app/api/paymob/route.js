import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // 1. استقبال بيانات الطلب من الفرونت إند
    const { amount, billingData } = await request.json();

    // تحويل المبلغ لقرش
    const amountCents = Math.round(parseFloat(amount) * 100);

    // الخطوة الأولى: طلب الـ Authentication Token
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
      console.error("Paymob Auth Error: API Key might be invalid or missing.");
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

    if (!orderId) {
      console.error("Paymob Order Error:", orderData);
      return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }

    // 🌟 جلب الـ Integration ID والتأكد من تحويله لرقم صح
    const integrationId = process.env.PAYMOB_INTEGRATION_ID
      ? parseInt(process.env.PAYMOB_INTEGRATION_ID)
      : null;

    if (!integrationId) {
      console.error("Paymob Error: PAYMOB_INTEGRATION_ID is missing in .env.local");
      return NextResponse.json({ error: "Integration ID missing" }, { status: 500 });
    }

    // الخطوة الثالثة: طلب مفتاح الدفع النهائي (Payment Key)
    const paymentKeyResponse = await fetch("https://accept.paymob.com/api/acceptance/payment_keys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        auth_token: token,
        amount_cents: amountCents,
        expiration: 3600,
        order_id: orderId,
        billing_data: {
          apartment: billingData?.apartment || "NA",
          email: billingData?.email || "client@commode.com",
          floor: billingData?.floor || "NA",
          first_name: billingData?.firstName || "Customer",
          street: billingData?.street || "NA",
          building: billingData?.building || "NA",
          phone_number: billingData?.phone || "01000000000",
          shipping_method: "PKG",
          postal_code: "NA",
          city: "Cairo",
          country: "EG",
          last_name: billingData?.lastName || "Furniture",
          state: "Cairo",
        },
        currency: "EGP",
        integration_id: integrationId, // 🌟 تم التعديل هنا
        lock_order_when_paid: "true",
      }),
    });

    const paymentKeyData = await paymentKeyResponse.json();
    const paymentToken = paymentKeyData.token;

    if (!paymentToken) {
      console.error("Paymob Payment Key Error:", paymentKeyData);
      return NextResponse.json({ error: "Failed to get payment token" }, { status: 500 });
    }

    // 2. إرجاع رابط الـ Iframe النهائي للفرونت إند
    const iframeId = process.env.PAYMOB_IFRAME_ID || "742382"; // 🌟 تم التعديل هنا
    const redirectUrl = `https://accept.paymob.com/api/acceptance/iframes/${iframeId}?payment_token=${paymentToken}`;

    return NextResponse.json({ url: redirectUrl });

  } catch (error) {
    console.error("Paymob API Route Caught Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
