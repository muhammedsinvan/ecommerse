import React, { useEffect, useState } from 'react'
import './shipping.css'
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Shipping = () => {

  const navigate = useNavigate()

  const userid = localStorage.getItem('userid')

  const [address,setAddress] = useState([])

  const [refresh,setRefresh] = useState(false)

  const [cartdata,setCartdata] = useState([])

  const [grandtotal,setGrandtotal] = useState();

  const [cart,setCart] = useState()

  const userInfo = localStorage.getItem('usertoken')

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo}`,
    },
  };


  const Editaddress = (addressid) =>{
    navigate(`/shipping/address/edit/${addressid}`)
  }

  useEffect(()=>{
    (async()=>{
      try{
        let res = await axios.get(`/getshippingaddress/${userid}`,config)
        setAddress(res.data)
      }catch(error){
        console.log(error)
      }
    })()
  },[refresh])

  const removeaddress = async (addressid)=>{
    try{
      let res = await axios.post(`/removeaddress/${userid}`,{addressid})
      setRefresh(!refresh)
    }catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{ 
    (async()=>{
        try{
            let res = await axios.get(`/getcartitem/${userid}`,config)
            setCart(res.data)
            setCartdata(res.data.cartitem)
            setGrandtotal(res.data.grandtotal)
           }catch(error){
            console.log(error)
           }
    })()
},[refresh])

 const getshippingaddress=(addressid)=>{
  navigate(`/shipping/checkout/${addressid}`)
 }


 useEffect(()=>{
  if(!cartdata){
    navigate('/')
  }
 },cartdata)

  return (
    <div className='shipping-container'>
    <div  className='shipping-left-container'>
<div className='shipping-addaddress_box' onClick={()=> navigate('/shipping/address/add')}>
<AddIcon />
<text>ADD A NEW ADDRESS</text>  
</div>
{address?.map((item)=>(
  <div className='shippping-address-oneaddress'>
  <div className='shippping-address-dsc'>
  <div className='shippping-address-personal'>
  <input className='shipping-address-checkbox' name='addrresstype' value={item._id} onClick={((e)=>getshippingaddress(e.target.value))} type='radio' />
<text>{item.name}</text>
<text>{item.mobile}</text>
</div>
<div className='shippping-address-info'>
<text> {item.buildingname},</text>
<text>{item.locality},</text>
<text>{item.district},</text>
<text>{item.state}</text>-
<text>{item.pin}</text> 
</div>
  </div>
<div className='shippping-address-btn'>
  <button value={item._id} onClick={e => Editaddress(e.target.value)}>Edit</button>
  <button value={item._id} onClick={e => removeaddress(e.target.value)}>Delete</button>
</div>
</div>
))}
    </div>



      <div className='shipping-right-container'>
    
<p className='shipping-box-total-title'>Order Details</p>
<div className='shipping-box-total-detail'>
    <p>Price</p>
    <p>₹{grandtotal}</p>
</div>
<div className='shipping-box-total-detail'>
    <p>Items</p>
    <p>{cartdata.length}</p>
</div>
<div className='shipping-box-total-detail'>
    <p>Delivery Charges</p>
    <p>₹40</p>
</div>

<div className='shipping-box-total-detail-amount'>
    <p>Total Amount</p>
    <p>₹{grandtotal+40}</p>
</div>

      </div>
        
    </div>
  )
}

export default Shipping