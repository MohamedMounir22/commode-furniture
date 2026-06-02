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
      // 🎯 التعديل هنا: تحويل الزرار لثيم زجاجي شفاف في العادي، وذهبي ناعم ولامع عند الإضافة الناجحة
      className={`w-full border py-4 md:py-5 rounded-2xl font-black tracking-wide transition-all duration-300 flex items-center justify-center gap-3 active:scale-[0.98] ${
        added
          ? "bg-primary/20 border-primary text-primary shadow-[0_0_20px_rgba(214,175,55,0.2)] animate-pulse"
          : "bg-white/[0.03] border-white/[0.08] text-zinc-300 backdrop-blur-md hover:text-primary hover:border-primary/50 hover:bg-white/[0.06]"
      }`}
    >
      {/* الأيقونة بتتحرك برقة عند الإضافة */}
      <ShoppingCart size={22} className={`transition-transform duration-300 ${added ? "scale-110 text-primary" : ""}`} />

      <span>
        {added ? t("addToCart.added") : t("addToCart.default")}
      </span>
    </button>
  );
}
