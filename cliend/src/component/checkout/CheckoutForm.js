import React, { useEffect, useState } from "react";
import { CardCvcElement, useStripe, useElements, CardExpiryElement, CardNumberElement } from "@stripe/react-stripe-js";
import axios from "axios";
import CheckoutSucess from "./checkoutSucess";
import { useNavigate } from "react-router-dom";

const CheckoutForm =(props)=>{

  const cartdata = props.data.cartdata;
  const grandtotal = props.data.grandtotal;
  const address = props.data.address;
  const userid = props.data.userid;

  const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
      base: {
        iconColor: "#c4f0ff",
        color: "black",
        fontWeight: 500,
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": { color: "black" },
        "::placeholder": { color: "grey" }
      },
      invalid: {
        iconColor: "#ffc7ee",
        color: "black"
      }
    }
  }

  const [success, setSuccess] = useState(false)
  const stripe = useStripe()
  const elements = useElements()
  const [error,setError] = useState('')
  const [loading,setLoading] = useState(false)

  const navigate = useNavigate();

  useEffect(()=>{
    if(success == true){
      navigate("/shipping/checkout/sucsess")
    }

  },[success])

  const handleSubmit = async (e) =>{
  
    e.preventDefault()
    const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardCvcElement, CardExpiryElement, CardNumberElement)
    })
    if(!error){
        setError('')
        try {
            setLoading(true)
            const {id} = paymentMethod
            const response = await axios.post("/stripe/payment", {
                amount: grandtotal,
                id,
                userid,
                address,
                cartdata
            })

            if(response.data.success){
                setLoading(false)
                console.log("Successful Payment")
                setSuccess(true)
            }

        } catch (error) {
            console.log("Error", error)
        }
    }else {
        console.log(error.message)
        setError(error.message)
    }
}

    return (
      <div className="checkoutform-container">
        {error&&<p className="checkoutform-error">{error}</p>}
     {!success ? 
        <form onSubmit={handleSubmit} >
         <p>Card Number</p>
            <fieldset className='checkoutform-FormGroup'  >
                <div className="checkoutform-FormRow">
                    <CardNumberElement options={CARD_OPTIONS} />
                </div>
            </fieldset>
            <p>Valid Thru</p>
            <fieldset className='checkoutform-FormGroup'>
                <div className="checkoutform-FormRow">
                    <CardExpiryElement options={CARD_OPTIONS} />
                </div>
            </fieldset>
            <p>Cvv</p>
            <fieldset className='checkoutform-FormGroup'>
                <div className="checkoutform-FormRow">
                    <CardCvcElement options={CARD_OPTIONS} />
                </div>
            </fieldset>

            {loading?<button className="submit-btn"  disabled>Processing....</button>:<button>Pay</button>}
        </form>
        :
        <div className="checkoutform-payment-success">
          <CheckoutSucess />
        </div>
    }
      </div>
    );
  }

export default CheckoutForm;