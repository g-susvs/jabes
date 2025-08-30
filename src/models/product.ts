import { model, models, Schema } from "mongoose";

const productSchema = new Schema({
  productId: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  description: { type: String },
  imgUrl: { type: String },
  slug: { type: String, required: true },
  features: { type: Object },
  active: { type: Boolean, required: true, default: true },
  categoryId: { type: String, required: true },
});

const Product = models.Product || model("Product", productSchema);
export default Product;
