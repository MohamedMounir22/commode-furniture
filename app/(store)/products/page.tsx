// 1. أهم سطر عشان البيانات تتحدث فوراً
// بنجبر Next.js يجيب البيانات طازة كل مرة وميعتمدش على النسخة المتخزنة (Cache)
export const dynamic = 'force-dynamic';

import ProductCard from "@/components/ui/ProductCard"; // استيراد القالب اللي عملناه

// دالة لجلب البيانات من الـ API بتاعنا
async function getProducts() {
  try {
    // ضفنا التوقيت الحالي لضمان عدم حدوث Caching من المتصفح
    const res = await fetch(`http://localhost:3000/api/test-db?t=${Date.now()}`, {
      cache: 'no-store'
    });

    if (!res.ok) {
      throw new Error("فشل في جلب البيانات");
    }

    return res.json();
  } catch (error) {
    console.error("Error:", error);
    return []; // بنرجع مصفوفة فاضية عشان الموقع ميعلقش لو حصل خطأ
  }
}

// المكون الرئيسي للصفحة (Server Component)
export default async function ProductsPage() {
  // بنستدعي الدالة وبننتظر البيانات (Await)
  const products = await getProducts();

  return (
    <div className="p-8 bg-gray-100 min-h-screen" dir="rtl">
      {/* عنوان الصفحة */}
      <h1 className="text-4xl font-black text-center mb-12 text-slate-900 italic">
        أحدث موديلات أسامة 🛋️
      </h1>

      {/* توزيع المنتجات في شبكة (Grid) متجاوبة مع الشاشات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {/* بنعمل Loop على كل منتج جاي من الداتابيز */}
        {products.map((product) => (
          <ProductCard
            key={product._id}
            id={product._id}            // مفتاح فريد لكل عنصر (مهم جداً للـ React)
            name={product.name}         // بنبعت الاسم كـ Prop
            price={product.price}       // بنبعت السعر كـ Prop
            description={product.description} // بنبعت الوصف كـ Prop
            images={product.images} // بنبعت مصفوفة الصور كـ Prop
            discount={product.discount || 0} // بنبعت نسبة الخصم كـ Prop
          />
        ))}
      </div>

      {/* رسالة بتظهر لو المخزن فاضي تماماً */}
      {products.length === 0 && (
        <div className="text-center py-20 text-gray-500 text-xl">
          لا توجد منتجات حالياً.. جارٍ تجهيز المعرض 🔨
        </div>
      )}
    </div>
  );
}

















