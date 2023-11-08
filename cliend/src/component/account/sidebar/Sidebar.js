import React from 'react'
import './sidebar.css'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {

    const navigate = useNavigate()

    const logout =()=>{
      localStorage.removeItem('usertoken')
      localStorage.removeItem('userid')
      navigate('/')
     }

  return (
    <div className='sidebar-container'>
        <div className='sidebar-box'>
            <text className='sidebar-title'>MY ACCOUNT</text>
            <div className='sidebar-desc'>
                <text onClick={()=>navigate('/accounts/profile')}>Profile</text>
                <text onClick={()=>navigate('/accounts/orders')}>Orders</text>
                <text onClick={()=>navigate('/accounts/address')}>Address</text>
                <text onClick={logout}>Logout</text>
            </div>
        </div>
    </div>
  )
}

export default Sidebar