import AdminLayout from "@/components/AdminLayout";
import AdminDashboardContent from "@/components/admin/AdminDashboardContent";

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

export default async function DashboardPage() {
    const products = await getProducts();

    // Calculate real stats
    const totalProducts = products.length;
    const totalRevenue = products.reduce((sum, product) => sum + (product.price * (product.stock || 1)), 0);
    const totalOrders = 0; // Placeholder - no orders system yet
    const totalCustomers = 0; // Placeholder - no users system yet

    const serializedProducts = products.map((product) => ({
        ...product,
        _id: product._id?.toString?.() ?? String(product._id),
        images: product.images || [],
    }));

    return (
        <AdminLayout>
            <AdminDashboardContent
                totalProducts={totalProducts}
                totalOrders={totalOrders}
                totalRevenue={totalRevenue}
                totalCustomers={totalCustomers}
                products={serializedProducts}
            />
        </AdminLayout>
    );
}
