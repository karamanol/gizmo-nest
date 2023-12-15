import { Schema, Types, model, models } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: [true, "Product needs a name"] },
    description: String,
    price: { type: Number, required: [true, "Product must have a price"] },
    images: [String],
    discount: { type: Number },
    category: { type: Types.ObjectId, ref: "Category" },
    productProperties: { type: Object, default: {} },
    specs: { type: String },
    soldout: { type: Boolean, default: false },
    promoted: { type: Boolean, default: false },
  },
  { timestamps: true }
);
export const Product = models.Product || model("Product", productSchema);
