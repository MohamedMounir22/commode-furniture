import mongoose from "mongoose"; // للتعامل مع الداتابيز

const ProductSchema = new mongoose.Schema({
  nameAr: {
    type: String,
    required: [true, "اكتب اسم المنتج بالعربية"],
    trim: true,
  },
  nameEn: {
    type: String,
    required: [true, "Write product name in English"],
    trim: true,
  },
  // Keep old 'name' field for backward compatibility, will use nameAr by default
  name: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    required: [true, "اختر فئة المنتج"],
    enum: {
      values: [
        "dining",
        "sofas",
        "tables",
        "console",
        "L-Shaped Sofa",
        "lShapedSofa",
        "l-shaped-sofa",
      ],
      message: "اختر فئة مناسبة للمنتج",
    },
  },
  descriptionAr: {
    type: String,
    required: [true, "وصف المنتج مهم عشان الزبون يفهم التفاصيل"],
  },
  descriptionEn: {
    type: String,
    required: [
      true,
      "Product description is important for customer understanding",
    ],
  },
  // Keep old 'description' field for backward compatibility
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: [true, "المنتج مينفعش يكون ببلاش، حط السعر"],
    min: [0, "السعر مينفعش يكون بالسالب"],
  },

  //   oldPrice: {
  //     type: Number,
  //     default: 0,
  //     min: [0, "السعر مينفعش يكون بالسالب"]
  //   },

  images: [{ type: String }],
  stock: {
    type: Number,
    default: 1,
  },
  discount: {
    type: Number,
    default: 0,
    min: [0, "الخصم مينفعش يكون بالسالب"],
    max: [100, "الخصم مينفعش يكون أكبر من 100%"],
  },
  bestSeller: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save hook to populate old fields for backward compatibility
ProductSchema.pre("save", function () {
  if (this.nameAr && !this.name) {
    this.name = this.nameAr; // Use Arabic name as default for old 'name' field
  }
  if (this.descriptionAr && !this.description) {
    this.description = this.descriptionAr; // Use Arabic description as default for old 'description' field
  }
});

// بنشيك لو الموديل موجود قبل ما ننشئه (عشان Next.js Hot Reload)
if (process.env.NODE_ENV !== "production" && mongoose.models.Product) {
  delete mongoose.models.Product;
}

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
