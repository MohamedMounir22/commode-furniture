"use client";

import AddToCartButton from "@/components/AddToCartButton";
import { useLanguage } from "@/lib/context/LanguageProvider";
import { MessageCircle, ShieldCheck, Trees, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProductDetailsClient({ product }) {
    const { t, locale } = useLanguage();
    const productName = (locale === "ar" ? product.nameAr || product.name : product.nameEn || product.name) || "Product";
    const productDescription = locale === "ar" ? product.descriptionAr || product.description : product.descriptionEn || product.description;
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
        // 🎯 التعديل: جعل الخلفية شفافة تماماً لتظهر تموجات الحرير الفاخرة من الخلف
        <div className="bg-transparent min-h-screen pb-20 w-full text-zinc-100" dir={locale === "ar" ? "rtl" : "ltr"}>
            <div className="max-w-7xl mx-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

                {/* زر العودة للمنتجات: تحويله للرمادي المطفأ والhover الذهبي */}
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
                        {/* كونتينر الصورة الكبيرة: زجاجي شفاف ومظلم متناسق مع الحرير */}
                        <div className="relative w-full aspect-square md:aspect-4/3 overflow-hidden rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-zinc-950/40 border border-white/[0.08] backdrop-blur-sm">
                            <Image
                                src={product.images?.[0] || "/double-sofa-01.png"}
                                alt={productName || "Product"}
                                fill
                                priority
                                sizes="(max-width: 1024px) 100vw, 60vw"
                                className="object-cover transition-transform duration-1000 hover:scale-105"
                            />
                            {/* شارة الخصم: تحويلها للذهبي الناري الفاخر بدلاً من البرتقالي العادي */}
                            {hasDiscount && (
                                <div className="absolute top-6 right-6 bg-gradient-to-r from-amber-500 to-primary text-black px-4 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider shadow-[0_4px_15px_rgba(214,175,55,0.4)]">
                                    {t("productCard.discountLabel")} {discount}%
                                </div>
                            )}
                        </div>

                        {/* الصور المصغرة بالأسفل */}
                        {product.images && product.images.length > 1 && (
                            <div className="flex gap-4 mt-6 overflow-x-auto pb-2 scrollbar-none">
                                {product.images.map((img, idx) => (
                                    <div
                                        key={idx}
                                        className="relative w-24 h-24 shrink-0 rounded-2xl overflow-hidden border-2 border-white/[0.05] bg-zinc-950/40 hover:border-primary transition-all duration-300 cursor-pointer shadow-md"
                                    >
                                        <Image src={img} alt={`${productName} ${idx}`} fill className="object-cover" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* الجانب الأيمن: تفاصيل المنتج وأزرار الشراء */}
                    <div className="w-full lg:w-2/5 space-y-8">
                        <div className="border-b border-white/[0.08] pb-6">
                            {/* اسم المنتج بالخط العريض الملكي والأبيض اللامع */}
                            <h1 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight tracking-wide drop-shadow-md">
                                productName
                            </h1>
                            <div className="flex items-center gap-4">
                                {/* السعر بعد الخصم بالذهبي الصريح الفخم */}
                                <p className="text-3xl text-primary font-black tracking-wide drop-shadow-[0_2px_8px_rgba(214,175,55,0.2)]">
                                    {discountedPrice?.toLocaleString()} {t("cart.currency")}
                                </p>
                                {/* السعر الأصلي مشطوب برقة وثبات بالرمادي الداكن */}
                                {hasDiscount && (
                                    <p className="text-xl text-zinc-500 line-through font-medium">
                                        {product.price?.toLocaleString()} {t("cart.currency")}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* كارد الوصف والمميزات: زجاجي داكن وراقي يوضح النص فوق الحرير */}
                        <div className="prose prose-invert bg-white/[0.02] p-6 rounded-[2rem] border border-white/[0.06] backdrop-blur-md shadow-2xl">
                            <p className="text-zinc-300 leading-relaxed text-base md:text-lg font-medium">
                                {productDescription || t("productCard.descriptionFallback")}
                            </p>

                            {/* أيكونات الخصائص والمميزات الفنية مع تلوين الأيكونات بالذهبي لتوحيد الرؤية */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 border-t border-white/[0.06] pt-6">
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
                            {/* زر طلب المنتج عبر الواتساب: تم تحويله بالكامل للذهبي الملكي اللامع والخاطف للعين */}
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-primary text-black py-4 md:py-5 rounded-2xl font-black hover:bg-amber-400 transition-all duration-300 active:scale-[0.98] shadow-[0_10px_25px_rgba(214,175,55,0.25)] flex items-center justify-center gap-3 text-lg tracking-wide uppercase"
                            >
                                <MessageCircle size={24} fill="currentColor" />
                                <span>{t("productDetail.orderButton")}</span>
                            </a>

                            {/* زر إضافة إلى السلة المطور */}
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
        </div>
    );
}
