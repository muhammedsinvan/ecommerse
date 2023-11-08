import React, { useEffect } from 'react'
import './navbar.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const { useState } = React

const Navbar = () => {

    const [isOpen, setIsopen] = useState(false);

    const ToggleSidebar = () => {
        isOpen === true ? setIsopen(false) : setIsopen(true);
    }

    const navigate = useNavigate();


    const logout =()=>{
        localStorage.removeItem('admintoken')
        navigate('/admin')
    }

    const adminInfo = localStorage.getItem('admintoken')

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo}`,
      },
    };
  

    useEffect(()=>{
        (async()=>{
          try{
            let res = await axios.get('/checktoken',config)
          }catch(error){
            localStorage.removeItem('admintoken')
            navigate('/admin')
          }
        })()
        
      })
    
   
    
  return (
    <>
    <div className="container-fluid mt-3">
        <div className='nav-container'>
            { isOpen ? <></>:<nav className="navbar navbar-expand-lg navbar-light bg-white shadow-md">
                <div className="container-fluid p-2">
                    <a className="navbar-brand text-primary mr-0">VERDEELIFE</a>
                    <div className="form-inline ml-auto">
                        <div className="btn btn-primary" onClick={ToggleSidebar} >
                            <i className="fa fa-bars"></i>
                        </div>
                    </div>
                </div>
            </nav>}
            </div>
            <div className={`sidebar ${isOpen == true ? 'active' : ''}`}>
                <div className="sd-header">
                    <h4 className="mb-0">VERDEELIFE</h4>
                    <div className="btn btn-primary" onClick={ToggleSidebar}><i className="fa fa-times"></i></div>
                </div>
                <div className="sd-body">
                    <ul>
                        <li onClick={() => navigate("/admin/usermanagment")}><a className="sd-link">User Managment</a></li>
                        <li onClick={()=> navigate("/admin/showproduct")}><a className="sd-link">Product Managment</a></li>
                        <li onClick={()=> navigate("/admin/showcatagory")}><a className="sd-link">Catagory Management</a></li>
                        <li onClick={()=> navigate("/admin/showbanner")}><a className="sd-link">Banner Management</a></li>
                        <li onClick={()=> navigate("/admin/orders")}><a className="sd-link">Order Management</a></li>
                        <li><a className="sd-link">Sales Report</a></li>
                        <li><a className="sd-link">Admin Management</a></li>
                        <li onClick={logout}><a className="sd-link">Logout</a></li>
                    </ul>
                </div>
            </div>
            <div className={`sidebar-overlay ${isOpen == true ? 'active' : ''}`} onClick={ToggleSidebar}></div>
   </div>
   
</>
  )
}

export default Navbar