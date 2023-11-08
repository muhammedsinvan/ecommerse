import React, { useEffect, useState,useRef } from 'react'
import './Productlisting.css';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { useParams } from 'react-router-dom';

const Listproducts = () => {

  const [products,setProducts] = useState([])

  const params = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef();

  const [refresh,setRefresh] = useState(false)
  const [cartdata,setCartdata] = useState()
  const [error,setError] = useState(false)

  const userInfo = localStorage.getItem('usertoken')

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo}`,
    },
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [error]);

  useEffect(()=>{
    (async()=>{
      try{
        let res = await axios.get(`/getcatagoryproducts/${params.item}`)
        setProducts(res.data)
      }catch(error){
        console.log(error)
      }
    })()
  },[])

  console.log(products)

  const user = localStorage.getItem('userid')


  function getproductdetail(id){
    navigate(`/productdetail/${id}`)
  }

  const addtocart =async(productid)=>{
    const qty = 1;
    try{
      if(user){
        let res = await axios.post(`/addtocart/${user}/${qty}`,{productid})
        console.log(res)
        setRefresh(!refresh)
      }else{
       alert()
      }
      
    }catch(error){
      console.log(error)
    }
  }

  function alert(){
    setError(true)
    setTimeout(() => {
      setError(false)
    }, 5000);
    
  }


useEffect(()=>{
  (async()=>{
      try{
        if(user){
          let res = await axios.get(`/getcartitem/${user}`,config)
          setCartdata(res.data.cartitem)
        }else{
          setCartdata()
        }
         }catch(error){
          console.log(error)  
         }
  })()
},[refresh])

  function gotocart(){
    navigate('/cart')
  }

  return (
    <>
     {error&&
      <div ref={messagesEndRef} className='products-box-error'>
      <p>Please make login</p>
      </div>
      }
    <div className='products-box-container'>
     
      {products?.map((item)=>(
       <div className='products-box'>
        
        <div className='products-img-container'>
        <img className='products-img' src={item.image1} alt='img' onClick={e=> getproductdetail(item._id)}  />
        </div>
        <div className='products-text-box'>
          <h2 className='products-text-box-title'>{item.name}</h2>
          <div className='products-text-box-price'>
          <h3 className='products-text-box-retialprice'>₹ {item.retailprice}</h3>
           {/* <h3 className='products-text-box-discountprice'>{item.discountprice}</h3> */}
          </div>
          <div className='products-text-box-btn'>

          {cartdata&&cartdata.some(cartitem => cartitem?.itemid==item?._id)? 
          <button className='products-text-box-gotocrtbtn' value={item._id} onClick={gotocart}>Go To Cart</button>:
          <button className='products-text-box-crtbtn' value={item._id} onClick={e=>addtocart(e.target.value)}>Add To Cart</button>}

          

          <button className='products-text-box-buybtn' value={item._id} onClick={e=> getproductdetail(e.target.value)}  >Buy Now</button>

          </div>
        </div>
      </div> 
))}
    </div>
    
      </>
  )
}

export default Listproducts


