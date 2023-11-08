import React from 'react'
import NavBar from '../component/navbar/NavBar'
import Footer from '../component/footer/Footer'
import Sidebar from '../component/account/sidebar/Sidebar'
import Orderss from '../component/account/orders/Orders'

const Orders = () => {
  return (
    <div>
         <NavBar />
        <div className='page-container'>
            <Sidebar />
            <Orderss />
        </div>
        <Footer />
    </div>
  )
}

export default Orders