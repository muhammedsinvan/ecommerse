import React from 'react'
import NavBar from '../component/navbar/NavBar'
import Footer from '../component/footer/Footer'
import Sidebar from '../component/account/sidebar/Sidebar'
import Orderdetails from '../component/account/orders/Orderdetail'

const Orderdetail = () => {
  return (
    <div>
    <NavBar />
   <div className='page-container'>
       <Sidebar />
       <Orderdetails />
   </div>
   <Footer />
</div>
  )
}

export default Orderdetail