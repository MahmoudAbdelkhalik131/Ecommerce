import Subcategories from "./subcategories.interface";
import mongoose from "mongoose";
const subcategoriesSchema = new mongoose.Schema<Subcategories>(
  {
    name: { type: String, required: true, trim: true },
    Categories: { type: mongoose.Schema.Types.ObjectId, ref: "Categories" },
    image: { type: String },
  },
  { timestamps: true }
);
subcategoriesSchema.pre<Subcategories>(/^find/,function(next) {
  this.populate({ path: "Categories",select:" name image" });
  next();
});

export default mongoose.model<Subcategories>(
  "subcategories",
  subcategoriesSchema
);
