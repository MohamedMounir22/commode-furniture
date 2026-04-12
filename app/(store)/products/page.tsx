// // 1. أهم سطر عشان البيانات تتحدث فوراً
// // بنجبر Next.js يجيب البيانات طازة كل مرة وميعتمدش على النسخة المتخزنة (Cache)
// export const dynamic = 'force-dynamic';



// // دالة لجلب البيانات من الـ API بتاعنا
// async function getProducts({searchParams}: {searchParams: {category?: string}}) {


//     const category = searchParams.category || "all";// Get the category from the URL, default to "all" if// نبعت القسم للـ API (لو موجود)

//     let productsData = [];

// try{

//   const apiUrl = category && category !== 'all'
//     ? `${process.env.NEXT_PUBLIC_API_URL}/api/products?category=${category}`
//     : `${process.env.NEXT_PUBLIC_API_URL}/api/products`;

//     // Fetching the latest products from our API route
//     const res = await fetch(apiUrl, { next: { tags: ['products-data'], revalidate: 2000 } });


//         if (res.ok) {
//                     productsData = await res.json();
//         }
//         else {
//             throw new Error("Failed to fetch products");
//         }


//     }
//     catch (error) {
//         console.error("Error fetching products:", error);
//     }

// }





//     // ضفنا التوقيت الحالي لضمان عدم حدوث Caching من المتصفح






// // المكون الرئيسي للصفحة (Server Component)
// export default async function ProductsPage() {
//   // بنستدعي الدالة وبننتظر البيانات (Await)
//   const products = await getProducts();

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen" dir="rtl">
//       {/* عنوان الصفحة */}
//       <h1 className="text-4xl font-black text-center mb-12 text-slate-900 italic">
//         أحدث موديلات أسامة 🛋️
//       </h1>

//       {/* توزيع المنتجات في شبكة (Grid) متجاوبة مع الشاشات */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
//         {/* بنعمل Loop على كل منتج جاي من الداتابيز */}
//         {products.map((product) => (
//           <ProductCard
//             key={product._id}
//             id={product._id}            // مفتاح فريد لكل عنصر (مهم جداً للـ React)
//             name={product.name}         // بنبعت الاسم كـ Prop
//             price={product.price}       // بنبعت السعر كـ Prop
//             description={product.description} // بنبعت الوصف كـ Prop
//             images={product.images} // بنبعت مصفوفة الصور كـ Prop
//             discount={product.discount || 0} // بنبعت نسبة الخصم كـ Prop
//           />
//         ))}
//       </div>

//       {/* رسالة بتظهر لو المخزن فاضي تماماً */}
//       {products.length === 0 && (
//         <div className="text-center py-20 text-gray-500 text-xl">
//           لا توجد منتجات حالياً.. جارٍ تجهيز المعرض 🔨
//         </div>
//       )}
//     </div>
//   );
// }

















