"use client";

import AdminLayout from "@/components/AdminLayout";
import ProductForm from "@/components/admin/ProductForm";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProductPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/test-db?id=${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data));
    }
  }, [id]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
          <p className="text-gray-500">Update the bilingual information for this item.</p>
        </div>
        {product ? <ProductForm initialData={product} /> : <p>Loading product data...</p>}
      </div>
    </AdminLayout>
  );
}
