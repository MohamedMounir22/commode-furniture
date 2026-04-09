"use client"; // ضروري عشان نستخدم الـ State والتفاعل
import { useEffect, useState } from "react";

import Image from "next/image"; // استيراد مكون Image من Next.js لتحسين تحميل الصور

import Link from "next/link"; // استيراد مكون Link للتنقل بين الصفحات
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css"; // استيراد أنماط Lightbox

import { Flame, ShoppingCart, Trash2 } from "lucide-react"; // استيراد أيقونة سلة وزبالة ولهيب

export default function ProductCard({
  id,
  name,
  price,
  description,
  images,
  discount = 0,
}) {
  // Convert discount to number to ensure proper comparison
  const discountValue = Number(discount) || 0;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(false);
  const displayImage =
    images && images.length > 0
      ? images[currentImageIndex]
      : "/double-sofa-01.png";

  // تعريف الحالة: هل المنتج في السلة ولا لأ؟ (البداية false)
  const [isInCart, setIsInCart] = useState(false);

  // state للتحكم في فتح وقفل الـ Lightbox
  const [open, setOpen] = useState(false);

  // دالة بتبدل الحالة لما نضغط على الزرار
  const toggleCart = () => {
    setIsInCart(!isInCart);
  };

  const changeImage = (index) => {
    if (index !== currentImageIndex) {
      setImageLoading(true);
      setCurrentImageIndex(index);
      // Small delay to show loading state, then hide it
      setTimeout(() => setImageLoading(false), 100);
    }
  };

  // Prevent image downloading
  const handleContextMenu = (e) => {
    e.preventDefault();
    return false;
  };

  const handleDragStart = (e) => {
    e.preventDefault();
    return false;
  };

  const handleKeyDown = (e) => {
    // Prevent Ctrl+S, Ctrl+U, F12, etc.
    if ((e.ctrlKey && (e.key === "s" || e.key === "u")) || e.key === "F12") {
      e.preventDefault();
      return false;
    }
  };

  // Preload all images for faster switching
  useEffect(() => {
    if (images && images.length > 0) {
      images.forEach((src) => {
        const img = new window.Image();
        img.src = src;
      });
    }

    // Add global keyboard event listeners
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [images]);

  return (
    <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full hover:shadow-2xl transition-all duration-300 overflow-hidden">
      {/* الصورة */}
      <div
        className="relative h-64 w-full cursor-pointer overflow-hidden group select-none"
        onClick={() => setOpen(true)} // فتح الـ Lightbox
        onContextMenu={handleContextMenu}
        onDragStart={handleDragStart}
        style={{
          WebkitUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
          userSelect: "none",
          WebkitTouchCallout: "none",
        }}
      >
        <Image
          src={displayImage}
          fill
          alt={name}
          // ضفنا z-0 و object-cover عشان نضمن الوضوح
          className={`object-cover z-0 group-hover:scale-105 transition-transform duration-300 product-card ${
            imageLoading ? "opacity-50" : "opacity-100"
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={currentImageIndex === 0} // Prioritize first image
          onLoad={() => setImageLoading(false)}
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
        />

        {/* Protection overlay - subtle watermark */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute top-2 left-2 text-white/10 text-xs font-bold rotate-12 select-none">
            COMMODE
          </div>
          <div className="absolute bottom-2 right-2 text-white/10 text-xs font-bold -rotate-12 select-none">
            FURNITURE
          </div>
        </div>

        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Beautiful Offer Badge */}
        {discountValue > 0 && (
          <div className="absolute top-3 right-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1 text-xs text-white font-bold flex items-center gap-1 shadow-lg border-2 border-white/20 animate-pulse hover:animate-bounce z-20">
            <Flame className="h-3 w-3" />
            خصم {discountValue}%
          </div>
        )}

        {/* طبقة شفافة تظهر عند الـ hover توحي بإمكانية الضغط */}
        <div className="absolute inset-0 bg-black/20 bg-opacity-0 group-hover:bg-opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-white opacity-0 group-hover:opacity-100 bg-opacity-50 px-3 py-1 rounded-full text-sm">
            تيكبر الصورة
          </span>
        </div>

        {images?.length > 1 ? (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/40 rounded-full px-3 py-1">
            {images.slice(0, 3).map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  changeImage(idx);
                }}
                className={`h-2.5 w-2.5 rounded-full transition-all duration-200 ${
                  idx === currentImageIndex
                    ? "bg-blue-500 scale-125"
                    : "bg-white/75 hover:bg-white/90"
                }`}
              />
            ))}
            {images.length > 3 ? (
              <span className="text-[10px] text-white/80 ml-1">
                +{images.length - 3}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>

      {/* محتوى الكارد */}
      <div className="p-6 ">
        <div className="flex flex-row items-center justify-between w-full mb-2 px-1">
          {/* السعر - ضفنا leading-none عشان نشيل أي زيادة في الطول */}
          <p className="font-sans text-lg antialiased font-bold text-blue-600 leading-none">
            {price} ج.م
          </p>

          {/* الاسم - نفس الـ leading-none عشان يترصفوا صح */}
          <p className="font-sans text-lg antialiased font-bold text-slate-800 leading-none">
            {name}
          </p>
        </div>

        <p className="text-end font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75 line-clamp-2 h-auto overflow-hidden">
          {description}
        </p>
      </div>

      {/* منطقة الأزرار */}
      <div className="p-6 pt-0 flex items-center justify-center gap-3">
        {/* التبديل بين زرار الإضافة وزرار المسح */}
        {!isInCart ? (
          // زرار الإضافة للسلة (يظهر لو المنتج مش في السلة)
          <button
            onClick={toggleCart}
            className="p-3 rounded-full bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-600 hover:text-white transition-all active:scale-90"
            title="أضف إلى السلة"
          >
            <ShoppingCart size={20} />
          </button>
        ) : (
          // زرار الحذف من السلة (يظهر لو المنتج موجود في السلة)
          <button
            onClick={toggleCart}
            className="p-3 rounded-full bg-red-50 text-red-600 border border-red-100 hover:bg-red-600 hover:text-white transition-all active:scale-90 animate-in fade-in zoom-in duration-300"
            title="إزالة من السلة"
          >
            <Trash2 size={20} />
          </button>
        )}

        {/* زرار تفاصيل المنتج الثابت */}
        <Link
          href={`/products/${id}`} // بنبعت الـ id في العنوان
          className="flex-1 max-w-[200px] font-sans font-bold text-center uppercase py-3.5 px-6 rounded-full bg-slate-900 text-red-500 shadow-md hover:scale-[1.03] active:scale-95 transition-all"
        >
          تفاصيل المنتج
        </Link>
      </div>
      {/* 1. ضيف المكون ده هنا قبل قفلة الـ div الأخيرة */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={currentImageIndex}
        // بنحول مصفوفة الروابط لشكل Lightbox بيفهمه
        slides={
          images?.map((img) => ({ src: img })) || [
            { src: "/double-sofa-01.png" },
          ]
        }
      />
    </div>
  );
}
