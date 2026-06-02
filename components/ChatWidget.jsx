"use client";
import { useLanguage } from "@/lib/context/LanguageProvider";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, MessageCircle, MessageSquare, Phone, Send, X } from "lucide-react";
import { useState } from "react";

export default function LuxuryChat() {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useLanguage();

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="mb-4 w-80 bg-zinc-950/80 backdrop-blur-xl text-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden border border-white/[0.08]"
                    >
                        {/* Header - واجهة الترحيب العلوية */}
                        <div className="p-6 pb-10 bg-gradient-to-br from-zinc-900/50 to-black/40 relative border-b border-white/[0.04]">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 text-zinc-400 hover:text-primary transition-colors"
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
                            <div className="bg-zinc-950/60 rounded-xl p-1.5 border border-white/[0.05] backdrop-blur-md">

                                {/* 🟢 خيار الواتساب: تأثير الـ Hover أصبح هو الحالة الطبيعية الثابتة */}
                                <a
                                    href="https://wa.me/201011761133"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    // bg-white/[0.04] والخط الذهبي هما الأساس، وفي الـ hover يرجع زجاجي بسيط
                                    className="flex items-center justify-between p-3.5 bg-white/[0.03] hover:bg-transparent rounded-lg transition-all group"
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

                                <div className="h-px bg-white/[0.05] my-1 mx-3" />

                                {/* 📞 خيار الاتصال الهاتفي: تأثير الـ Hover أصبح هو الحالة الطبيعية الثابتة */}
                                <a
                                    href="tel:+201011761133"
                                    className="flex items-center justify-between p-3.5 bg-white/[0.03] hover:bg-transparent rounded-lg transition-all group"
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
                        <div className="p-3 bg-black/40 border-t border-white/[0.04] flex items-center justify-center gap-2 text-[11px] text-zinc-500 font-medium tracking-wide">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(214,175,55,0.6)]" />
                            <span>{t("chat.connected")}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 🎯 الزرار العائم الرئيسي: بقا منور بالدهبي كحالة طبيعية جذابة */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-zinc-950 text-white p-4 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.6)]  active:scale-95 transition-all duration-300 flex items-center justify-center border group"
            >
                {isOpen ? (
                    <ChevronDown size={26} className="text-primary" />
                ) : (
                    <MessageCircle size={26} className="text-primary transition-colors duration-300" />
                )}
            </button>
        </div>
    );
}
