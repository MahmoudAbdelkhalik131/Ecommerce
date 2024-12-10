import { Products } from "./Productes.interface";
import mongoose from "mongoose";
const ProductsSchema = new mongoose.Schema<Products>(
  {
     name: {type:String,required:true},
     description: {type:String,required:true},
     category: {type:mongoose.Schema.Types.ObjectId,ref:'Categories'},
     subcategory: {type:mongoose.Schema.Types.ObjectId,ref:'subcategories'},
     price: {type:Number,required:true},
     discount: {type:Number},
     priceAfterDiscount: {type:Number,default:0},
     quantity: {type:Number,default:0},
     sold: {type:Number,default:0},
    rateAvg: {type:Number,default:0},
     rating: {type:Number,default:0},
    cover: {type:String,required:true},
    images: [String]
  },
  { timestamps: true }
);
ProductsSchema.pre<Products>(/^find/,function(next) {
  this.populate({ path: "subcategory",select:" name image" });
  next();
});

export default mongoose.model<Products>("products", ProductsSchema);