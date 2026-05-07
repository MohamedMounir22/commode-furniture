import LatestProducts from "@/components/ui/LatestProducts";

export default async function ProductsPage() {
    let productsData = [];

    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const res = await fetch(`${baseUrl}/api/products`, {
            next: { tags: ["products-data"], revalidate: 2000 },
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch products: ${res.status}`);
        }

        productsData = await res.json();
    } catch (error) {
        console.error("Error fetching products:", error);
    }

    return (
        <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black">
            <main className="flex flex-1 w-full flex-col items-center">
                <section className="w-full max-w-7xl py-20 px-4 sm:px-6">
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
                        All Products
                    </h1>
                    <LatestProducts products={productsData} />
                </section>
            </main>
        </div>
    );
}