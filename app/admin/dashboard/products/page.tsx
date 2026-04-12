import AdminLayout from "@/components/AdminLayout";
import ProductActions from "@/components/ProductActions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import Link from "next/link";

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

const categoryLabels: Record<string, string> = {
  dining: "سفرة",
  sofas: "انتريهات",
  tables: "ترابيزات",
  console: "كونسول",
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Products Management</h1>
            <p className="text-gray-600 mt-2">Manage your furniture products</p>
          </div>
          <Link href="/admin/add-product">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Products ({products.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {products.length === 0 ? (
              <p className="text-gray-600">No products found. Add your first product!</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Image</th>
                      <th className="text-left py-3 px-4 font-medium">Name</th>
                      <th className="text-left py-3 px-4 font-medium">Category</th>
                      <th className="text-left py-3 px-4 font-medium">Price</th>
                      {/* <th className="text-left py-3 px-4 font-medium">Stock</th> */}
                      <th className="text-left py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <img
                            src={product.images?.[0] || "/placeholder.png"}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                        </td>
                        <td className="py-3 px-4 font-medium">{product.name}</td>
                        <td className="py-3 px-4 text-sm text-gray-600 uppercase tracking-wide">{categoryLabels[product.category] || product.category}</td>
                        <td className="py-3 px-4">${product.price}</td>
                        <td className="py-3 px-4">{product.stock || 1}</td>
                        <td className="py-3 px-4">
                          <ProductActions productId={product._id} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
