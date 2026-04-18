import AdminLayout from "@/components/AdminLayout";
import AdminProductsContent from "@/components/admin/AdminProductsContent";

export const dynamic = 'force-dynamic';

async function getProducts() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/test-db?t=${Date.now()}`, {
            cache: 'no-store'
        });

        if (!res.ok) {
            throw new Error("Failed to fetch products");
        }

        return res.json();
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
}

export default async function ProductsPage() {
    const products = await getProducts();

    const serializedProducts = products.map((product) => ({
        ...product,
        _id: product._id?.toString?.() ?? String(product._id),
        images: product.images || [],
    }));

    return (
        <AdminLayout>
            <AdminProductsContent products={serializedProducts} />
        </AdminLayout>
    );
}
