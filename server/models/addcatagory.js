import mongoose from "mongoose";

const addcatagorySchema = mongoose.Schema({
    name:({type:String,required:true}),
    button:({type:String,required:true}),
    image:({type:String,required:true})
})

const catagory = mongoose.model('Catagory',addcatagorySchema)

export default catagory;