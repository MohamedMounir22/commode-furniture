"use client";
import { useCart } from "@/lib/context/CartContext";
import { useLanguage } from "@/lib/context/LanguageProvider";
import { Flame, MessageCircle, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function ProductCard({
  viewMode = "grid",
  _id: id,
  nameAr,
  nameEn,
  price,
  description,
  images,
  discount,
  bestSeller,
}) {
  const { t, locale } = useLanguage();
  const { cart, addToCart, removeFromCart } = useCart();
  const currency = t("cart.currency");
  const name = locale === "ar" ? nameAr : nameEn;
  discount = Number(discount) || 0;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const isInCart = cart.some((item) => item._id === id);

  const hasDiscount = discount > 0;
  const discountedPrice = hasDiscount
    ? price - (price * discount) / 100
    : price;

  const handleCartAction = () => {
    const payload = {
      _id: id,
      name,
      price: discountedPrice,
      image: images?.[0] || "/double-sofa-01.png",
    };

    if (isInCart) {
      removeFromCart(id);
    } else {
      addToCart(payload);
    }
  };
  const displayImage =
    images && images.length > 0
      ? images[currentImageIndex]
      : "/double-sofa-01.png";

  const handleWhatsAppOrder = () => {
    const phoneNumber = "201011761133";
    const currency = t("cart.currency");

    const message =
      locale === "ar"
        ? `أهلاً كومود، محتاج أطلب تعديلات على:\nالمنتج: ${name}\nالسعر: ${price} ${currency}\nرابط الصورة: ${displayImage}`
        : `Hello Commode, I would like to request customizations for:\nProduct: ${name}\nPrice: ${price} ${currency}\nImage link: ${displayImage}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const changeImage = (index) => {
    if (index !== currentImageIndex) {
      setImageLoading(true);
      setCurrentImageIndex(index);
      setTimeout(() => setImageLoading(false), 100);
    }
  };

  const handleContextMenu = (e) => e.preventDefault();
  const handleDragStart = (e) => e.preventDefault();

  useEffect(() => {
    if (images && images.length > 0) {
      images.forEach((src) => {
        const img = new window.Image();
        img.src = src;
      });
    }
  }, [images]);

  if (viewMode === "grid") {
    return (
      // 1. وضع الـ Grid: جعل الكارد يندمج مع الخلفية السوداء الصافية بحدود ناعمة جداً
      <div className="group relative aspect-4/4 w-full overflow-hidden rounded-2xl bg-black shadow-2xl active:scale-95 transition-all duration-200 border border-white/5 font-sans">
        <Link href={`/products/${id}`} className="w-full h-full flex flex-col">
          <Image
            src={
              images && images.length > 0 ? images[0] : "/double-sofa-01.png"
            }
            alt="Product Image"
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="h-full w-full object-cover transition-all duration-300 active:scale-105 active:brightness-110"
          />

          <div className="absolute bottom-0 left-0 right-0 p-3 bg-linear-to-t from-black via-black/80 to-transparent">
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="text-white font-bold text-sm truncate drop-shadow-lg flex-1">
                {name}
              </h3>

              {hasDiscount ? (
                <div className="flex items-center gap-1 whitespace-nowrap">
                  <span className="text-primary font-bold text-sm">
                    {discountedPrice}
                  </span>
                  <span className="text-zinc-500 line-through text-[10px]">
                    {price}
                  </span>
                </div>
              ) : (
                <span className="text-primary font-bold text-sm whitespace-nowrap">
                  {price} {currency}
                </span>
              )}
            </div>
          </div>

          {(discount > 0 || bestSeller) && (
            <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 z-10">
              {bestSeller && (
                <div className="inline-flex items-center gap-1 rounded-full bg-red-950/95 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-[0_4px_12px_rgba(0,0,0,0.45)] ring-1 ring-white/10 backdrop-blur-sm">
                  <span className="text-[11px]">🔥</span>
                  <span>{t("productCard.bestSeller")}</span>
                </div>
              )}

              {discount > 0 && (
                <div className="ml-auto inline-flex items-center rounded-full bg-primary/95 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-black shadow-[0_4px_12px_rgba(0,0,0,0.35)] backdrop-blur-sm">
                  -{discount}%
                </div>
              )}
            </div>
          )}

          <div className="absolute inset-0 bg-white/5 opacity-0 active:opacity-100 transition-opacity duration-200 rounded-2xl" />
        </Link>
      </div>
    );
  }

  // 2. الوضع التفصيلي (Detailed Card): تحويل الخلفية البيضاء الفاقعة لرمادي داكن فاخر مطفأ يفصل عن الأسود
  return (
    <div className="relative flex flex-col text-zinc-300 bg-zinc-900/90 shadow-2xl rounded-[1.75rem] w-full overflow-hidden border border-white/6 font-sans backdrop-blur-sm">
      {/* قسم صورة المنتج */}
      <div
        className="relative h-64 w-full overflow-hidden cursor-pointer group bg-black/40"
        onClick={() => setOpen(true)}
        onContextMenu={handleContextMenu}
      >
        <Image
          src={displayImage}
          fill
          alt="Product Image"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 1280px"
          priority={currentImageIndex === 0}
          onLoad={() => setImageLoading(false)}
          draggable={false}
        />

        {/* تدرج سينمائي أسود ناعم لحماية النصوص أسفل الصورة */}
        <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent pointer-events-none" />

        {discount > 0 && (
          <div className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-linear-to-r from-primary to-amber-600 px-3.5 py-1.5 text-[11px] font-black uppercase tracking-[0.15em] text-black shadow-2xl ring-1 ring-white/10">
            <Flame className="h-3.5 w-3.5 fill-black" />
            {t("productCard.discountLabel")} {discount}%
          </div>
        )}

        {bestSeller && (
          <div className="absolute top-4 left-4 rounded-full bg-red-950 px-4 py-1.5 text-[11px] text-white font-black shadow-2xl ring-1 ring-white/10 uppercase tracking-widest">
            🔥 {t("productCard.bestSeller")}
          </div>
        )}
      </div>

      {/* تفاصيل الكارد والنصوص */}
      <div className="p-5 flex flex-col gap-4 bg-zinc-900">
        <div className="flex items-center justify-between gap-3">
          <div className="max-w-50">
            {/* اسم المنتج بالأبيض الناصع الفخم */}
            <h3 className="text-lg sm:text-xl font-bold text-white truncate">
              {name}
            </h3>
          </div>

          <div className="text-right shrink-0">
            {hasDiscount ? (
              <>
                <div className="text-zinc-500 line-through text-lg">
                  {price} {currency}
                </div>
                {/* السعر بعد الخصم ينور بالذهبي الملكي */}
                <p className="text-primary font-black text-2xl">
                  {discountedPrice} {currency}
                </p>
              </>
            ) : (
              // السعر الأساسي بالذهبي الملكي
              <div className="text-primary font-black text-xl sm:text-2xl">
                {price} {currency}
              </div>
            )}
          </div>
        </div>

        {/* التاجات (Tags) بلون داكن متناسق ونصوص ذهبية خفيفة */}
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-zinc-800 px-3 py-1 text-[11px] font-medium text-primary/90 border border-primary/10">
            {t("productCard.tag1")}
          </span>
          <span className="rounded-full bg-zinc-800 px-3 py-1 text-[11px] font-medium text-primary/90 border border-primary/10">
            {t("productCard.tag2")}
          </span>
        </div>

        {/* زرار طلب الواتساب: أسود مطفأ بحدود ذهبية خفيفة ويقلب ذهبي كامل عند الـ Hover */}
        <button
          onClick={handleWhatsAppOrder}
          className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-zinc-950 text-primary border border-primary/30 font-bold py-3 transition duration-300 hover:bg-primary hover:text-black hover:border-transparent shadow-lg"
        >
          <MessageCircle size={18} />
          {t("productCard.orderButton")}
        </button>

        {/* أزرار السلة والتفاصيل بلون داكن فخم يتماشى مع فخامة التصميم */}
        <div className="flex gap-3">
          <button
            onClick={handleCartAction}
            className={`flex-1 inline-flex items-center justify-center gap-2 rounded-2xl border py-3 text-sm font-bold transition duration-300 ${
              isInCart
                ? "border-red-900/50 bg-red-950/40 text-red-400"
                : "border-zinc-800 bg-zinc-950 text-white hover:bg-zinc-800"
            }`}
          >
            {isInCart ? <Trash2 size={18} /> : <ShoppingCart size={18} />}
            {isInCart
              ? t("productCard.removeFromCart")
              : t("productCard.addToCart")}
          </button>

          <Link
            href={`/products/${id}`}
            prefetch={true}
            className="flex-1 inline-flex items-center justify-center rounded-2xl bg-zinc-800 text-white font-bold py-3 text-sm transition duration-300 hover:bg-zinc-700"
          >
            {t("productCard.details")}
          </Link>
        </div>
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={currentImageIndex}
        slides={
          images?.map((img) => ({ src: img })) || [
            { src: "/double-sofa-01.png" },
          ]
        }
      />
    </div>
  );
}
