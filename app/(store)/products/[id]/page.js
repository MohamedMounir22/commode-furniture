import mongoose from "mongoose";
import ProductDetailsClient from "@/components/ProductDetailsClient";
import connectDB from "@/lib/db";
import Product from "@/lib/models/product";
import { notFound } from "next/navigation";
import { Suspense, cache } from "react";
import LoadingSkeleton from "./loading";

const getProduct = cache(async (id) => {
  if (!id || typeof id !== "string" || !mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  await connectDB();
  const product = await Product.findById(id).lean();
  if (!product) return null;
  return {
    ...product,
    _id: product._id?.toString(),
  };
});

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) return { title: "Product Not Found - Commode" };

  return {
    title: `${product.nameAr || product.name || 'Product'} - Commode Furniture`,
    description:
      product.descriptionAr || product.description ||
      "Modern custom furniture with premium materials and elegant design.",
    openGraph: {
      images: product.images?.[0] ? [product.images[0]] : [],
    },
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <ProductDetailsClient product={product} />
    </Suspense>
  );
}
