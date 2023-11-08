import React from 'react'
import Addressform from '../component/account/address/Addressform'
import NavBar from '../component/navbar/NavBar'
import Sidebar from '../component/account/sidebar/Sidebar'
import Footer from '../component/footer/Footer'

const AddEditaddress = () => {
  return (
    <div>
        <NavBar />
        <div className='page-container'>
        <Sidebar />
        <Addressform />
        </div>
        <Footer />
    </div>
  )
}

export default AddEditaddress