import React, { useEffect, useState } from 'react'
import './catagories.css'
import Catagoriesitem from './Catagoriesitem'
import axios from '../../axios';

const Catagories = () => {
  
  const [data,setData] = useState([])

  useEffect(()=>{
    (async()=>{
      try{
        let res = await axios.get("/api/getcatagory")
        setData(res.data)
      }catch(error){
        console.log(error)
      }
    })()
  },[])

  return (
    <div className='Categories-Container'>
        {data && data.map((item)=>(
        <Catagoriesitem item={item} key={item?.id}/>
      ))}
    </div>
  )
}

export default Catagories