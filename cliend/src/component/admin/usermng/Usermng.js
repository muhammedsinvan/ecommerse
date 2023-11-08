import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from  'axios';



const Usermng = () => {

  const navigate = useNavigate();

  const [data,setData] = useState([]);

  const adminInfo = localStorage.getItem('admintoken')

  const config = {
    headers: {
      Authorization: `Bearer ${adminInfo}`,
    },
  };


  useEffect(()=>{
  (async()=>{
    try{
      const res = await axios.get('/admin/userlist',config)
      setData(res.data)
      console.log(data)
    }catch(err){
      console.log(err.response)
    }
  })()
},[])


  return (
    <div className='showproduct-container'>
    <div className='showproduct-box'>
      <h1 className='showproduct-title'>USER LIST</h1>
    
<div className='showproduct-divtable'>
<table className='showproduct-table' id="myTable">
<thead>
<tr>
  <th>No</th>
  <th>User Name</th>
  <th>Email</th>
  <th>Detail</th>
</tr>
</thead>
<tbody>
  {data.map((item,index) =>(
    <tr>
<td>{index+1}</td>
<td>{item.username}</td>
<td>{item.email}</td>
<td>
  <button>Detail</button>
</td>
</tr>
  ))}

{/* <tr>

  <td>Francisco Chang</td>
  <td>Mexico</td>
  <td>500</td>
  <td>
  <button>Detail</button>
  </td>
</tr>
<tr>

  <td>Roland Mendel</td>
  <td>Austria</td>
  <td>500</td>
  <td>
  <button>Detail</button>
  </td>
</tr>
<tr>
  <td>Helen Bennett</td>
  <td>UK</td>
  <td>500</td>
  <td>
  <button>Detail</button>
  </td>
</tr>
<tr>

  <td>Yoshi Tannamuri</td>
  <td>Canada</td>
  <td>500</td>
  <td>
  <button>Detail</button>
  </td>
</tr>
<tr>

  <td>Giovanni Rovelli</td>
  <td>Italy</td>
  <td>500</td>
  <td>
  <button>Detail</button>
  </td>
</tr>
<tr>

  <td>Giovanni Rovelli</td>
  <td>Italy</td>
  <td>500</td>
  <td>
  <button>Detail</button>
  </td>
</tr>
<tr>

  <td>Giovanni Rovelli</td>
  <td>Italy</td>
  <td>500</td>
  <td>
  <button>Detail</button>
  </td>
</tr>
<tr>

  <td>Giovanni Rovelli</td>
  <td>Italy</td>
  <td>500</td>
  <td>
  <button>Detail</button>
  </td>
</tr><tr>

  <td>Giovanni Rovelli</td>
  <td>Italy</td>
  <td>500</td>
  <td>
  <button>Detail</button>
  </td>
</tr>
<tr>

  <td>Giovanni Rovelli</td>
  <td>Italy</td>
  <td>500</td>
  <td>
  <button>Detail</button>
  </td>
</tr>
<tr>

  <td>Giovanni Rovelli</td>
  <td>Italy</td>
  <td>500</td>
  <td>
  <button>Detail</button>
  </td>
</tr>
<tr>

  <td>Giovanni Rovelli</td>
  <td>Italy</td>
  <td>500</td>
  <td>
  <button>Detail</button>
  </td>
</tr>
<tr>

  <td>Giovanni Rovelli</td>
  <td>Italy</td>
  <td>500</td>
  <td>
  <button>Detail</button>
  </td>
</tr> */}
</tbody>
</table>

</div>

    </div>

  </div>

  

  
  )
}

export default Usermng


