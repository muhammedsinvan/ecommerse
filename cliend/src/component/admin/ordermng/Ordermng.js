import React, { useEffect, useState } from 'react'
import './ordermng.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import moment from 'moment';

const Ordermng = () => {


  const navigate = useNavigate();

  const [data,setData]= useState([])

  const adminInfo = localStorage.getItem('admintoken')

  const config = {
    headers: {
      Authorization: `Bearer ${adminInfo}`,
    },
  };

  useEffect(()=>{
    (async()=>{
      try{
        let res = await axios.get('/admin/getallorder',config)
      setData(res.data)
      }catch(error){
        console.log(error)
      }
    })()
  },[])

  const updatestatus =async(status,orderid)=>{
   try{
     let res = await axios.post(`/admin/updateorderstatus/${orderid}`,{status})
     console.log(res)
   }catch(error){
    console.log(error)
   }
  }

  console.log(data)
  return (
    <div className='showorder-container'>
    <div className='showorder-box'>
      <h1 className='showorder-title'>ORDERS</h1>
    
<div className='showorder-divtable'>
<table className='showorder-table'>
<tr>
  <th>Date</th>
  <th>User Id</th>
  <th>Payment Id</th>
  <th>Grand Total</th>
  <th>Order Detail</th>
  <th>Status</th>
</tr>

{data.map ((item,index)=>(
  <tr>
  <td>{moment(item.date.ordered).format('LL')}</td>
  <td>{item._id}</td>
  <td>{item.paymentid}</td>
  <td>{item.grandtotal}</td>
  <td>
    <button onClick={()=>navigate(`/admin/orders/orderdetail/${item._id}`)}>
      View Detail
    </button>
  </td>
  <td>
  <select className='ordermng-select ' defaultValue={item.orderstatus} onChange={(e)=> updatestatus(e.target.value,item._id)}>
    <option value="shipped">Shipped</option>
    <option value="outdelivery">Out For Delivery</option>
    <option value="deliverd">Deliverd</option>
  </select>
  </td>
</tr>
))}

</table>
</div>

    </div>
      
  </div>
  )
}

export default Ordermng