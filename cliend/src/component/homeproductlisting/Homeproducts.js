import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import './Homeproduct.css';
import { useNavigate } from 'react-router-dom';

const Homeproducts = () => {

  const [data,setData] = useState([])
  const [cartdata,setCartdata] = useState()
  const navigate = useNavigate();
  const messagesEndRef = useRef();

  const [refresh,setRefresh] = useState(false)

  const [error,setError] = useState(false)

  const user = localStorage.getItem('userid')

  const userInfo = localStorage.getItem('usertoken')

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo}`,
    },
  };
 

  useEffect(()=>{
    (async()=>{
      let res = await axios.get('/getsortedproduct')
      setData(res.data)
    })()
  },[])

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

const scrollToBottom = () => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
}


useEffect(() => {
  scrollToBottom()
}, [error]);

  function getproductdetail(id){
    navigate(`/productdetail/${id}`)
  }

  const addtocart =async(productid)=>{
    const qty = 1;
   
    try{
      if(user){
        let res = await axios.post(`/addtocart/${user}/${qty}`,{productid});
        setRefresh(!refresh)
      }else{
        alert();
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
    <div className='homeproducts-box-container'>
      
      {data?.map((item)=>(
  <div className='homeproducts-box'>
        <div className='homeproducts-img-container'>
        <img className='homeproducts-img' src={item.image1} onClick={e=> getproductdetail(item._id)}  alt='img' />
        </div>
        <div className='homeproducts-text-box'>
          <h2 className='homeproducts-text-box-title'>{item.name}</h2>
          <div className='homeproducts-text-box-price'>
          <h3 className='homeproducts-text-box-retialprice'>₹{item.retailprice}</h3>
           {/* <h3 className='homeproducts-text-box-discountprice'>₹{item.discountprice}</h3> */}
          </div>
          <div className='homeproducts-text-box-btn'>
           {cartdata&&cartdata.some(cartitem => cartitem.itemid==item._id)?
          <button className='homeproducts-text-box-gotocrtbtn'  value={item._id}  onClick={gotocart} >Go To Cart</button>: 
                <button className='homeproducts-text-box-crtbtn'  value={item._id}  onClick={e=>addtocart(e.target.value)} >Add To Cart</button>  }
               
       
        
          <button className='homeproducts-text-box-buybtn' value={item._id} onClick={e=> getproductdetail(e.target.value)}  >Buy Now</button>
          </div>
        </div>
      </div>
))}
    </div>
    </>
  )
}

export default Homeproducts
