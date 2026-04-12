import Link from "next/link";
import Hero from "@/components/Hero";
import LatestProducts from "@/components/ui/LatestProducts";
import CategoryFilter from "@/components/ui/CategoryFilter";




// This is a Server Component. It renders on the server and sends pure HTML to the browser.
// It's very fast because the browser doesn't have to execute much JavaScript to show this.
export default async function Home({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
const params = await searchParams;
const category = params.category || "all";

    let productsData = [];

try{

 // جرب دي مؤقتاً للتأكد
const apiUrl = category && category !== 'all'
  ? `http://localhost:3000/api/products?category=${category}`
  : `http://localhost:3000/api/products`;

    // Fetching the latest products from our API route
    const res = await fetch(apiUrl, { next: { tags: ['products-data'], revalidate: 2000 } });

    console.log("API Response Status:", res.status);
        if (res.ok) {
                    productsData = await res.json();
        }
        else {
            throw new Error("Failed to fetch products");
        }


    }
    catch (error) {
        console.error("Error fetching products:", error);
    }

  return(
  //  We use 'bg-zinc-50' for light mode and 'dark:bg-black' for dark mode support */
    <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full flex-col items-center">
        {/* Hero Section */}
        <Hero />
        {/* <section className="w-full bg-zinc-900 py-32 px-6 text-center text-white">
          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
            Commode
          </h1>
          <p className="mt-6 text-xl text-zinc-300 max-w-2xl mx-auto">
            Exquisite designs for the modern home. Discover our curated collection of artisanal furniture.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/products"
              className="rounded-md bg-primary px-6 py-3 text-primary-foreground font-semibold hover:opacity-90 transition"
            >
              Shop Collection
            </Link>
            <Link
              href="/about"
              className="rounded-md border border-zinc-700 px-6 py-3 text-white font-semibold hover:bg-zinc-800 transition"
            >
              Our Story
            </Link>
          </div>
        </section> */}

            {/* Category Filter */}
        <CategoryFilter />

        {/* latest products section  */}
        <section className="max-w-7xl w-full py-20 px-6">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Latest Arrivals</h2>
            <LatestProducts products ={productsData} />
        </section>

        {/* Featured Products Placeholder */}
        <section className="max-w-7xl w-full py-20 px-6">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Featured Pieces</h2>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group relative bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800">
                <div className="aspect-square w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800 mb-4">
                  {/* Image component will go here later */}
                </div>
                <h3 className="text-lg font-medium">Classic Commode {i}</h3>
                <p className="text-zinc-500">$499.00</p>
              </div>
            ))}
          </div>
        </section>
     </main>
     </div>
  );
}

















































































































