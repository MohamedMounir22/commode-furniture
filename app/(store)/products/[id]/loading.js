// app/products/[id]/loading.js

export default function Loading() {
  return (
    // min-h-[70vh] بتخليه في نص الصفحة من غير ما يغطي الموقع كله
    <div className="w-full min-h-[70vh] flex flex-col items-center justify-center p-6 bg-transparent">

      {/* منطقة النص والأنيميشن */}
      <div className="relative flex items-center justify-center">

        {/* حلقة ذهبية فخمة بتلف - باستخدام Tailwind animation فقط */}
        {/* <div className="w-28 h-28 border-t-2 border-[#D4AF37] border-r-2 border-r-transparent border-b-2 border-b-transparent border-l-2 border-l-transparent rounded-full animate-spin"></div> */}

        {/* كلمة COMMODE في المنتصف تماماً */}
        <div className="absolute flex flex-col items-center gap-1.5 text-center px-4 py-2">
          {/* اسم البراند - ذهبي، تخين، تباعد حروف واسع (TRACKING) */}
          <h1 className="text-3xl font-extrabold text-[#D4AF37] tracking-[0.25em] uppercase animate-pulse">
            COMMODE
          </h1>
          {/* جملة التحميل */}
          <p className="text-xs font-light text-[#D4AF37]/70 tracking-widest mt-1">
            Luxury Furniture
          </p>
          {/* <p className="text-[10px] text-slate-500 mt-2 font-mono">
             جاري تجهيز الفخامة...
          </p> */}
        </div>
      </div>

      {/* خط تحميل بسيط ونحيف تحت عشان UX */}
      {/* <div className="mt-8 w-16 h-[1px] bg-[#D4AF37]/20 mx-auto overflow-hidden"> */}
        {/* <div className="w-full h-full bg-[#D4AF37] animate-pulse"></div>
      </div> */}

    </div>
  );
}
