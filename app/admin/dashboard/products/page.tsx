import AdminLayout from "@/components/AdminLayout";
import AdminProductsContent from "@/components/admin/AdminProductsContent";
import connectDB from "@/lib/db";
import Product from "@/lib/models/product";

interface DbProduct {
    _id: string | { toString(): string };
    images?: string[];
    nameAr?: string;
    nameEn?: string;
    name?: string;
    category?: string;
    description?: string;
    price?: number;
    stock?: number;
    discount?: number;
    createdAt?: string | Date;
}

export const dynamic = "force-dynamic";

async function getProducts(): Promise<DbProduct[]> {
    try {
        await connectDB();
        const products = await Product.find({}).lean();
        return products as DbProduct[];
    } catch (error) {
        console.error("خطأ في جلب البيانات من الداتابيز:", error);
        return [];
    }
}

export default async function ProductsPage() {
    const products = await getProducts();

    const serializedProducts = products.map((product) => ({
        _id: product._id?.toString?.() ?? String(product._id),
        images: product.images ?? [],
        nameAr: product.nameAr ?? product.name ?? "",
        nameEn: product.nameEn ?? product.name ?? "",
        name: product.name ?? "",
        category: product.category ?? "",
        price: product.price ?? 0,
        stock: product.stock ?? 0,
    }));

    return (
        <AdminLayout>
            <AdminProductsContent products={serializedProducts} />
        </AdminLayout>
    );
}
