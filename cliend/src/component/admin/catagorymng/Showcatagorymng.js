import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './catagorymng.css';
import axios from 'axios';

const Showcatagorymng = () => {

  const navigate = useNavigate();

  const [data,setData] = useState([])
  const [refresh,setRefresh] = useState(true)

  const adminInfo = localStorage.getItem('admintoken')

  const config = {
    headers: {
      Authorization: `Bearer ${adminInfo}`,
    },
  };

  useEffect(() => {
    (async()=>{
      try{
        let res = await axios.get('/admin/getcatagory',config)
        setData(res.data)
      }catch(error){
        console.log(error)
      }
    })()
  }, [refresh])

  const deletecatagory =async(id)=>{
    try{
      let res = await axios.post(`/admin/deletecatagory/${id}`)
      setRefresh(!refresh)
      console.log(res)
    }catch(error){
      console.log(error) 
    }
  } 
  
  const editcatagory = (id) =>{
    navigate(`/admin/editcatagory/${id}`)
  }
  
  return (
    <div className='showcatagory-container'>
    <div className='showcatagory-box'>
      <div className='showcatagory-addproduct-btn' onClick={()=>navigate("/admin/addcatagory")}>
        <button>Add Catagory</button>
      </div>
      <h1 className='showcatagory-title'>CATAGORY</h1>
    
<div className='showcatagory-divtable'>
<table className='showcatagory-table'>
<tr>
  <th>Image</th>
  <th>Catagory Name</th>
  <th>Catagory Button</th>
  <th>Action</th>
</tr>
{data.map((item)=>(
  <tr>
  <td className='showcatagory-img-container'><img className='showcatagory-img' src={item.image} alt="img" /></td>
  <td>{item.name}</td>
  <td>{item.button}</td>
  <td>
    <button value={item._id} onClick={ e => editcatagory(e.target.value)}>Edit</button>
    <button value={item._id} onClick={ e => deletecatagory(e.target.value)}>Delete</button>
  </td>
</tr>
))}


</table>
</div>

    </div>
      
  </div>
  )
}

export default Showcatagorymng