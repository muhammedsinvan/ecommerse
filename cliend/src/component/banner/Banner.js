import './banner.css'
import {Carousel} from "react-bootstrap"
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Banner = () => {

  const navigate = useNavigate();

  const [datas,setData] = useState([])

  useEffect(()=>{
    (async()=>{
      try{
        let res = await axios.get('https://ecommerse-backend-six.vercel.app/api/getbanner')
        setData(res.data)
      }catch(error){
        console.log(error)
      }
    })()
  },[])

  console.log(datas)
  return (
  <Carousel className='banner-container'>
        {datas && datas.map((val)=>(  
  <Carousel.Item interval={5000}>
    <div className="banner-image"  onClick={()=>navigate(`${val?.url}`)}>
    <img 
      src={val?.image} 
      alt="First slide"
    />
    </div>

  </Carousel.Item>
        ))} 
  </Carousel>
  )
}

export default Banner
