"use client";

import AddToCartButton from "@/components/AddToCartButton";
import { useLanguage } from "@/lib/context/LanguageProvider";
import { MessageCircle, ShieldCheck, Trees, Truck, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import { Keyboard, Navigation, Pagination, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function ProductDetailsClient({ product }) {
    const { t, locale } = useLanguage();
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [previewImage, setPreviewImage] = useState(null);

    const images = product.images?.length ? product.images : ["/double-sofa-01.png"];
    const productName = (locale === "ar"
        ? product.nameAr || product.name || product.nameEn
        : product.nameEn || product.name || product.nameAr) || "Product";
    const productDescription = locale === "ar"
        ? product.descriptionAr || product.descriptionEn || product.description
        : product.descriptionEn || product.descriptionAr || product.description;
    const discount = Number(product.discount) || 0;
    const hasDiscount = discount > 0;
    const discountedPrice = hasDiscount
        ? product.price - (product.price * discount) / 100
        : product.price;

    const phoneNumber = "201011761133";
    const whatsappMessage = `${t("productDetail.specialRequest")}
${t("productDetail.productLabel")}: ${productName}
${t("productDetail.priceLabel")}: ${product.price} ${t("cart.currency")}
${t("productDetail.customizationRequest")}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <div className="bg-transparent min-h-screen pb-20 w-full text-zinc-100" dir={locale === "ar" ? "rtl" : "ltr"}>
            <div className="max-w-7xl mx-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

                {/* زر العودة للمنتجات */}
                <Link
                    href="/products"
                    className="inline-flex items-center gap-2 text-zinc-400 hover:text-primary mb-8 transition-all duration-300 group font-bold text-sm tracking-wide"
                >
                    <span className="transition-transform duration-300 group-hover:-translate-x-1 rtl:group-hover:translate-x-1">←</span>
                    <span>{t("productDetail.backToProducts")}</span>
                </Link>

                <div className="flex flex-col lg:flex-row gap-12 items-start">
                    {/* الجانب الأيسر: معرض الصور */}
                    <div className="w-full lg:w-3/5">
                        {/* كونتينر الصورة الكبيرة: يتماشى الآن مع نسبة الصورة بدلًا من فرض شكل مربع */}
                        <div className="relative w-full h-[45vh] md:h-[60vh] overflow-hidden rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] bg-transparent border border-white/8 backdrop-blur-sm">
                            <Swiper
                                modules={[Navigation, Pagination, Thumbs, Keyboard]}
                                navigation
                                pagination={{ clickable: true }}
                                thumbs={{ swiper: thumbsSwiper }}
                                keyboard={{ enabled: true }}
                                loop={images.length > 1}
                                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                                className="w-full h-full"
                                style={{ "--swiper-navigation-color": "#d6af37", "--swiper-pagination-color": "#d6af37" }}
                            >
                                {images.map((img, idx) => (
                                    <SwiperSlide key={idx} className="w-full h-full">
                                        <div
                                            className="relative w-full h-full cursor-zoom-in"
                                            onClick={() => setPreviewImage(img)}
                                        >
                                            <Image
                                                src={img}
                                                alt={`${productName} ${idx + 1}`}
                                                fill
                                                priority={idx === 0}
                                                sizes="(max-width: 1024px) 100vw, 60vw"
                                                className="object-cover transition-transform duration-1000 hover:scale-105"
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            {/* شارة الخصم */}
                            {hasDiscount && (
                                <div className="absolute top-6 right-6 bg-linear-to-r from-amber-500 to-primary text-black px-4 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider shadow-[0_4px_15px_rgba(214,175,55,0.4)] z-10">
                                    {t("productCard.discountLabel")} {discount}%
                                </div>
                            )}
                        </div>

                        {/* الصور المصغرة بالأسفل */}
                        {images.length > 1 && (
                            <div className="mt-6">
                                <Swiper
                                    onSwiper={setThumbsSwiper}
                                    modules={[Thumbs]}
                                    slidesPerView={Math.min(images.length, 4)}
                                    spaceBetween={12}
                                    watchSlidesProgress
                                    className="h-24"
                                    breakpoints={{
                                        640: { slidesPerView: Math.min(images.length, 4), spaceBetween: 12 },
                                        1024: { slidesPerView: Math.min(images.length, 5), spaceBetween: 16 },
                                    }}
                                >
                                    {images.map((img, idx) => (
                                        <SwiperSlide key={idx} className="h-24">
                                            <div
                                                className={`relative w-full h-24 rounded-2xl overflow-hidden border-2 ${
                                                    activeIndex === idx ? "border-primary" : "border-white/5"
                                                } bg-zinc-950/40 transition-all duration-300 cursor-pointer shadow-md`}
                                            >
                                                <Image src={img} alt={`${productName} ${idx + 1}`} fill className="object-cover" />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        )}
                    </div>

                    {/* الجانب الأيمن: تفاصيل المنتج وأزرار الشراء */}
                    <div className="w-full lg:w-2/5 space-y-8">
                        <div className="border-b border-white/8 pb-6">
                            <h1 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight tracking-wide drop-shadow-md">
                                {productName}
                            </h1>
                            <div className="flex items-center gap-4">
                                <p className="text-3xl text-primary font-black tracking-wide drop-shadow-[0_2px_8px_rgba(214,175,55,0.2)]">
                                    {discountedPrice?.toLocaleString()} {t("cart.currency")}
                                </p>
                                {hasDiscount && (
                                    <p className="text-xl text-zinc-500 line-through font-medium">
                                        {product.price?.toLocaleString()} {t("cart.currency")}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* كارد الوصف والمميزات */}
                        <div className="prose prose-invert bg-white/2 p-6 rounded-[2rem] border border-white/6 backdrop-blur-md shadow-2xl">
                            <p className="text-zinc-300 leading-relaxed text-base md:text-lg font-medium">
                                {productDescription || t("productCard.descriptionFallback")}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 border-t border-white/6 pt-6">
                                <div className="flex items-center gap-3 text-sm font-bold text-zinc-200">
                                    <Trees size={20} className="text-primary drop-shadow-[0_0_5px_rgba(214,175,55,0.3)]" />
                                    <span>{t("productDetail.naturalWood")}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm font-bold text-zinc-200">
                                    <ShieldCheck size={20} className="text-primary drop-shadow-[0_0_5px_rgba(214,175,55,0.3)]" />
                                    <span>{t("productDetail.warranty")}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm font-bold text-zinc-200">
                                    <Truck size={20} className="text-primary drop-shadow-[0_0_5px_rgba(214,175,55,0.3)]" />
                                    <span>{t("productDetail.fastDelivery")}</span>
                                </div>
                            </div>
                        </div>

                        {/* أزرار الإجراءات والشراء المباشر */}
                        <div className="flex flex-col gap-4 pt-2">
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-primary text-black py-4 md:py-5 rounded-2xl font-black hover:bg-amber-400 transition-all duration-300 active:scale-[0.98] shadow-[0_10px_25px_rgba(214,175,55,0.25)] flex items-center justify-center gap-3 text-lg tracking-wide uppercase"
                            >
                                <MessageCircle size={24} fill="currentColor" />
                                <span>{t("productDetail.orderButton")}</span>
                            </a>

                            <AddToCartButton
                                product={{
                                    _id: product._id,
                                    name: productName,
                                    price: discountedPrice,
                                    image: product.images?.[0],
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Fullscreen Image Preview */}
            {previewImage && (
                <div
                    className="fixed inset-0 z-999 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm transition-all duration-300"
                    role="dialog"
                    aria-modal="true"
                    onClick={() => setPreviewImage(null)}
                >
                    {/* Close Button */}
                    <button
                        type="button"
                        className="absolute top-6 right-6 z-50 rounded-full bg-white/10 p-3 text-white transition-all duration-200 cursor-pointer hover:bg-white/20"
                        onClick={(event) => {
                            event.stopPropagation();
                            setPreviewImage(null);
                        }}
                        aria-label="Close image preview"
                    >
                        <X size={24} />
                    </button>

                    {/* Image Container */}
                    <div
                        className="relative w-full h-full flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={previewImage}
                            alt="Fullscreen Preview"
                            fill
                            className="object-cover select-none pointer-events-none"
                            sizes="100vw"
                            priority
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
