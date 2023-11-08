import React, { useEffect, useRef, useState } from 'react';
import './productdetail.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Productdetail = () => {

  const params = useParams();
  const messagesEndRef = useRef();
  const navigate = useNavigate();

  const [detail,setDetail] = useState({})
  const [viewimage,setViewimage] = useState()
  const [cartdata,setCartdata] = useState()
  const [error,setError] = useState(false)
  const [refresh,setRefresh] = useState(false)

  const user = localStorage.getItem('userid')

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
        let res = await axios.get(`/getproductdetail/${params.id}`);
        setDetail(res.data)
        setViewimage(res.data.image1)
      }catch(error){
        console.log(error)
      }
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


  function gotocart(){
    navigate('/cart')
  }

  const addtocart =async(productid,type)=>{
    const qty = 1;
    console.log(type)
    try{
      if(user){
        let res = await axios.post(`/addtocart/${user}/${qty}`,{productid})
        console.log(res)
        if(type=='cart'){
          setRefresh(!refresh)
        }else{
          navigate('/cart')
        }
        
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



  return (
    <>
    {error&&
      <div ref={messagesEndRef} className='products-box-error-detail'>
      <p>Please make login</p>
      </div>
      }

    <div className='productdetail-container'>
      {/* web view */}
      <div className='productdetail-image-container'>
        <div className='productdetail-image-container-list'>
<img onClick={e => setViewimage(e.target.src)} src={detail.image1} alt='img1'/>
<img onClick={e => setViewimage(e.target.src)} src={detail.image2}  alt='img2'/>
<img onClick={e => setViewimage(e.target.src)} src={detail.image3}  alt='img3'/>
<img onClick={e => setViewimage(e.target.src)} src={detail.image4}  alt='img4'/>
        </div>
        <div className='productdetail-image-container-view'>
<img src={viewimage}  alt='viewimg'/>
        </div>
      </div>

{/* mobile view */}
      <div className='productdetail-image-container-mb'>

      <div className='productdetail-image-container-view-mb'>
<img src={viewimage}  alt='viewimg'/>
        </div>
        <div className='productdetail-image-container-list-mb'>
<img onClick={e => setViewimage(e.target.src)} src={detail.image1} alt='img1'/>
<img   onClick={e => setViewimage(e.target.src)} src={detail.image2}  alt='img2'/>
<img onClick={e => setViewimage(e.target.src)} src={detail.image3}  alt='img3'/>
<img onClick={e => setViewimage(e.target.src)} src={detail.image4}  alt='img4'/>
        </div>

      </div>
      <div className='productdetail-desc-container'>
        <p className='productdetail-desc-container-title'>{detail.name}</p>
        <div className='productdetail-desc-container-price'>
        <p className='productdetail-desc-container-retailprice'>₹ {detail.retailprice}</p>
        {/* <p className='productdetail-desc-container-discountprice'>${detail.discountprice}</p> */}
        </div>
       
        <p className='productdetail-desc-container-text'>{detail.detail}</p>
        <ul className='productdetail-desc-container-points'>
          <li>{detail.pointone}</li>
          <li>{detail.pointtwo}</li>
        </ul>
        <div className='productdetail-desc-container-button'>
          {cartdata&&cartdata.some(cartitem=>cartitem?.itemid==detail?._id)?
          <button className='productdetail-desc-container-buynow' value={detail._id} onClick={gotocart} >BUY NOW</button>:
          <button className='productdetail-desc-container-buynow' value={detail._id} onClick={e=>addtocart(e.target.value,'buy')}>BUY NOW</button>}
          {cartdata&&cartdata.some(cartitem=>cartitem?.itemid==detail?._id)? 
          <button className='productdetail-desc-container-addcart'value={detail._id} onClick={gotocart}>GO TO CART</button>:
           <button className='productdetail-desc-container-addcart'value={detail._id} onClick={e=>addtocart(e.target.value,'cart')}>ADD TO CART</button>}

        </div>
      </div>
    </div>
    </>
  )
}

export default Productdetail