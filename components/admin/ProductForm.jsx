"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/lib/context/LanguageProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import imageCompression from "browser-image-compression";
import { Loader2, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const getFormSchema = (locale) =>
  z.object({
    name: z.string().min(2, locale === "ar" ? "الاسم مطلوب" : "Name is required"),
    description: z.string().min(10, locale === "ar" ? "الوصف مطلوب" : "Description is required"),
    price: z.coerce.number().min(1, locale === "ar" ? "السعر مطلوب" : "Price is required"),
    discount: z.coerce.number().min(0).max(100).default(0),
    category: z.string().min(1, locale === "ar" ? "الفئة مطلوبة" : "Category is required"),
    images: z.array(z.string()).min(1, locale === "ar" ? "يرجى رفع صورة واحدة على الأقل" : "Please upload at least one image"),
    bestSeller: z.boolean().default(false),
  });

export default function ProductForm({ initialData = null, onSubmit }) {
  const router = useRouter();
  const { t, locale } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [toast, setToast] = useState({ visible: false, type: "success", message: "" });

  const form = useForm({
    resolver: zodResolver(getFormSchema(locale)),
    defaultValues: initialData || {
      name: "",
      description: "",
      price: 0,
      discount: 0,
      category: "all",
      images: [],
      bestSeller: false,
    },
  });

  const showToast = (type, message) => {
    setToast({ visible: true, type, message });
    setTimeout(() => setToast({ visible: false, type: "", message: "" }), 3000);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    const simulateProgress = (start, end, duration) => {
      let current = start;
      const interval = setInterval(() => {
        current += 1;
        if (current >= end) clearInterval(interval);
        else setUploadProgress(current);
      }, duration / (end - start));
      return interval;
    };

    const interval = simulateProgress(0, 90, 1500);

    try {
      if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
        throw new Error("Missing Cloudinary Cloud Name in .env");
      }

      const compressedFile = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      });

      const formData = new FormData();
      formData.append("file", compressedFile);
      formData.append("upload_preset", "commode_furniture");
      formData.append("folder", "products");

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );

      const data = await res.json();
      clearInterval(interval);

      if (!res.ok) {
        throw new Error(data.error?.message || "Failed to upload image");
      }

      if (data.secure_url) {
        setUploadProgress(100);
        const currentImages = form.getValues("images") || [];
        form.setValue("images", [...currentImages, data.secure_url]);
        showToast("success", locale === "ar" ? "تم رفع الصورة" : "Image uploaded");
      }
    } catch (error) {
      clearInterval(interval);
      showToast("error", error.message);
    } finally {
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 1000);
    }
  };

  const removeImage = (index) => {
    const currentImages = form.getValues("images");
    form.setValue("images", currentImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/products", {
        method: initialData ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(initialData ? { ...data, _id: initialData._id } : data),
      });

      if (response.ok) {
        showToast("success", initialData ? "Updated" : "Added");
        if (onSubmit) onSubmit(data);
        setTimeout(() => {
          router.push("/admin/dashboard/products");
          router.refresh();
        }, 1500);
      }
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {toast.visible && (
        <div className={`mb-4 p-4 rounded-lg ${toast.type === "success" ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"}`}>
          {toast.message}
        </div>
      )}

      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="font-semibold text-yellow-900 mb-3">Product Checklist:</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-yellow-800">
          <li className="flex items-center gap-2"><span>{form.watch("images")?.length > 0 ? "✓" : "○"}</span> At least 1 Image</li>
          <li className="flex items-center gap-2"><span>{form.watch("name") ? "✓" : "○"}</span> Product Name</li>
          <li className="flex items-center gap-2"><span>{form.watch("price") > 0 ? "✓" : "○"}</span> Price Set</li>
        </ul>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Image Upload Section */}
          <div className="p-4 border border-dashed rounded-lg bg-white space-y-4">
            <FormLabel>Product Images</FormLabel>
            {isUploading && (
              <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-amber-600 h-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            )}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {form.watch("images")?.map((img, idx) => (
                <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border">
                  <img src={img} className="w-full h-full object-cover" alt="Product" />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full shadow-lg"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer hover:bg-amber-50 transition-colors">
                {isUploading ? <Loader2 className="animate-spin text-amber-600" /> : <Plus className="text-gray-400" />}
                <span className="text-[10px] mt-2 text-gray-500">{isUploading ? "Uploading..." : "Add Image"}</span>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} disabled={isUploading} />
              </label>
            </div>
            <FormMessage>{form.formState.errors.images?.message}</FormMessage>
          </div>

          <div className="space-y-4 p-4 border rounded-lg bg-white">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("admin.form.productName")}</FormLabel>
                  <FormControl><Input placeholder={t("admin.form.productNamePlaceholder")} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("admin.form.description")}</FormLabel>
                  <FormControl><Textarea rows={4} placeholder={t("admin.form.descriptionPlaceholder")} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Common Fields Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg bg-white">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price (EGP)</FormLabel>
                  <FormControl><Input type="number" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount %</FormLabel>
                  <FormControl><Input type="number" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <select
                    {...field}
                    className="w-full h-8 rounded-lg border border-input bg-transparent px-2 text-sm outline-none"
                  >
                    <option value="all">All</option>
                    <option value="dining">Dining</option>
                    <option value="sofas">Sofas</option>
                    <option value="tables">Tables</option>
                    <option value="console">Console</option>
                  </select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-4 pt-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-amber-600 hover:bg-amber-700"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : initialData ? (
                "Update Product"
              ) : (
                "Add Product"
              )}
            </Button>
            <Button
              type="button"
              onClick={() => router.back()}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
