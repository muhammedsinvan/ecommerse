import React from 'react'
import NavBar from '../component/navbar/NavBar'
import Footer from '../component/footer/Footer'
import Sidebar from '../component/account/sidebar/Sidebar'
import Editprofiles from '../component/account/profile/Editprofile'

const Editprofile = () => {
  return (
    <div>
        <NavBar />
        <div className='page-container'>
            <Sidebar />
            <Editprofiles />
        </div>
        <Footer />
    </div>
  )
}

export default Editprofile