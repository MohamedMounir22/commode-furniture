"use client";
import { Flame, MessageCircle, ShoppingCart, Trash2 } from "lucide-react"; // ضفنا أيقونة الرسالة
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function ProductCard({
  id,
  name,
  price,
  description,
  images,
  discount,
}) {
  discount = Number(discount) || 0;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [open, setOpen] = useState(false);

  // حساب السعر بناءا علي نسبة الخصم لو في خصم اصلا
  const hasDiscount = discount > 0;
  const discountedPrice = hasDiscount
    ? price - (price * discount) / 100
    : price;

  const displayImage =
    images && images.length > 0
      ? images[currentImageIndex]
      : "/double-sofa-01.png";

  const toggleCart = () => setIsInCart(!isInCart);

  // دالة طلب الواتساب
  //   const handleWhatsAppOrder = (e) => {
  //     e.preventDefault(); // عشان ميعملش Navigate لو الزرار جوه Link
  //     const phoneNumber = "2010XXXXXXXX"; // اكتب رقمك هنا بدون +
  //     const message = `أهلاً "كومود"، محتاج أستفسر عن المنتج ده:\n- الاسم: ${name}\n- السعر: ${price} ج.م\n- الرابط: ${window.location.origin}/products/${id}\n\nحابب أعدل على المقاسات/الألوان، ممكن تفاصيل أكتر؟`;
  //     const encodedMessage = encodeURIComponent(message);
  //     window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  //   };

  const handleWhatsAppOrder = () => {
    const phoneNumber = "201013598586"; // الرقم بالصيغة الدولية

    const message = `أهلاً كومود، محتاج أطلب تعديلات على:
المنتج: ${name}
السعر: ${price} ج.م
رابط الصورة: ${displayImage}`;

    const encodedMessage = encodeURIComponent(message);

    // استخدام بروتوكول whatsapp مباشرة لفتح التطبيق
    const whatsappAppUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`;

    // محاولة فتح التطبيق
    window.location.href = whatsappAppUrl;
  };

  const changeImage = (index) => {
    if (index !== currentImageIndex) {
      setImageLoading(true);
      setCurrentImageIndex(index);
      setTimeout(() => setImageLoading(false), 100);
    }
  };

  // حماية الصور
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

  return (
    <div className="relative flex flex-col text-slate-700 bg-white shadow-lg rounded-[1.75rem] w-full hover:-translate-y-1 hover:shadow-2xl transition duration-300 overflow-hidden border border-slate-200">
      <div
        className="relative h-80 w-full overflow-hidden cursor-pointer group"
        onClick={() => setOpen(true)}
        onContextMenu={handleContextMenu}
      >
        <Image
          src={displayImage}
          fill
          alt={name}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={currentImageIndex === 0}
          onLoad={() => setImageLoading(false)}
          draggable={false}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

        {discount > 0 && (
          <div className="absolute top-4 right-4 rounded-full bg-orange-500 px-3 py-1 text-xs text-white font-bold shadow-lg">
            <Flame className="h-3.5 w-3.5" />
            خصم {discount}%
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h3 className="text-xl font-semibold text-slate-900 truncate">
              {name}
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              تعديل مقاسات وألوان حسب طلبك
            </p>
          </div>

          <div className="text-right">
            {hasDiscount ? (
              <>
                <div className="text-slate-500 line-through text-sm">
                  {price} ج.م
                </div>
                <div className="text-orange-600 font-bold text-xl">
                  {discountedPrice} ج.م
                </div>
              </>
            ) : (
              <div className="text-slate-900 font-bold text-xl">
                {price} ج.م
              </div>
            )}
          </div>
        </div>

        <p className="text-slate-600 text-sm leading-6 line-clamp-3">
          {description ||
            "تصميم عصري بخامات عالية الجودة، متاح تعديل المقاسات والألوان حسب طلبك."}
        </p>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-700">
            خشب طبيعي
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-700">
            ضمان 3 سنوات
          </span>
        </div>

        <button
          onClick={handleWhatsAppOrder}
          className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 text-white font-bold py-3 transition duration-200 hover:bg-slate-800"
        >
          <MessageCircle size={18} />
          اطلب تعديلاتك
        </button>

        <div className="flex gap-3">
          <button
            onClick={toggleCart}
            className={`flex-1 inline-flex items-center justify-center gap-2 rounded-2xl border py-3 text-sm font-semibold transition duration-200 ${
              isInCart
                ? "border-red-200 bg-red-50 text-red-600"
                : "border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
            }`}
          >
            {isInCart ? <Trash2 size={18} /> : <ShoppingCart size={18} />}
            {isInCart ? "أزل من السلة" : "أضف للسلة"}
          </button>

          <Link
            href={`/products/${id}`}
            prefetch={true}
            className="flex-1 inline-flex items-center justify-center rounded-2xl bg-slate-100 text-slate-900 font-semibold py-3 text-sm transition duration-200 hover:bg-slate-200"
          >
            عرض كامل التفاصيل
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

{
  /* Hover Overlay */
}
{
  /* <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-white bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium border border-white/30">
            تكبير الصورة
          </span>
        </div> */
}
