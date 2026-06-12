"use client";

import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import imageCompression from 'browser-image-compression';
import { Edit, Eye, EyeOff, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function HeroManagementPage() {
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingSlide, setEditingSlide] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        description: "",
        image: "",
        buttonText: "Shop Now",
        buttonLink: "/products",
        isActive: true,
        order: 0,
    });
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchSlides();
    }, []);

    const fetchSlides = async () => {
        try {
            const response = await fetch("/api/hero");
            const data = await response.json();
            if (data.success) {
                setSlides(data.data);
            }
        } catch (error) {
            console.error("Error fetching slides:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            // Compress the image before uploading
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
            };

            const compressedFile = await imageCompression(file, options);

            const formDataUpload = new FormData();
            formDataUpload.append("file", compressedFile);
            formDataUpload.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "commode_present");

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                { method: "POST", body: formDataUpload }
            );

            const data = await response.json();
            if (data.secure_url) {
                setFormData(prev => ({ ...prev, image: data.secure_url }));
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = editingSlide ? `/api/hero/${editingSlide._id}` : "/api/hero";
            const method = editingSlide ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                fetchSlides();
                setShowForm(false);
                setEditingSlide(null);
                setFormData({
                    title: "",
                    subtitle: "",
                    description: "",
                    image: "",
                    buttonText: "Shop Now",
                    buttonLink: "/products",
                    isActive: true,
                    order: 0,
                });
            }
        } catch (error) {
            console.error("Error saving slide:", error);
        }
    };

    const handleEdit = (slide) => {
        setEditingSlide(slide);
        setFormData({
            title: slide.title,
            subtitle: slide.subtitle || "",
            description: slide.description,
            image: slide.image,
            buttonText: slide.buttonText,
            buttonLink: slide.buttonLink,
            isActive: slide.isActive,
            order: slide.order,
        });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this slide?")) return;

        try {
            const response = await fetch(`/api/hero/${id}`, { method: "DELETE" });
            if (response.ok) {
                fetchSlides();
            }
        } catch (error) {
            console.error("Error deleting slide:", error);
        }
    };

    const toggleActive = async (slide) => {
        try {
            const response = await fetch(`/api/hero/${slide._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...slide, isActive: !slide.isActive }),
            });

            if (response.ok) {
                fetchSlides();
            }
        } catch (error) {
            console.error("Error toggling slide status:", error);
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">Hero Slides Management</h1>
                        <p className="text-gray-600">Manage your homepage hero carousel slides</p>
                    </div>
                    <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Add New Slide
                    </Button>
                </div>

                {showForm && (
                    <Card>
                        <CardHeader>
                            <CardTitle>{editingSlide ? "Edit Slide" : "Add New Slide"}</CardTitle>
                            <CardDescription>
                                Configure the hero slide content and settings
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Title</Label>
                                        <Input
                                            id="title"
                                            value={formData.title}
                                            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="subtitle">Subtitle</Label>
                                        <Input
                                            id="subtitle"
                                            value={formData.subtitle}
                                            onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="image">Image * <span className="text-sm text-gray-500">(Recommended: 1920x1080 or similar wide format)</span></Label>
                                    <div className="flex gap-4">
                                        <Input
                                            id="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="flex-1"
                                        />
                                        {uploading && <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>}
                                    </div>
                                    {formData.image && (
                                        <div className="mt-2">
                                            <Image
                                                src={formData.image}
                                                alt="Preview"
                                                width={200}
                                                height={120}
                                                className="rounded border"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="buttonText">Button Text</Label>
                                        <Input
                                            id="buttonText"
                                            value={formData.buttonText}
                                            onChange={(e) => setFormData(prev => ({ ...prev, buttonText: e.target.value }))}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="buttonLink">Button Link</Label>
                                        <Input
                                            id="buttonLink"
                                            value={formData.buttonLink}
                                            onChange={(e) => setFormData(prev => ({ ...prev, buttonLink: e.target.value }))}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="order">Display Order</Label>
                                        <Input
                                            id="order"
                                            type="number"
                                            value={formData.order}
                                            onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="isActive">Status</Label>
                                        <select
                                            id="isActive"
                                            value={formData.isActive ? "active" : "inactive"}
                                            onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.value === "active" }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Button type="submit">
                                        {editingSlide ? "Update Slide" : "Create Slide"}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            setShowForm(false);
                                            setEditingSlide(null);
                                            setFormData({
                                                title: "",
                                                subtitle: "",
                                                description: "",
                                                image: "",
                                                buttonText: "Shop Now",
                                                buttonLink: "/products",
                                                isActive: true,
                                                order: 0,
                                            });
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                )}

                <div className="grid gap-4">
                    {slides.map((slide) => (
                        <Card key={slide._id}>
                            <CardContent className="p-6">
                                <div className="flex gap-4">
                                    <div className="w-32 h-20 relative rounded overflow-hidden">
                                        <Image
                                            src={slide.image}
                                            alt={slide.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="font-semibold text-lg">{slide.title}</h3>
                                                <p className="text-gray-600 text-sm mt-1">{slide.description}</p>
                                                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                                    <span>Order: {slide.order}</span>
                                                    <span className={`px-2 py-1 rounded text-xs ${slide.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                        {slide.isActive ? 'Active' : 'Inactive'}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => toggleActive(slide)}
                                                >
                                                    {slide.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleEdit(slide)}
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() => handleDelete(slide._id)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {slides.length === 0 && (
                    <Card>
                        <CardContent className="p-12 text-center">
                            <p className="text-gray-500">No hero slides found. Create your first slide to get started.</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AdminLayout>
    );
}
