"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { useCart } from "@/lib/context/CartContext";
import { MessageCircle, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const { t, locale } = useLanguage();

  const phoneNumber = "201013598586";
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
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <ShoppingBag size={64} className="text-slate-300" />
        <h2 className="text-2xl font-bold text-slate-900">
          {t("cart.emptyTitle")}
        </h2>
        <p className="text-slate-500 text-center max-w-xs">
          {t("cart.emptyText")}
        </p>
        <Link
          href="/products"
          className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all"
        >
          {t("cart.browse")}
        </Link>
      </div>
    );
  }

  return (
    <div
      className="max-w-4xl mx-auto p-6 py-12"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <h1 className="text-3xl font-bold mb-10 text-right text-slate-900">
        {t("cart.title")}
      </h1>

      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={item._id}
            className="flex flex-col md:flex-row items-center gap-6 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm"
          >
            <div className="relative w-32 h-32 rounded-2xl overflow-hidden bg-slate-50 shrink-0">
              <Image
                src={item.image || "/double-sofa-01.png"}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1 text-right">
              <h3 className="text-xl font-bold text-slate-900">{item.name}</h3>
              <p className="text-[#D4AF37] font-bold mt-1">
                {item.price?.toLocaleString()} {currency}
              </p>
            </div>

            <div className="flex items-center gap-4 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
              <button
                onClick={() => updateQuantity(item._id, -1)}
                className="p-1 hover:text-red-600 transition-colors"
              >
                <Minus size={18} />
              </button>
              <span className="font-bold w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item._id, 1)}
                className="p-1 hover:text-blue-600 transition-colors"
              >
                <Plus size={18} />
              </button>
            </div>

            <button
              onClick={() => removeFromCart(item._id)}
              className="p-3 text-rose-500 hover:bg-rose-50 rounded-2xl transition-all"
            >
              <Trash2 size={22} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl">
        <div className="flex justify-between items-center mb-8 border-b border-slate-700 pb-6">
          <span className="text-xl text-slate-400">{t("cart.total")}</span>
          <span className="text-3xl font-black">
            {cartTotal?.toLocaleString()} {currency}
          </span>
        </div>

        <a
          href={generateWhatsAppMessage()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-emerald-500 text-white py-5 rounded-2xl font-bold hover:bg-emerald-600 transition-all flex items-center justify-center gap-3 text-lg"
        >
          <MessageCircle size={24} />
          {t("cart.checkout")}
        </a>
      </div>
    </div>
  );
}
