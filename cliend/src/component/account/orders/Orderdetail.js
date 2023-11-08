import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './orderdetail.css';
import { useParams,useNavigate } from 'react-router-dom';
import moment from 'moment';

const Orderdetail = () => {

  const params = useParams();
  const navigate = useNavigate();

  const [data,setData] = useState();
  const [products,setProducts] = useState([])

  const userInfo = localStorage.getItem('usertoken')

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo}`,
    },
  };
  

  useEffect(()=>{
    (async()=>{
    try{
      let res = await axios.get(`/order/detail/${params.id}`,config)
      setData(res.data)
      setProducts(res.data.products)
    }catch(error){
      console.log(error)
    }
    })()
  },[])

  return (
    <div className='orderdetails-container'>
    <div className='orderdetails-box'>
        <h1 className='orderdetails-title'>ORDER DETAIL</h1>
        <div className='orderdetails-address'>
          <div className='orderdetails-desc'>

            <div className='orderdetails-desc-address'>
            <text>{data?.address.buildingname}</text>
            <text>{data?.address.locality}</text>
            <div className='orderdetails-desc-place'>
            <text>{data?.address.landmark} , </text>
            <text> {data?.address.pin}</text>
            </div>
            <div className='orderdetails-desc-place'>
            <text>{data?.address.sate}</text>,
            <text>{data?.address.district}</text> 
            </div>
            </div>

            <div className='orderdetails-total-price'>
              <text  className='orderdetails-total-price_title'>Total amount</text>
              <text>₹{data?.grandtotal}</text>
            </div>

            <div className='orderdetails-product_update'>
<text className='orderdetails-product_status'>{data?.orderstatus}</text>
{/* <text className='orderdetails-product_date'>July 26, 2011</text> */}
{data?.orderstatus  == 'Confirmed'? <text className='orderdetails-product_date'>{moment(data?.date.confirmed).format('LL')}</text>
:data?.orderstatus  == 'Shipped'? <text className='orderdetails-product_date'>{moment(data?.date.shipped).format('LL')}</text>
:data?.orderstatus  == 'Out For Delivery'? <text className='orderdetails-product_date'>{moment(data?.date.outdelivery).format('LL')}</text>
: <text className='orderdetails-product_date'>{moment(data?.date.deliverd).format('LL')}</text>}
</div>
    
          </div>
            
        </div>
        {products?.map((item,index)=>(
                  <div className='orderdetails-one_order'>
                  <img src={item.image} alt='productimg' onClick={()=>navigate(`/productdetail/${item.itemid}`)}/>
                  <text className='orderdetails-product_name'>{item.itemname}</text>
                  <text>QTY : {item.qty} </text>
                  <text className='orderdetails-product_price'>₹{item.price}</text>
                  </div>
        ))}


        </div>
        </div>
  )
}

export default Orderdetail