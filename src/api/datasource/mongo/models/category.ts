import { model, models, Schema } from "mongoose";

const categorySchema = new Schema({
  categoryId: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  active: { type: Boolean, required: true, default: true },
});

const Category = models.Category || model("Category", categorySchema);
export default Category;
