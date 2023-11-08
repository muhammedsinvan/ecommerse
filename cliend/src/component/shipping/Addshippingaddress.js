import React, { useEffect, useState } from 'react'
import './addshippingaddress.css'
import Addressform from './addressform/Addressform'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Addshippingaddress = () => {

    const navigate = useNavigate();

    const [cartdata,setCartdata] = useState([])
    const [grandtotal,setGrandtotal] = useState();

    const userid = localStorage.getItem('userid')

    const userInfo = localStorage.getItem('usertoken')

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo}`,
      },
    };
 
    function gotoshipping(){
        navigate('/shipping')
    }

    useEffect(()=>{ 
        (async()=>{
            try{
                let res = await axios.get(`/getcartitem/${userid}`,config)
                setCartdata(res.data.cartitem)
                setGrandtotal(res.data.grandtotal)
               }catch(error){
                console.log(error)
               }
        })()
    },[])

  return (
    <div className='addshippinaddress-container'>
<div className='addshippinaddress-left-container'>
<Addressform type="shipping" />

</div>

<div className='addshippinaddress-right-container'>
    
    <p className='addshippinaddress-box-total-title'>Order Details</p>
    <div className='addshippinaddress-box-total-detail'>
        <p>Price</p>
        <p>₹{grandtotal}</p>
    </div>
    <div className='addshippinaddress-box-total-detail'>
        <p>Items</p>
        <p>{cartdata.length}</p>
    </div>
    <div className='addshippinaddress-box-total-detail'>
        <p>Delivery Charges</p>
        <p>₹40</p>
    </div>
    
    <div className='addshippinaddress-box-total-detail-amount'>
        <p>Total Amount</p>
        <p>₹{grandtotal+40}</p>
    </div>
    
    <div className='addshippinaddress-box-total-detail-btn'>
       <button onClick={gotoshipping}>PROCEED TO PAYMENT</button>
                </div>
          </div>

    </div>
  )
}

export default Addshippingaddress
