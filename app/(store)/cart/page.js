"use client";

import { useCart } from "@/lib/context/CartContext";
import { useLanguage } from "@/lib/context/LanguageProvider";
import { MessageCircle, Minus, Plus, ShoppingBag, Trash2, CreditCard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const { t, locale } = useLanguage();

  const phoneNumber = "201011761133"; // الرقم بالصيغة الدولية
  const currency = t("cart.currency");

  const generateWhatsAppMessage = () => {
    const itemsList = cart
      .map((item) => {
        const itemTotal = item.price * item.quantity;
        return locale === "ar"
          ? `- ${item.name} (الكمية: ${item.quantity}) - ${itemTotal} ${currency}`
          : `- ${item.name} (Qty: ${item.quantity}) - ${itemTotal} ${currency}`;
      })
      .join("\n");

    const message =
      locale === "ar"
        ? `${t("productDetail.specialRequest")}\n\n${itemsList}\n\n${t("cart.total")} ${cartTotal} ${currency}\n\nمن فضلك اخبرني بالخطوات التالية.`
        : `${t("productDetail.specialRequest")}\n\n${itemsList}\n\n${t("cart.total")} ${cartTotal} ${currency}\n\nPlease let me know the next steps.`;
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  // 🛒 حالة السلة الفارغة: تحويلها بالكامل لتكون متناسقة مع الألوان الداكنة والذهبية الملكية
  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 px-4 bg-transparent text-zinc-100">
        <div className="p-6 bg-primary/10 rounded-full border border-primary/20 shadow-[0_0_30px_rgba(214,175,55,0.15)] animate-pulse">
          <ShoppingBag size={64} className="text-primary" />
        </div>
        <h2 className="text-2xl font-black text-white text-center tracking-wide">
          {t("cart.emptyTitle")}
        </h2>
        <p className="text-zinc-400 text-center max-w-xs font-medium text-sm">
          {t("cart.emptyText")}
        </p>
        <Link
          href="/products"
          className="bg-primary text-black px-8 py-3.5 rounded-xl font-black hover:bg-amber-400 hover:shadow-[0_10px_25px_rgba(214,175,55,0.3)] transition-all duration-300 active:scale-95 text-center"
        >
          {t("cart.browse")}
        </Link>
      </div>
    );
  }

  return (
    <div
      className="w-full mx-auto p-3 sm:p-6 py-6 sm:py-12 bg-transparent text-zinc-100"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      {/* عنوان الصفحة بالذهبي الملكي اللامع والمطور بدلاً من البرتقالي القديم */}
      <div className="mb-8 sm:mb-12">
        <h1 className="text-3xl text-center sm:text-5xl font-black text-primary tracking-wide drop-shadow-[0_2px_10px_rgba(214,175,55,0.2)]">
          {t("cart.title")}
        </h1>
      </div>

      {/* قائمة المنتجات في السلة */}
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item._id}
            // 🎯 التعديل: الكارد أصبح زجاجي داكن شفاف مدمج ومظلم مع بوردر مضيء ناعم
            className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 bg-white/[0.02] p-3 sm:p-5 rounded-2xl sm:rounded-[2rem] border border-white/[0.06] backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:border-primary/40 transition-all duration-300 group/item"
          >
            {/* كونتينر صورة المنتج الزجاجي */}
            <div className="relative w-20 h-20 sm:w-32 sm:h-32 rounded-xl sm:rounded-2xl overflow-hidden bg-zinc-950/50 shrink-0 border border-white/[0.08]">
              <Image
                src={item.image || "/double-sofa-01.png"}
                alt="Product Image"
                fill
                className="object-cover transition-transform duration-700 group-hover/item:scale-105"
              />
            </div>

            {/* تفاصيل المنتج (الاسم والسعر) */}
            <div className="flex-1 text-center sm:text-start space-y-1.5 w-full">
              <h3 className="text-base sm:text-xl font-black text-white leading-tight tracking-wide">
                {item.name}
              </h3>
              <p className="text-primary font-black text-base tracking-wide">
                {item.price?.toLocaleString()} {currency}
              </p>
            </div>

            {/* أزرار زيادة ونقص الكمية: زجاجية كريستالية دقيقة وراقية مع بوردر خفيف */}
            <div className="flex items-center gap-1 sm:gap-3 bg-zinc-950/60 px-3 py-1.5 rounded-full border border-white/[0.06] backdrop-blur-sm shadow-inner">
              <button
                onClick={() => updateQuantity(item._id, -1)}
                className="p-1.5 hover:bg-red-500/10 text-zinc-400 hover:text-red-400 rounded-lg transition-all duration-200"
              >
                <Minus size={14} className="sm:w-[16px] sm:h-[16px]" />
              </button>
              <span className="font-black w-6 text-center text-sm min-w-fit px-1 text-zinc-100">
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item._id, 1)}
                className="p-1.5 hover:bg-primary/10 text-zinc-400 hover:text-primary rounded-lg transition-all duration-200"
              >
                <Plus size={14} className="sm:w-[16px] sm:h-[16px]" />
              </button>
            </div>

            {/* زر حذف المنتج من السلة: تحويله لأحمر زجاجي راقي متناسق مع الحذف في الأدمن */}
            <button
              onClick={() => removeFromCart(item._id)}
              className="p-2 sm:p-3 text-red-400/70 hover:bg-red-500/10 hover:text-red-400 rounded-xl sm:rounded-2xl transition-all duration-200 hover:scale-110 shrink-0"
            >
              <Trash2 size={18} className="sm:w-[22px] sm:h-[22px]" />
            </button>
          </div>
        ))}
      </div>

      {/* بوكس الإجمالي وأزرار الدفع والمتابعة الفخمة */}
      <div className="mt-8 sm:mt-12 bg-zinc-950/80 backdrop-blur-xl text-white p-5 sm:p-8 rounded-2xl sm:rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.7)] border border-white/[0.08]">

        {/* صف الإجمالي: نص رمادي وسعر ذهبي متوهج وبارز */}
        <div className="flex justify-between items-center gap-4 mb-6 sm:mb-8 border-b border-white/[0.08] pb-5 sm:pb-6">
          <span className="text-base sm:text-xl text-zinc-400 font-bold tracking-wide">
            {t("cart.total")}
          </span>
          <span className="text-2xl sm:text-4xl font-black text-primary tracking-wider drop-shadow-[0_2px_8px_rgba(214,175,55,0.25)]">
            {cartTotal?.toLocaleString()} {currency}
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {/* 🚀 الزرار الرئيسي: الانتقال للدفع الإلكتروني باللون الذهبي الملكي الصريح والخاطف للعين واللمعان */}
          <Link
            href="/checkout"
            className="w-full bg-primary text-black py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black hover:bg-amber-400 hover:shadow-[0_10px_30px_rgba(214,175,55,0.25)] flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg active:scale-[0.98] transition-all duration-300 text-center tracking-wide uppercase shadow-xl"
          >
            <CreditCard size={22} className="shrink-0" />
            <span>
              {locale === "ar" ? "الانتقال للدفع الإلكتروني (فيزا / انستا باي)" : "Proceed to Checkout (Visa / InstaPay)"}
            </span>
          </Link>

          {/* 💬 زرار الواتساب البديل: تحويله لـ كارت زجاجي شفاف وراقي كخيار ثانوي أنيق ومريح للغاية */}
          <a
            href={generateWhatsAppMessage()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-white/[0.02] border border-white/[0.08] text-zinc-300 hover:bg-white/[0.06] hover:text-primary hover:border-primary/40 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-bold flex items-center justify-center gap-2 text-sm sm:text-base active:scale-[0.98] transition-all duration-300 text-center backdrop-blur-md"
          >
            <MessageCircle size={18} className="text-primary" />
            <span>
              {locale === "ar" ? "أو اطلب عبر الواتساب مباشرة" : "Or Order via WhatsApp"}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
