"use client";
import { useLanguage } from "@/lib/context/LanguageProvider";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, ChevronDown, MessageCircle, MessageSquare, Phone, Send, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function LuxuryChat() {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useLanguage();
    const pathname = usePathname();

    if (pathname?.startsWith("/admin")) {
        return null;
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            <button
                type="button"
                onClick={scrollToTop}
                className="fixed bottom-6 left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/8 bg-zinc-950 text-white shadow-[0_10px_30px_rgba(0,0,0,0.6)] transition-all duration-300 hover:scale-105 active:scale-95"
                aria-label="Scroll to top"
            >
                <ArrowUp size={20} className="text-primary" />
            </button>

            <div className="fixed bottom-6 right-6 z-50">
                <div className="relative">
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                                className="mb-4 w-80 bg-zinc-950/80 backdrop-blur-xl text-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden border border-white/8"
                            >
                                {/* Header - واجهة الترحيب العلوية */}
                                <div className="p-6 pb-10 bg-linear-to-br from-zinc-900/50 to-black/40 relative border-b border-white/4">
                                    <button
                                        onClick={() => setIsOpen(false)}

                                        className=" hidden text-zinc-400 hover:text-primary transition-colors" //absolute top-4 right-4
                                    >
                                        <X size={18} />
                                    </button>
                                    <h2 className="text-xl font-black text-white flex items-center gap-2 tracking-wide">
                                        {t("chat.greeting")}
                                    </h2>
                                    <p className="text-zinc-400 text-xs mt-2 font-medium">{t("chat.helpText")}</p>
                                </div>

                                {/* Body - قنوات الاتصال والروابط المباشرة */}
                                <div className="p-4 -mt-6">
                                    <div className="bg-zinc-950/60 rounded-xl p-1.5 border border-white/5 backdrop-blur-md">

                                        {/* 🟢 خيار الواتساب: تأثير الـ Hover أصبح هو الحالة الطبيعية الثابتة */}
                                        <a
                                            href="https://wa.me/201011761133"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between p-3.5 bg-white/3 hover:bg-transparent rounded-lg transition-all group"
                                        >
                                            <div className="flex items-center gap-3">
                                                {/* الهالة الذهبية منورة طبيعي دايماً */}
                                                <div className="bg-primary/20 p-2 rounded-lg text-primary shadow-[0_0_12px_rgba(214,175,55,0.25)] group-hover:bg-primary/10 group-hover:shadow-none transition-all duration-300">
                                                    <MessageSquare size={18} />
                                                </div>
                                                {/* النص دهبي صريح في الطبيعي ويتحول لأبيض مطفأ في الهوفر */}
                                                <span className="font-bold text-sm text-primary group-hover:text-zinc-300 transition-colors duration-300">
                                                    {t("chat.whatsapp")}
                                                </span>
                                            </div>
                                            <Send size={14} className="text-primary group-hover:text-zinc-500 transition-all duration-300" />
                                        </a>

                                        <div className="h-px bg-white/5 my-1 mx-3" />

                                        {/* 📞 خيار الاتصال الهاتفي: تأثير الـ Hover أصبح هو الحالة الطبيعية الثابتة */}
                                        <a
                                            href="tel:+201011761133"
                                            className="flex items-center justify-between p-3.5 bg-white/3 hover:bg-transparent rounded-lg transition-all group"
                                        >
                                            <div className="flex items-center gap-3">
                                                {/* الهالة الذهبية منورة دايماً */}
                                                <div className="bg-primary/20 p-2 rounded-lg text-primary shadow-[0_0_12px_rgba(214,175,55,0.25)] group-hover:bg-primary/10 group-hover:shadow-none transition-all duration-300">
                                                    <Phone size={18} />
                                                </div>
                                                <span className="font-bold text-sm text-primary group-hover:text-zinc-300 transition-colors duration-300">
                                                    {t("chat.call")}
                                                </span>
                                            </div>
                                            <Send size={14} className="text-primary group-hover:text-zinc-500 transition-all duration-300" />
                                        </a>
                                    </div>
                                </div>

                                {/* Footer - إشارة حالة الاتصال */}
                                <div className="p-3 bg-black/40 border-t border-white/4 flex items-center justify-center gap-2 text-[11px] text-zinc-500 font-medium tracking-wide">
                                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(214,175,55,0.6)]" />
                                    <span>{t("chat.connected")}</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* 🎯 الزرار العائم الرئيسي: بقا منور بالدهبي كحالة طبيعية جذابة */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="bg-zinc-950 text-white h-12 w-12 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.6)] active:scale-95 transition-all duration-300 flex items-center justify-center border group"
                    >
                        {isOpen ? (
                            <ChevronDown size={20} className="text-primary" />
                        ) : (
                            <MessageCircle size={20} className="text-primary  " />
                        )}
                    </button>
                </div>
            </div>
        </>
    );
}
