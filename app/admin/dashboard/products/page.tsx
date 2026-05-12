import AdminLayout from "@/components/AdminLayout";
import AdminProductsContent from "@/components/admin/AdminProductsContent";
import connectDB from "@/lib/db"; // تأكد من المسار الصحيح لملف الاتصال اللي بعته
import mongoose from "mongoose";

// 1. تعريف الـ Schema محلياً أو استيراد الموديل إذا كان جاهزاً
// يفضل دائماً استيراد الموديل، لكن هنا وضعت تعريفاً سريعاً لضمان عمل الكود
const ProductSchema = new mongoose.Schema({
    nameAr: String,
    nameEn: String,
    category: String,
    price: Number,
    images: [String],
    stock: Number,
});

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export const dynamic = 'force-dynamic';

async function getProducts() {
    try {
        // الاتصال بمخزن أسامة (الداتابيز) مباشرة
        await connectDB();

        // جلب البيانات بدون الحاجة لـ Fetch أو سيرفر محلي
        const products = await Product.find({}).lean();
        return products;
    } catch (error) {
        console.error("خطأ في جلب البيانات من الداتابيز:", error);
        return [];
    }
}

export default async function ProductsPage() {
    const products = await getProducts();

    const serializedProducts = products.map((product: any) => ({
        ...product,
        // تحويل الـ _id لنص ليتوافق مع Next.js Client Components
        _id: product._id?.toString() || String(product._id),
        images: product.images || [],
    }));

    return (
        <AdminLayout>
            <AdminProductsContent products={serializedProducts} />
        </AdminLayout>
    );
}
