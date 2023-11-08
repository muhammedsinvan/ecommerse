import mongoose from "mongoose";

const userShema = mongoose.Schema({
    username:{type:String, required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    number:{type:Number},
    age:{type:String},
    created: {type: Date, default: Date.now},
    address:[{
        name:{type:String,required:true},
        mobile:{type:Number,required:true},
        pin:{type:Number,required:true},
        locality:{type:String,required:true},
        buildingname:{type:String,required:true},
        landmark:{type:String,required:true},
        district:{type:String,required:true},
        state:{type:String,required:true}
    }]
})

const user = mongoose.model('User',userShema)

export default user;