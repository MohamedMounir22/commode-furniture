import LatestProducts from "@/components/ui/LatestProducts";
import connectDB from "@/lib/db";
import Product from "@/lib/models/product";

async function getProducts() {
  await connectDB();
  const products = await Product.find({})
    .sort({ bestSeller: -1, createdAt: -1 })
    .lean();

  return products.map((product) => ({
    ...product,
    _id: product._id?.toString(),
    images: product.images || [],
  }));
}

export default async function ProductsPage() {
  let productsData = [];

  try {
    productsData = await getProducts();
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
