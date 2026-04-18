"use client";
import { useCart } from "@/lib/context/CartContext";
import { useLanguage } from "@/lib/context/LanguageProvider";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

export default function AddToCartButton({ product }) {
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      className={`w-full border-2 py-5 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 ${
        added
          ? "bg-emerald-50 border-emerald-500 text-emerald-600"
          : "border-slate-200 text-slate-900 hover:bg-slate-50"
      }`}
    >
      <ShoppingCart size={22} />
      {added ? t("addToCart.added") : t("addToCart.default")}
    </button>
  );
}
