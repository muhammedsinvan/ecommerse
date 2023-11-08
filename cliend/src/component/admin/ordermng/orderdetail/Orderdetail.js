import React, { useEffect, useState } from 'react'
import './orderdetail.css'
import { useNavigate,useParams } from 'react-router-dom'
import axios from 'axios';

const Orderdetail = () => {


  const navigate = useNavigate();
  const params = useParams();

  const [data,setData] = useState();

  const adminInfo = localStorage.getItem('admintoken')

  const config = {
    headers: {
      Authorization: `Bearer ${adminInfo}`,
    },
  };

  useEffect(()=>{
    (async()=>{
      try{
        let res = await axios.get(`/admin/getoneorder/${params.orderid}`,config)
        setData(res.data)
      }catch(error){
        console.log(error)
      }
    })()
  },[])
  
  return (
    <div className='orderdetail-container'>
        <div className='orderdetail-box'>
            <div className='orderdetail-title'>
                <h1>Order Detail</h1>
            </div>
            <div className='orderdetail-subtitle'>
                <p>Address</p>
            </div>
            <div className='orderdetail-field'>
              <text className='orderdetail-field_one'>Name</text>
              <text className='orderdetail-field_two'>{data?.address.name}</text>
            </div>
            <div className='orderdetail-field'>
              <text className='orderdetail-field_one'>Mobile</text>
              <text className='orderdetail-field_two'>{data?.address.mobile}</text>
            </div>
            <div className='orderdetail-field'>
              <text className='orderdetail-field_one'>Pin Code</text>
              <text className='orderdetail-field_two'>{data?.address.pin}</text>
            </div>
            <div className='orderdetail-field'>
              <text className='orderdetail-field_one'>Locality/Area/Street</text>
              <text className='orderdetail-field_two'>{data?.address.locality}</text>
            </div>
            <div className='orderdetail-field'>
              <text className='orderdetail-field_one'>Flat Number/Building Name</text>
              <text className='orderdetail-field_two'>{data?.address.buildingname}</text>
            </div>
            <div className='orderdetail-field'>
              <text className='orderdetail-field_one'>Landmark</text>
              <text className='orderdetail-field_two'>{data?.address.landmark}</text>
            </div>
            <div className='orderdetail-field'>
              <text className='orderdetail-field_one'>District/City</text>
              <text className='orderdetail-field_two'>{data?.address.district}</text>
            </div>
            <div className='orderdetail-field'>
              <text className='orderdetail-field_one'>State</text>
              <text className='orderdetail-field_two'>{data?.address.state}</text>
            </div>
            <div className='orderdetail-subtitle'>
                <p>Products</p>
            </div>{data?.products.map((item)=>(
                <div className='orderdetail-productfield'>
                <text>{item?.itemid}</text>
                <text >{item?.itemname}</text>
                <text>{item?.qty} psc</text>
                <text>{item?.subtotal}</text>
              </div>
            ))}
            <div className='orderdetail-shipping'>
            <text className='orderdetail-field_one'>Shipping charge</text>
              <text className='orderdetail-field_two'>40</text>
            </div>

            <div className='orderdetail-total'>
              <text className='orderdetail-field_one'>Grand total</text>
              <text className='orderdetail-field_two'>{data?.grandtotal}</text>
            </div>
            <div className='orderdetail-button' onClick={()=>navigate('/admin/orders')}>
              <button>GO BACK</button>
            </div>
        </div>
    </div>
  )
}

export default Orderdetail