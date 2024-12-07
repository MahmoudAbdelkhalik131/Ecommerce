import { Document } from "mongoose";
import Categories from "../categories/categories.interface";
interface Subcategories extends Document{
    name:string,
    image?:string
    Categories:Categories
}
export default Subcategories