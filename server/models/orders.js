import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    userid:({type:String,require:true}),
    paymentid:({type:String,require:true}),
    paymenttype:({type:String,require:true}),
    paymentstatus:({type:String,require:true}),
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
    address:{
        name:{type:String,required:true},
        mobile:{type:Number,required:true},
        pin:{type:Number,required:true},
        locality:{type:String,required:true},
        buildingname:{type:String,required:true},
        landmark:{type:String,required:true},
        district:{type:String,required:true},
        state:{type:String,required:true}
    }
});

const order = mongoose.model('Order',orderSchema);
export default order;