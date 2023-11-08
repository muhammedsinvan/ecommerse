import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './bannermng.css'

const Showbannermng = () => {

  const [data,setData] = useState([]);
  const [refresh,setRefresh] = useState(true)

  const adminInfo = localStorage.getItem('admintoken')

  const config = {
    headers: {
      Authorization: `Bearer ${adminInfo}`,
    },
  };

    const navigate = useNavigate()

    useEffect(()=>{
      (async()=>{
        try{
          let res = await axios.get('/admin/getallbanner',config)
          setData(res.data)
        }catch(error){
          console.log(error)
        }
      })()
    },[refresh])

    const deletebanner = async(id) =>{
      try{
        let res = await axios.post(`/admin/deletebaner/${id}`)
        setRefresh(!refresh)
        console.log(res)
      }catch(error){
        console.log(error)
      }
    }

    const updatebanner = async (id)=>{
      navigate(`/admin/editbanner/${id}`)
    }

  return (
    <div className='showbanner-container'>
    <div className='showbanner-box'>
      <div className='showbanner-addproduct-btn' onClick={()=>navigate("/admin/addbanner")}>
        <button>Add Banner</button>
      </div>
      <h1 className='showbanner-title'>BANNERS</h1>
    
<div className='showbanner-divtable'>
<table className='showbanner-table'>
<tr>
  <th>Image</th>
  <th>Banner Title</th>
  <th>Banner Detail</th>
  <th>Banner Button</th>
  <th>Action</th>
</tr>
{data.map((item)=>(
  <tr>
  <td><img className='showbanner-img' src={item.image} /></td>
  <td>{item.title}</td>
  <td>{item.detail}</td>
  <td>{item.button}</td>
  <td>
    <button value={item._id} onClick={(e)=>updatebanner(e.target.value)} > Edit</button>
    <button value={item._id} onClick={(e)=>deletebanner(e.target.value)} >Delete</button>
  </td>
</tr>
))}


</table>
</div>

    </div>
      
  </div>
  )
}

export default Showbannermng