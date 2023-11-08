import mongoose from "mongoose";

const addbannerSchema = mongoose.Schema({
    title:({type:String,required:true}),
    detail:({type:String,required:true}),
    url:({type:String,required:true}),
    button:({type:String,required:true}),
    image:({type:String,required:true})
})

const banner = mongoose.model('Banner',addbannerSchema)
export default banner;