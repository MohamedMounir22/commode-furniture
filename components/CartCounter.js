"use client";
import { useCart } from "@/lib/context/CartContext";
import { useLanguage } from "@/lib/context/LanguageProvider";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function CartCounter() {
  const { cartCount } = useCart();
  const { t } = useLanguage();

  return (
    <Link
      href="/cart"
      // ✨ هنا التعديل: حولناه لـ خلفية سوداء شفافة مع بلور وخط تحديد ناعم جداً ونصوص منورة بالذهبي الملكي
      className="flex items-center gap-2 text-sm font-bold bg-white/[0.03] text-primary border border-white/[0.08] backdrop-blur-md px-4 py-2 rounded-xl hover:bg-primary hover:text-black hover:border-transparent transition-all duration-300 shadow-lg"
    >
      {/* الأيقونة نورت ذهبي متناسق */}
      <ShoppingBag size={18} className="stroke-[2.5]" />

      <span className="tracking-wide">
        {t("nav.cart")}
        {/* الرقم ميزناه بـ زون منفصل عشان يظهر بشياكة */}
        <span className="ml-1.5 px-1.5 py-0.5 text-xs rounded-md bg-primary/20 text-primary font-black">
          {cartCount}
        </span>
      </span>
    </Link>
  );
}
