import React from 'react'
import NavBar from '../component/navbar/NavBar';
import Footer from '../component/footer/Footer';
import CheckoutSucess from '../component/checkout/checkoutSucess';
const checkoutSuccess = () => {
  return (
    <div>
        <NavBar />
        <CheckoutSucess />
        <Footer />
    </div>
  )
}

export default checkoutSuccess