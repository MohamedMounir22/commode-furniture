import LocalizedHome from "@/components/LocalizedHome";

export default async function Home({ searchParams }: { searchParams?: Promise<{ category?: string }> }) {
    const resolvedParams = await searchParams;
    const category = resolvedParams?.category || "all";
    let productsData = [];

    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const apiUrl =
            category && category !== "all"
                ? `${baseUrl}/api/products?category=${category}`
                : `${baseUrl}/api/products`;

        const res = await fetch(apiUrl, { next: { tags: ["products-data"], revalidate: 2000 } });

        if (!res.ok) {
            throw new Error(`Failed to fetch products: ${res.status}`);
        }

        productsData = await res.json();
    } catch (error) {
        console.error("Error fetching products:", error);
    }

    return <LocalizedHome products={productsData} />;
}
