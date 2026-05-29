"use client";

import { useCart } from "@/lib/context/CartContext";
import { useLanguage } from "@/lib/context/LanguageProvider";
import { MessageCircle, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
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

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 px-4">
        <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-full">
          <ShoppingBag size={64} className="text-amber-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 text-center">
          {t("cart.emptyTitle")}
        </h2>
        <p className="text-slate-500 text-center max-w-xs">
          {t("cart.emptyText")}
        </p>
        <Link
          href="/products"
          className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all"
        >
          {t("cart.browse")}
        </Link>
      </div>
    );
  }

  return (
    <div
      className="w-full mx-auto p-3 sm:p-6 py-6 sm:py-12"
         dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <div className="mb-8 sm:mb-12">
        <h1 className="text-2xl text-center sm:text-4xl font-black bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
          {t("cart.title")}
        </h1>
      </div>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item._id}
            className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 bg-white p-3 sm:p-5 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-md hover:shadow-xl hover:border-amber-200 transition-all duration-300"
          >
            <div className="relative w-20 h-20 sm:w-32 sm:h-32 rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 shrink-0 ring-2 ring-amber-100">
              <Image
                src={item.image || "/double-sofa-01.png"}
                alt="Product Image"
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1 text-right space-y-2">
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {item.name}
              </h3>
              <p className="text-amber-500 font-black text-sm sm:text-base">
                {item.price?.toLocaleString()} {currency}
              </p>
            </div>

            <div className="flex items-center gap-1 sm:gap-3 bg-gradient-to-r from-slate-50 to-slate-100 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full border border-slate-200 shadow-sm">
              <button
                onClick={() => updateQuantity(item._id, -1)}
                className="p-1 sm:p-2 hover:bg-red-100 hover:text-red-600 rounded-lg transition-all duration-200"
              >
                <Minus size={16} className="sm:w-[18px] sm:h-[18px]" />
              </button>
              <span className="font-bold w-6 text-center text-sm min-w-fit px-1">
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item._id, 1)}
                className="p-1 sm:p-2 hover:bg-blue-100 hover:text-blue-600 rounded-lg transition-all duration-200"
              >
                <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />
              </button>
            </div>

            <button
              onClick={() => removeFromCart(item._id)}
              className="p-2 sm:p-3 text-rose-400 hover:bg-rose-100 hover:text-rose-600 rounded-xl sm:rounded-2xl transition-all duration-200 hover:scale-110"
            >
              <Trash2 size={18} className="sm:w-[22px] sm:h-[22px]" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 sm:mt-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-5 sm:p-8 rounded-2xl sm:rounded-[2.5rem] shadow-2xl border border-slate-700">
        <div className="flex justify-center items-center gap-4 mb-6 sm:mb-8 border-b border-slate-600 pb-5 sm:pb-6">
          <span className="text-xl text-slate-300 font-semibold">
            {t("cart.total")}
          </span>
          <span className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            {cartTotal?.toLocaleString()} {currency}
          </span>
        </div>

        <a
          href={generateWhatsAppMessage()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white py-4 sm:py-5 rounded-xl sm:rounded-2xl font-bold hover:shadow-2xl  flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg active:scale-95"
        >
          <MessageCircle size={20} className="sm:w-[24px] sm:h-[24px]" />
          {t("cart.checkout")}
        </a>
      </div>
    </div>
  );
}
