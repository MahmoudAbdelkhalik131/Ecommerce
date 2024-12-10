import mongoose from "mongoose"
import { queryObjects } from "v8"

class Features {
    constructor(public mongooseQuery:mongoose.Query<any[],any>,private queryString:any ) {}
  sort() {
    if(this.queryString.sort){
        const sortBy:string=this.queryString.sort.splite(',').join(' ')
        this.mongooseQuery=this.mongooseQuery

    }
  }
  limitFields() {}
  search() {}
  filter() {}
  pagination() {}
}
export default Features