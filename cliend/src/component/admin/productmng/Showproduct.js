import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Showproduct = () => {

  const navigate = useNavigate();

  const [data,setData] = useState([])

  const [refresh,setRefresh] = useState(true)

  const adminInfo = localStorage.getItem('admintoken')

  const config = {
    headers: {
      Authorization: `Bearer ${adminInfo}`,
    },
  };


  useEffect(()=>{
    (async()=>{
      try{
        let res = await axios.get('/admin/getallproduct',config)
        setData(res.data)
      }catch(error){
        localStorage.clear('admintoken')
        navigate('/admin')
      }
    })()
  },[refresh])

  const deleteproduct =async(id)=>{
    try{
      let res = await axios.post(`/admin/deleteproduct/${id}`)
      setRefresh(!refresh)
      console.log(res)
    }catch(error){
      console.log(error)
    }
  }  

  const editproduct =(id)=>{
    navigate(`/admin/editproduct/${id}`)
  }
  

  return (
    <div className='showproduct-container'>
      <div className='showproduct-box'>
        <div className='showproduct-addproduct-btn' onClick={()=>navigate("/admin/addproduct")}>
          <button>Add Product</button>
        </div>
        <h1 className='showproduct-title'>PRODUCTS</h1>
      
<div className='showproduct-divtable'>
<table className='showproduct-table' id="myTable">
  <thead>
  <tr>
    <th>Image</th>
    <th>Product Name</th>
    <th>Stock</th>
    <th>W Price</th>
    <th>R Price</th>
    <th>Action</th>
  </tr>
  </thead>
  <tbody>
    {data.map((item,index)=>(
        <tr>
        <td>
          <img src={item.image1} alt='productimg' />
        </td>
        <td>{item.name}</td>
        <td>{item.stock}</td>
        <td>{item.wholesaleprice}</td>
        <td>{item.retailprice}</td>
        <td>
          <button onClick={ e =>editproduct(e.target.value)}  value={item._id}>Edit</button>
          <button onClick={ e => deleteproduct(e.target.value)} value={item._id}>Delete</button>
        </td>
      </tr>
    ))}

 
  </tbody>
</table>

</div>

      </div>

    </div>

    

    
  )  
  
  

}




export default Showproduct