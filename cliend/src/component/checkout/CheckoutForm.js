// import React, { useEffect, useState } from "react";
// import { CardCvcElement, useStripe, useElements, CardExpiryElement, CardNumberElement } from "@stripe/react-stripe-js";
// import axios from "axios";
// import CheckoutSucess from "./checkoutSucess";
// import { useNavigate } from "react-router-dom";

// const CheckoutForm =(props)=>{

//   const cartdata = props.data.cartdata;
//   const grandtotal = props.data.grandtotal;
//   const address = props.data.address;
//   const userid = props.data.userid;

//   const CARD_OPTIONS = {
//     iconStyle: "solid",
//     style: {
//       base: {
//         iconColor: "#c4f0ff",
//         color: "black",
//         fontWeight: 500,
//         fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
//         fontSize: "16px",
//         fontSmoothing: "antialiased",
//         ":-webkit-autofill": { color: "black" },
//         "::placeholder": { color: "grey" }
//       },
//       invalid: {
//         iconColor: "#ffc7ee",
//         color: "black"
//       }
//     }
//   }

//   const [success, setSuccess] = useState(false)
//   const stripe = useStripe()
//   const elements = useElements()
//   const [error,setError] = useState('')
//   const [loading,setLoading] = useState(false)

//   const navigate = useNavigate();

//   useEffect(()=>{
//     if(success == true){
//       navigate("/shipping/checkout/sucsess")
//     }

//   },[success])

//   const handleSubmit = async (e) =>{
  
//     e.preventDefault()
   
//     const {error, paymentMethod} = await stripe.createPaymentMethod({
//         type: "card",
//         card: elements.getElement(CardNumberElement,CardExpiryElement,CardCvcElement )
//     })
//     if(!error){
//         setError('')
//         try {
//             setLoading(true)
//             const {id} = paymentMethod
//             const response = await axios.post("/api/stripe/payment", {
//                 amount: grandtotal,
//                 id,
//                 userid,
//                 address,
//                 cartdata
//             })

//             if(response.data.success){
//                 setLoading(false)
//                 console.log("Successful Payment")
//                 setSuccess(true)
//             }

//         } catch (error) {
//             console.log("Error", error)
//         }
//     }else {
//         console.log(error.message)
//         setError(error.message)
//     }
// }

//     return (
//       <div className="checkoutform-container">
//         {error&&<p className="checkoutform-error">{error}</p>} 
//      {!success ? 
//         <form onSubmit={handleSubmit} >
//          <p>Card Number</p>
//             <fieldset className='checkoutform-FormGroup'  >
//                 <div className="checkoutform-FormRow">
//                     <CardNumberElement options={CARD_OPTIONS} />
//                 </div>
//             </fieldset>
//             <p>Valid Thru</p>
//             <fieldset className='checkoutform-FormGroup'>
//                 <div className="checkoutform-FormRow">
//                     <CardExpiryElement options={CARD_OPTIONS} />
//                 </div>
//             </fieldset>
//             <p>Cvv</p>
//             <fieldset className='checkoutform-FormGroup'>
//                 <div className="checkoutform-FormRow">
//                     <CardCvcElement options={CARD_OPTIONS} />
//                 </div>
//             </fieldset>
            

//             {loading?<button className="submit-btn"  disabled>Processing....</button>:<button>Pay ₹{grandtotal+40}</button>}
//         </form>
//         :
//         <div className="checkoutform-payment-success">
//           <CheckoutSucess />
//         </div>
//     }
//       </div>
//     );
//   }

// export default CheckoutForm;



import React,{useEffect,useState} from 'react';
import { PaymentElement,LinkAuthenticationElement,useStripe,useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const CheckoutForm = (props) => {

  const cartdata = props.data.cartdata;
  const grandtotal = props.data.grandtotal;
  const address = props.data.address;
  const userid = props.data.userid;


  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [message,setMessage] = useState(null);
  const [isLoading,setIsLoading] = useState(false);

  // useEffect(()=>{
  //   if(!stripe){
  //     return;
  //   }

  //   const clientSecret = new URLSearchParams(window.location.search).get(
  //     "payment_intent_client_secret"
  //   );

  //   if(!clientSecret){
  //     return;
  //   }

  //   stripe.retrievePaymentIntent(clientSecret).then(({paymentIntent})=>{
  //     console.log("status")
  //     console.log(paymentIntent.status)  
  //      console.log("status")
  //     switch(paymentIntent.status){
  //       case "succeeded" :
  //         setMessage("Payment succeeded");  
  //         (async()=>{
  //           let addorder =  await axios.post ('/api/paymentsuccess/confirmorder',{props,clientSecret})
  //         })()
  //         break;
        
  //         case "processing" :
  //         setMessage("Your Payment is processing");
  //         break;

  //         case "requires_payment_method"  : 
  //         setMessage("Your payment was not successful, please try again");
  //         break;

  //         default :
  //         setMessage("Something went wrong");
  //         break;
  //     }
  //   })

  // }, [stripe])

  const handleSubmit = async (e)=>{
    e.preventDefault();

    if (!stripe || ! elements){
      return;
    }

    setIsLoading(true);

    const { token, error } = await stripe.createToken(elements.getElement(PaymentElement));
console.log("token")
console.log(token)
console.log('token')
    // const {error} = await stripe.confirmPayment({
    //   elements,
    //   confirmParams:{
    //      return_url:"http://localhost:3000"
    //   }
    // });

    if(error){
      setMessage(error.message)
    }else{
      try{
        const response = await axios.post("/api/stripe/payment",{
          cartdata,
          grandtotal,
          address,
          userid,
          currency:'inr',
          token: token.id
        })
        console.log(response.data);
      }catch(error){
        console.error(error);
      }
    }

    setIsLoading(false)
  };

  const handleEmailChange = e =>{
    console.log(e)
    setEmail(e.value.email)
  }

  const paymentElementOption ={
    layout:"tabs"
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement 
      id='link-authentication-element'
      onChange={handleEmailChange}
      />
      <PaymentElement id='payment-element' options={paymentElementOption} />
      <button disabled={isLoading || !stripe || !elements} id="submit" >
        <span id='button-text'>
          {isLoading ? <div className='sppinner' id='spinner'></div> : "Pay Now"} 
        </span>
      </button>
      {message && <div id='payment-message' >{message}</div>}
    </form>
  )
}

export default CheckoutForm