import Stripe from "stripe";
import cart from "../../models/cart.js";
import user from "../../models/user.js";
import Order from "../../models/orders.js";

const getCheckoutSession =async(req,res)=>{
    try{
      const stripe = new Stripe(process.env.STRIPE_SECRET);
      const userid = req.params.userid; 
      const addressId = req.params.addressid;
  
      const getCart = await cart.findOne({userid})
      const Getuser = await user.findById(userid)
  
  
      const lineItems = getCart.cartitem.map(item => ({
        price_data: {
          currency: 'inr',
          unit_amount: item.price * 100, // Assuming each item has a grandtotal property
          product_data: {
            name: item.itemname, // Assuming each item has a name property
            description: 'jdsfjsjfk', // Assuming each item has a description property
            images:item.image
          },
        },
        quantity: item.qty, // Assuming each item has a quantity of 1
      }));
  
      const session = await stripe.checkout.sessions.create({
        payment_method_types:['card'],
        mode:'payment',
        success_url:`${process.env.CLIENT_SITE_URL}/shipping/checkout/sucsess`,
        cancel_url:`${process.env.CLIENT_SITE_URL}/shipping/checkout/${addressId}`,
        customer_email:Getuser.email,
        client_reference_id:userid,
        line_items:lineItems,
      });
  
      console.log(session.payment_status)
  
      const order = new Order ({
        userid:userid,
        orderstatus:'confirmed',
        grandtotal:getCart.grandtotal,
        date:{confirmed:new Date()},
        products:getCart.cartitem,
        addressid:addressId
      })
      await order.save();
      res.status(200).json({success:true,message:'Successfully paid',session});
    }catch(error){
      console.log(error)
      res.status(500).json({success:false,message:'Error creating checkout session'});
    }
  }


const stripeWebhook = (req,res)=>{
    const stripe = new Stripe(process.env.STRIPE_SECRET);
    const sig = req.headers['stripe-signature'];
    console.log("enterd")
  
    let event;
    try {
      // Verify the webhook signature
      event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      console.error('Webhook signature verification failed.', err.message);
      return res.sendStatus(400);
    }
  
    // Handle specific event types
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
  
      // Extract relevant data from the session object
      const { client_reference_id: userid, metadata: { addressId } } = session;
  
      // Add order data to MongoDB database
      try {
        // Your MongoDB save logic here
        // Example:
        // const order = new Order({...});
        // await order.save();
        
        console.log('Order data saved to MongoDB:', { userid, addressId });
      } catch (error) {
        console.error('Error saving order data to MongoDB:', error);
      }
    }
  
    // Respond with a 200 status to acknowledge receipt of the event
    res.sendStatus(200);
}

export {getCheckoutSession,stripeWebhook};