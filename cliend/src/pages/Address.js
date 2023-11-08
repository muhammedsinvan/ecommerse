import React from 'react'
import NavBar from '../component/navbar/NavBar'
import Sidebar from '../component/account/sidebar/Sidebar'
import Footer from '../component/footer/Footer'
import Addresss from '../component/account/address/Address'

const Address = () => {
  return (
    <div>
        <NavBar />
        <div className='page-container'>
        <Sidebar />
        <Addresss />
        </div>
        <Footer />
    </div>
  )
}

export default Address