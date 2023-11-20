import './banner.css'
import {Carousel} from "react-bootstrap"
import { useEffect, useState } from 'react'
import axios from 'axios'
const Banner = () => {

  const [datas,setData] = useState([])

  useEffect(()=>{
    (async()=>{
      try{
        let res = await axios.get('/api/getbanner')
        setData(res.data)
      }catch(error){
        console.log(error)
      }
    })()
  },[])

  console.log(datas)
  return (
  <Carousel className='banner-container'>
        {datas?.map((val)=>(
  <Carousel.Item interval={5000}>
    <img className="banner-image"
      src={val.image}
      alt="First slide"
    />
    <Carousel.Caption>
      <p className='banner-title'>{val.title}</p>
      <p className='banner-subtitle'>{val.detail}</p>
      <button className='banner-button'>{val.button}</button>
    </Carousel.Caption>
  </Carousel.Item>
        ))} 
  </Carousel>
  )
}

export default Banner
