import React from 'react'
import './Productlisting.css'
import Listproducts from './Listproducts'


const Productlisting = () => {
  return (
    <div className='products-container'>
       <div className='products-banner'> 
       <img className='products-banner-img' src='https://cpimg.tistatic.com/133394/4/template_photo_2.jpg' alt='bannerimg'/>

        </div>

<Listproducts /> 
      

    </div>
  )
}

export default Productlisting