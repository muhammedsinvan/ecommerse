import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './cart.css'
import axios from 'axios';
import EmptyCart from './EmptyCart';
import { Alert } from '@mui/material';

const Cart = () => {

    const [cartdata,setCartdata] = useState([])
    const [refresh,setRefresh] = useState(false)
    const [grandtotal,setGrandtotal] = useState();
    const [sucess,setSuccess] =useState(false)

    const navigate = useNavigate();

    const userid = localStorage.getItem("userid")
    const userInfo = localStorage.getItem('usertoken')

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo}`,
      },
    };
    
    useEffect(()=>{ 
        (async()=>{
            try{
                let res = await axios.get(`/api/getcartitem/${userid}`,config)
                setCartdata(res.data)
                setGrandtotal(res.data.grandtotal)
               }catch(error){
                console.log(error)
               }
        })()
    },[refresh])


 
    const removeitem = async (itemid)=>{
        try{
       
            let res = await axios.post(`/api/removecartitem/${userid}`,{itemid})
            console.log(res)
            setSuccess(true)
            setRefresh(!refresh)
            setTimeout(() => {
                setSuccess(false)
            }, 2000);
        }catch(error){
            console.log(error)
        }
    }

    const addqty = async (itemid) => {
      try{
        let res = await axios.post(`/api/updatecartqty/${userid}`,{itemid})
        setRefresh(!refresh)
        console.log(res)
      }catch(error){
        console.log(error)
      }
    }
    
    const lessqty = async(itemid)=>{
        try{
            let res = await axios.post(`/api/lesscartqty/${userid}`,{itemid})
            setRefresh(!refresh)
            console.log(res)
        }catch(error){
            console.log(error)
        }
    }

    function gotoshipping(){
        navigate('/shipping/checkout')
    }
  return (
    <div className='cart-container'>

        <div className='cart-title'>
            <h1>SHOPPING CART</h1>
        </div>  
       { sucess?<Alert className='success-alert' severity="success">Cart item has removed </Alert> : <></>}
      { cartdata.cartitem && grandtotal !== 0?  
       <div className='cart-box'>

            <div className='cart-box-item-list'>
         
          {cartdata.cartitem?.map((item)=>(

        
                <div className='cart-box-item'>
                <div className='cart-box-item-img' onClick={()=>navigate(`/productdetail/${item.itemid}`)}>
                    <img src={item?.image} alt='img'/>
                </div>
                <div className='cart-box-item-des'>
                    <div className='cart-box-item-des-title'>
                        <p >{item.itemname}</p>
                    </div>

                    <p className='cart-box-item-des-price'>₹{item?.price}</p>
                    <div className='cart-box-item-des-qty'>
<button className='cart-box-item-des-qty-ri'  value={item?.itemid} onClick={e=>lessqty(e.target.value)}>-</button> 
<h6 >{item?.qty}</h6>
<button className='cart-box-item-des-qty-ai'  value={item?.itemid} onClick={e=>addqty(e.target.value)}>+</button>
                    </div> 
                </div>
                
                <div className='cart-box-item-button'> 
                <button value={item?.itemid} onClick={e=>removeitem(e.target.value)}>Remove</button>

                </div>
            </div>
              ))}
            
   </div>
            

            <div className='cart-box-total'>
<p className='cart-box-total-title'>Order Details</p>
<div className='cart-box-total-detail'>
    <p>Price</p>
    <p>₹{grandtotal}</p>
</div>
<div className='cart-box-total-detail'>
    <p>Items</p>
    <p>{cartdata.cartitem?.length}</p>
</div>
<div className='cart-box-total-detail'>
    <p>Delivery Charges</p>
    <p>₹40</p>
</div>

<div className='cart-box-total-detail-amount'>
    <p>Total Amount</p>
    <p>₹{grandtotal+40}</p>
</div>

<div className='cart-box-total-detail-btn'>
   <button onClick={gotoshipping}>PROCEED TO SHIPPING</button>
</div>

            </div>

        </div>
        : <div>
        <EmptyCart />
                </div> }
    </div>
  )
}

export default Cart