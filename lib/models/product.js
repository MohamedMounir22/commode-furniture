import mongoose from "mongoose"; // للتعامل مع الداتابيز
import { type } from "os";



const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "اكتب اسم المنتج يا زلمبح"],
    trim: true
  },
    category: {
    type: String,
    required: [true, "اختر فئة المنتج"],
        enum: {
      values: ["dining", "sofas", "tables", "console"],
      message: "اختر فئة مناسبة للمنتج"
    }

  },

  description: {
    type: String,
    required: [true, "وصف المنتج مهم عشان الزبون يفهم التفاصيل"]
  },
  price: {
    type: Number,
    required: [true, "المنتج مينفعش يكون ببلاش، حط السعر"],
    min: [0, "السعر مينفعش يكون بالسالب"]
  },

//   oldPrice: {
//     type: Number,
//     default: 0,
//     min: [0, "السعر مينفعش يكون بالسالب"]
//   },

 images: [{type: String}],
  stock: {
    type: Number,
    default: 1
  },
  discount: {
    type: Number,
    default: 0,
    min: [0, "الخصم مينفعش يكون بالسالب"],
    max: [100, "الخصم مينفعش يكون أكبر من 100%"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// بنشيك لو الموديل موجود قبل ما ننشئه (عشان Next.js Hot Reload)
const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
