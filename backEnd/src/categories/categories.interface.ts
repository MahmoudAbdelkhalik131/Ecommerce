import { Document } from "mongoose";
export default interface Categories extends Document{
    readonly name:string,
    image?:string,
}