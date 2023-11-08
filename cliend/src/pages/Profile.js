import React from 'react'
import Profiles from '../component/account/profile/Profile'
import NavBar from '../component/navbar/NavBar'
import Sidebar from '../component/account/sidebar/Sidebar'
import Footer from '../component/footer/Footer'
import './page.css'

const Profile = () => {
  return (
    <div>
        <NavBar />
        <div className='page-container'>
        <Sidebar />
        <Profiles />
        </div>
        <Footer />
     
    </div>
  )
}

export default Profile