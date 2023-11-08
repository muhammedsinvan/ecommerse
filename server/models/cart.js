import mongoose from "mongoose";

const cartschema = mongoose.Schema({
    userid:({type:String,require:true}),
    grandtotal:({type:Number}),
    addressid:({type:String}),
    cartitem:[{
        itemid:{type:String,require:true},
        itemname:{type:String,require:true},
        image:{type:String,require:true},
        qty: {type: Number, require:true},
        price: {type: Number},
        subtotal:{type:Number}
    }]
})

const cart = mongoose.model('Cart',cartschema)

export default cart;