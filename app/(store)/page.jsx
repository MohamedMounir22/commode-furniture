import LocalizedHome from "@/components/LocalizedHome";
import connectDB from "@/lib/db";
import Product from "@/lib/models/product";

async function getProducts(category) {
    await connectDB();

    const query = category && category !== "all" ? { category } : {};
    const products = await Product.find(query).sort({ createdAt: -1 }).lean();

    return products.map((product) => ({
        ...product,
        _id: product._id?.toString(),
        images: product.images || [],
    }));
}

export default async function Home({ searchParams }) {
    const resolvedParams = await searchParams;
    const category = resolvedParams?.category || "all";

    let productsData = [];
    try {
        productsData = await getProducts(category);
    } catch (error) {
        console.error("Error fetching products:", error);
    }

    return <LocalizedHome products={productsData} />;
}
