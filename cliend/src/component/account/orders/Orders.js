import React, { useEffect, useState } from 'react';
import './orders.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EmptyCart from '../../cart/EmptyCart'; 
import moment from 'moment';

const Orders = () => {

  const navigate = useNavigate();


  const userid = localStorage.getItem("userid")
  const userInfo = localStorage.getItem('usertoken')

  const [data,setData] = useState([])

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo}`,
    },
  };
  
 
  useEffect(()=>{
    (async()=>{
      try{
        let res = await axios.get(`/getorders/${userid}`,config)
        setData(res.data)
      }catch(error){
        console.log(error) 
      }
    })() 
  },[])
  console.log(data.userid)
  return (
    <div className='orders-container'> 
        <div className='orders-box'>
            <h1 className='orders-title'>ORDERS</h1>
{data[0]?.userid ? <div className='orders-all_order'>
  {data?.map((item,index)=>(
    <div className='orders-one_order' onClick={()=>navigate(`/accounts/order/detail/${item._id}`)}>
<img src={item.products[0].image} alt='productimg' />
  {item.products.length == 1 ?<text className='orders-product_name'>{item.products[0].itemname}</text>:
  <text className='orders-product_name'>{item.products[0].itemname} and  {item.products.length-1} other item. </text>}
<text className='orders-product_price'>₹{item.grandtotal}</text>
<div className='orders-product_update'>
  
<text className='orders-product_status'>{item.orderstatus}</text>
{item.orderstatus  == 'Confirmed'? <text className='orders-product_date'>{moment(item?.date.confirmed).format('LL')}</text>
:item.orderstatus  == 'Shipped'? <text className='orders-product_date'>{moment(item?.date.shipped).format('LL')}</text>
:item.orderstatus  == 'Out For Delivery'? <text className='orders-product_date'>{moment(item?.date.outdelivery).format('LL')}</text>
: <text className='orders-product_date'>{moment(item?.date.deliverd).format('LL')}</text>}
</div>
</div>
  ))}


</div> :
<EmptyCart /> 
}

        </div>
    </div>
  )
}

export default Orders