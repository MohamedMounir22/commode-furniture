// "use client";
// import { useState } from "react";
// import { Phone, X } from "lucide-react";
// import Link from "next/link";

// export default function FloatingChat() {
//   const [isOpen, setIsOpen] = useState(false);

//   const phoneNumber = "201012345678";
//   const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent("أهلاً كومود، حابب استفسر عن الموبيليا المتاحة.")}`;
//   const callUrl = `tel:+${phoneNumber}`;

//   // ده الـ SVG بتاع الواتساب عشان نكرره في المكانين
//   const WhatsAppIcon = ({ size = 24 }) => (
//     <svg
//       stroke="currentColor"
//       fill="currentColor"
//       strokeWidth="0"
//       viewBox="0 0 448 512"
//       height={size}
//       width={size}
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.1 0-65.6-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.1-16.4-14.6-27.4-32.7-30.6-38.1-3.2-5.5-.3-8.5 2.4-11.2 2.5-2.5 5.5-6.5 8.3-9.7 2.8-3.2 3.7-5.5 5.6-9.2 1.9-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.6 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
//     </svg>
//   );

//   return (
//     <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">

//       {isOpen && (
//         <div className="flex flex-col gap-3 mb-2 animate-in slide-in-from-bottom-5 duration-300">
//           {/* زرار الاتصال */}
//           <Link
//             href={callUrl}
//             className="bg-white text-blue-600 p-4 rounded-full shadow-lg hover:bg-blue-50 transition-all flex items-center justify-center border border-blue-100"
//           >
//             <Phone size={24} />
//           </Link>

//           {/* زرار الواتساب الداخلي - تم تغيير الأيقونة هنا */}
//           <Link
//             href={whatsappUrl}
//             target="_blank"
//             className="bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#1da851] transition-all flex items-center justify-center"
//             title="واتساب"
//           >
//             <WhatsAppIcon size={24} />
//           </Link>
//         </div>
//       )}

//       {/* الزرار الرئيسي */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className={`${
//           isOpen ? "bg-red-500" : "bg-[#25D366]"
//         } text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center`}
//       >
//         {isOpen ? <X size={28} /> : <WhatsAppIcon size={32} />}
//       </button>
//     </div>
//   );
// }




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
                        className="mb-4 w-80 bg-[#0f172a] text-white rounded-2xl shadow-2xl overflow-hidden border border-slate-700"
                    >
                        {/* Header - زي "Hi Mohamed" اللي في الصورة */}
                        <div className="p-6 pb-10 bg-linear-to-br from-slate-800 to-slate-900 relative">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 text-slate-400 hover:text-white"
                            >
                                <X size={20} />
                            </button>
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                {t("chat.greeting")}
                            </h2>
                            <p className="text-slate-400 text-sm mt-2">{t("chat.helpText")}</p>
                        </div>

                        {/* Body - الروابط والأزرار */}
                        <div className="p-4 -mt-6">
                            <div className="bg-[#1e293b] rounded-xl p-2 shadow-inner border border-slate-700">
                                {/* خيار الواتساب */}
                                <a href="https://wa.me/your-number" target="_blank" className="flex items-center justify-between p-4 hover:bg-slate-700/50 rounded-lg transition-all group">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-amber-500/10 p-2 rounded-lg text-amber-500">
                                            <MessageSquare size={20} />
                                        </div>
                                        <span className="font-medium">{t("chat.whatsapp")}</span>
                                    </div>
                                    <Send size={16} className="text-slate-500 group-hover:translate-x-1 transition-transform" />
                                </a>

                                <div className="h-px bg-slate-700 my-1 mx-4" />

                                {/* خيار الاتصال */}
                                <a href="tel:+201..." className="flex items-center justify-between p-4 hover:bg-slate-700/50 rounded-lg transition-all group">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-amber-500/10 p-2 rounded-lg text-amber-500">
                                            <Phone size={20} />
                                        </div>
                                        <span className="font-medium">{t("chat.call")}</span>
                                    </div>
                                    <Send size={16} className="text-slate-500 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </div>

                        {/* Footer - الحالة */}
                        <div className="p-4 bg-slate-900/50 border-t border-slate-800 flex items-center justify-center gap-2 text-xs text-slate-500">
                            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                            {t("chat.connected")}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* الزرار الرئيسي العائم */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-slate-900 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center justify-center border border-slate-700"
            >
                {isOpen ? <ChevronDown size={28} /> : <MessageCircle size={28} />}
            </button>
        </div>
    );
}
