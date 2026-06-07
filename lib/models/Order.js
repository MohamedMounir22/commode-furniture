import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    paymentMethod: {
      type: String,
      enum: ["card", "instapay"],
      required: true,
    },
    customerName: {
      type: String,
      default: "عميل",
    },
    phone: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    items: [
      {
        _id: String,
        nameAr: String,
        nameEn: String,
        name: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],
    receiptImage: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
