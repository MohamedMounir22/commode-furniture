import LocalizedHome from "@/components/LocalizedHome";

export default async function Home({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
    const params = await searchParams;
    const category = params.category || "all";

    let productsData = [];

    try {
        const apiUrl = category && category !== 'all'
            ? `http://localhost:3000/api/products?category=${category}`
            : `http://localhost:3000/api/products`;

        const res = await fetch(apiUrl, { next: { tags: ['products-data'], revalidate: 2000 } });

        console.log("API Response Status:", res.status);
        if (res.ok) {
            productsData = await res.json();
        } else {
            throw new Error("Failed to fetch products");
        }
    } catch (error) {
        console.error("Error fetching products:", error);
    }

    return <LocalizedHome products={productsData} />;
}
