import React from 'react'
import NavBar from '../component/navbar/NavBar'
import Footer from '../component/footer/Footer'
import Productlisting from '../component/productlisting/Productlisting'

const Productlist = () => {
  return (
    <div>
        <NavBar />
        <Productlisting />
        <Footer />
    </div>
  )
}

export default Productlist