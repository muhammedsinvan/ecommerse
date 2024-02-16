import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    userid:({type:String,require:true}),
    orderstatus:({type:String,require:true}),
    grandtotal:({type:Number,require:true}),
    date:{
        confirmed:({type:Date}),
        shipped:({type:Date}),
        outdelivery:({type:Date}),
        deliverd:({type:Date})
        },
    products:[{
        itemid:{type:String,require:true},  
        itemname:({type:String,required:true}),
        image:({type:String,required:true}),
        qty: {type: Number, require:true},
        price:({type:Number,required:true}),
        subtotal:{type:Number}
    }],
    addressid:{type:String,require:true},  
});

const order = mongoose.model('Order',orderSchema);
export default order;