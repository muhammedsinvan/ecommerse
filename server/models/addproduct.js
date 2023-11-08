import mongoose from "mongoose";

const addproductSchema = mongoose.Schema({
    name:({type:String,required:true}),
    detail:({type:String,required:true}),
    material:({type:String,required:true}),
    color:({type:String,required:true}),
    catagory:({type:String,required:true}),
    pointone:({type:String,required:true}),
    pointtwo:({type:String,required:true}),
    stock:({type:Number,required:true}),
    image1:({type:String,required:true}),
    image2:({type:String,required:true}),
    image3:({type:String,required:true}),
    image4:({type:String,required:true}),
    wholesaleprice:({type:Number,required:true}),
    retailprice:({type:Number,required:true}),
    discountprice:({type:Number})
})

const product = mongoose.model('Product', addproductSchema)

export default product;