import mongoose from "mongoose";

const heroSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "يرجى إدخال عنوان السلايد"],
      trim: true,
    },
    subtitle: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "يرجى إدخال وصف مختصر"],
    },
    image: {
      type: String, // هنا هنخزن رابط الصورة اللي جاي من Cloudinary
      required: [true, "يرجى رفع صورة للسلايد"],
    },
    buttonText: {
      type: String,
      default: "تسوق الآن",
    },
    buttonLink: {
      type: String,
      default: "/products",
    },
    isActive: {
      type: Boolean,
      default: true, // عشان لو حبيت تخفي سلايد معين مؤقتاً
    },
    order: {
      type: Number,
      default: 0, // عشان ترتب السلايدات (مين يظهر الأول)
    },
  },
  { timestamps: true }
);

// منع Mongoose من إنشاء الموديل أكتر من مرة في Next.js
const Hero = mongoose.models.Hero || mongoose.model("Hero", heroSchema);

export default Hero;
