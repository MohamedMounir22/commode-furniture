// app/products/[id]/page.js

import { ShoppingCart, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

// دالة تجيب منتج واحد بس بالـ ID
// app/products/[id]/page.js

async function getProduct(id) {
  // نطبع الرابط اللي رايح للـ API
  console.log("🚀 جاري الطلب بالـ ID:", id);

  const res = await fetch(`http://localhost:3000/api/test-db?id=${id}`, {
    cache: 'no-store'
  });

  if (!res.ok) {
    console.error("❌ الـ API رد بـ Error:", res.status);
    return null;
  }

  return res.json();
}

// export default async function ProductDetails({ params }) {
//   // 1. نطبع الـ params الأصلية قبل أي حاجة
//   console.log("📦 الـ params الخام:", params);

//   // 2. فك التشفير (السطر السحري)
//   const resolvedParams = await params;
//   console.log("✅ الـ params بعد الـ await:", resolvedParams);

//   const id = resolvedParams.id;
//   console.log("🔍 الـ ID المستخرج النهائي:", id);

//   if (!id) {
//     return <div className="p-20 text-red-500 text-center font-bold">⚠️ تحذير: الـ ID مش واصل للصفحة أصلاً!</div>;
//   }

//   const product = await getProduct(id);

//   if (!product) {
//     return (
//       <div className="text-center py-20" dir="rtl">
//         <h2 className="text-2xl font-bold text-slate-800">عفواً، المنتج غير موجود 🛋️</h2>
//         <p className="text-gray-500">الـ ID اللي دورنا بيه هو: {id}</p>
//         <Link href="/products" className="text-blue-600 underline mt-4 block">العودة للمنتجات</Link>
//       </div>
//     );
//   }

//   return (
//     <div className="p-8" dir="rtl">
//       <h1 className="text-4xl font-black">{product.name}</h1>
//       {/* باقي التصميم... */}
//     </div>
//   );
// }

export default async function ProductDetails({ params }) {

    // console.log("الـ params اللي جاية من السيرفر:", params);
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return <div className="text-center py-20">عفواً، المنتج غير موجود 🛋️</div>;
  }

  return (
    <div className="min-h-screen bg-white p-8" dir="rtl">
      <div className="max-w-6xl mx-auto">

        {/* زرار العودة */}
        <Link href="/products" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-8 transition-colors">
          <ArrowRight size={20} />
          <span>العودة للمنتجات</span>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          {/* قسم الصورة */}
          <div className="rounded-3xl overflow-hidden shadow-xl bg-gray-50">
            <img
              src={product.images?.[0] || "/double-sofa-01.png"}
              alt={product.name}
              className="w-full h-[500px] object-cover"
            />
          </div>

          {/* قسم البيانات */}
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl font-black text-slate-900">{product.name}</h1>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-blue-600">{product.price} ج.م</span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                <CheckCircle size={14} /> متوفر في المخزن
              </span>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed border-t border-b py-6">
              {product.description || "لا يوجد وصف متاح لهذا المنتج الرائع من أثاث أسامة."}
            </p>

            {/* مميزات سريعة */}
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-center gap-2 font-medium">✨ خشب زان طبيعي 100%</li>
              <li className="flex items-center gap-2 font-medium">🚚 توصيل مجاني خلال 3 أيام</li>
              <li className="flex items-center gap-2 font-medium">🛡️ ضمان لمدة 5 سنوات</li>
            </ul>

            <div className="mt-4 flex gap-4">
              <button className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                <ShoppingCart size={24} />
                أضف إلى السلة
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
