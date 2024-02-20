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
            images:[item.image]
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


const stripeWebhook = (request,response)=>{
  const stripe = new Stripe(process.env.STRIPE_SECRET);
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    console.log('verified webook')
  } catch (err) {
    console.log(`Webhook Error: ${err.message}`)
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  // switch (event.type) {
  //   case 'payment_intent.succeeded':
  //     const paymentIntentSucceeded = event.data.object;
  //     console.log(paymentIntentSucceeded)
  //     // Then define and call a function to handle the event payment_intent.succeeded
  //     break;
  //   // ... handle other event types
  //   default:
  //     console.log(`Unhandled event type ${event.type}`);
  // }

  // Return a 200 response to acknowledge receipt of the event
  response.send().end();
}

export {getCheckoutSession,stripeWebhook};