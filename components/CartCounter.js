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
      className="flex items-center gap-2 text-sm font-semibold bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-800 transition-all"
    >
      <ShoppingBag size={18} />
      <span>
        {t("nav.cart")} ({cartCount})
      </span>
    </Link>
  );
}
