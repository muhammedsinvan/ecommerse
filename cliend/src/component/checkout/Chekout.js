import React, { useEffect, useState } from 'react'
import {Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from './CheckoutForm';
import CheckoutProduct from './CheckoutProduct';
import './Checkout.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const stripePromise = loadStripe('pk_test_51O4M5ESIxqZqgWEMGqOKg6tMRUCJQLctMzCofQV7s3KR0NzTnKD10u9wVSKqU3GkdhYD9kYKgUKfy4F4XWFsgRod00MdzWZj5n');

const Chekout = () => {

  const params = useParams();
  const navigate = useNavigate();

  const [cartdata,setCartdata] = useState([])

  const [grandtotal, setGrandtotal] = useState();

  const [address, setAddress] = useState([]);

  const userid = localStorage.getItem("userid");

  const userInfo = localStorage.getItem('usertoken')

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo}`,
    },
  };

  const data = {cartdata:cartdata,grandtotal:grandtotal,address:address,userid:userid}


  useEffect(() => {
    (async () => {
      try {
        let res = await axios.get(`/getcartitem/${userid}`,config);
        setCartdata(res.data.cartitem);
        setGrandtotal(res.data.grandtotal);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);


  useEffect(() => {
    (async () => {
      try {
        let res = await axios.get(`/getuseraddres/${userid}/${params.addressid}`,config);
        console.log(res.data)
        setAddress(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(()=>{
    if(!cartdata){
      navigate('/')
    }
  },cartdata)

  return (
    <div className='checkout-maincontainer'>
    <div className='checkout-container'>

      <div className='checkout-leftcontainer'>
        <CheckoutProduct data={data} />
      </div>

      <div className='checkout-rightcontainer'>
      <Elements stripe={stripePromise}>
      <CheckoutForm data={data}  />
      </Elements>
      </div>
      </div>
    </div>
  )
}

export default Chekout
