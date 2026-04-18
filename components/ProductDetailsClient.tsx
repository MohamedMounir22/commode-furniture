"use client";

import AddToCartButton from "@/components/AddToCartButton";
import { useLanguage } from "@/lib/context/LanguageProvider";
import { MessageCircle, ShieldCheck, Trees, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProductDetailsClient({
    product,
}: {
    product: {
        _id: string;
        name: string;
        price: number;
        description?: string;
        images?: string[];
        discount?: number;
    };
}) {
    const { t, locale } = useLanguage();
    const discount = Number(product.discount) || 0;
    const hasDiscount = discount > 0;
    const discountedPrice = hasDiscount
        ? product.price - (product.price * discount) / 100
        : product.price;

    const phoneNumber = "201013598586";
    const whatsappMessage = `${t("productDetail.specialRequest")}
${t("productDetail.productLabel")}: ${product.name}
${t("productDetail.priceLabel")}: ${product.price} ${t("cart.currency")}
${t("productDetail.customizationRequest")}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <div className="bg-white min-h-screen pb-20" dir={locale === "ar" ? "rtl" : "ltr"}>
            <div className="max-w-7xl mx-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <Link
                    href="/products"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-8 transition-all group"
                >
                    <span className="font-medium">{t("productDetail.backToProducts")}</span>
                </Link>

                <div className="flex flex-col lg:flex-row gap-12 items-start">
                    <div className="w-full lg:w-3/5">
                        <div className="relative w-full aspect-square md:aspect-4/3 overflow-hidden rounded-[2rem] shadow-xl bg-[#f9f9f9] border border-slate-100">
                            <Image
                                src={product.images?.[0] || "/double-sofa-01.png"}
                                alt={product.name}
                                fill
                                priority
                                sizes="(max-width: 1024px) 100vw, 60vw"
                                className="object-cover transition-transform duration-1000 hover:scale-105"
                            />
                            {hasDiscount && (
                                <div className="absolute top-6 right-6 bg-orange-500 text-white px-4 py-1.5 rounded-full font-bold text-sm shadow-lg">
                                    {t("productCard.discountLabel")} {discount}%
                                </div>
                            )}
                        </div>

                        {product.images?.length > 1 && (
                            <div className="flex gap-4 mt-6 overflow-x-auto pb-2">
                                {product.images.map((img, idx) => (
                                    <div
                                        key={idx}
                                        className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden border-2 border-slate-100 hover:border-[#D4AF37] transition-colors cursor-pointer"
                                    >
                                        <Image src={img} alt={`${product.name} ${idx}`} fill className="object-cover" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="w-full lg:w-2/5 space-y-8">
                        <div className="border-b pb-6">
                            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
                                {product.name}
                            </h1>
                            <div className="flex items-center gap-4">
                                <p className="text-3xl text-[#D4AF37] font-black">
                                    {discountedPrice?.toLocaleString()} {t("cart.currency")}
                                </p>
                                {hasDiscount && (
                                    <p className="text-xl text-slate-400 line-through">
                                        {product.price?.toLocaleString()} {t("cart.currency")}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="prose prose-slate bg-slate-50 p-6 rounded-3xl border border-slate-100">
                            <p className="text-slate-600 leading-relaxed text-lg italic">
                                {product.description || t("productCard.descriptionFallback")}
                            </p>
                            <div className="grid grid-cols-2 gap-4 mt-6">
                                <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                    <Trees size={18} className="text-green-600" /> {t("productDetail.naturalWood")}
                                </div>
                                <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                    <ShieldCheck size={18} className="text-blue-600" /> {t("productDetail.warranty")}
                                </div>
                                <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                    <Truck size={18} className="text-orange-600" /> {t("productDetail.fastDelivery")}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-xl flex items-center justify-center gap-3 text-lg"
                            >
                                <MessageCircle size={24} /> {t("productDetail.orderButton")}
                            </a>

                            <AddToCartButton
                                product={{
                                    _id: product._id,
                                    name: product.name,
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
