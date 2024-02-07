import React, { useEffect, useState } from 'react'
import './Productlisting.css'
import Listproducts from './Listproducts'
import { useParams } from 'react-router-dom'
import axios from '../../axios';

const Productlisting = () => {

  const params = useParams();

  const [data,setData] = useState();

  useEffect (()=>{
    (async()=>{
      try{
        let res = await axios.get(`/api/getonecatagory/${params.item}`);
        setData(res.data)
      }catch(error){
        console.log(error)
      }
    })()
  },[])
  return (
    <div className='products-container'>
       <div className='products-banner'> 
       <img className='products-banner-img' src={data?.catbanner} alt='bannerimg'/>
       <text className='products-banner-text'>{data?.name}</text>
        </div>

<Listproducts /> 
      

    </div>
  )
}

export default Productlisting