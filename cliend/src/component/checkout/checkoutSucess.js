import React from 'react'
import './Checkout.css';
import { useNavigate } from 'react-router-dom';

const CheckoutSucess = () => {
    const navigate = useNavigate();
  return (
    <div className='checksucces-maincontainer'>
        <div className='checksucces-container'>
        <iframe className='checksucces-animation'
     src="https://lottie.host/?file=3ef9f74c-506d-46c0-8dbc-a5a06b83a34b/9Rp5VlQeg9.json"></iframe>
        <h1>Thanks for shopping with us</h1>
        <button onClick={(()=> navigate('/'))}>BACK TO SHOPPING</button>
        </div>
 
       
    </div>
  )
}

export default CheckoutSucess