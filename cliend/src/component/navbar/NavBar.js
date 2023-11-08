import React, {useEffect, useState} from 'react'
import './Navebar.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';



const NavBar = () => {

  const navigate = useNavigate();

  const [togglemenu,setTogglemenu] = useState(false)
  const [token,setToken] = useState()

  const userInfo = localStorage.getItem('usertoken')

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo}`,
    },
  };


  function togglebutton(){
    if(togglemenu == false){
      setTogglemenu(true)
    }else{
      setTogglemenu(false)
    }
  }
 
  useEffect(()=>{
    (async()=>{
      try{
        let res = await axios.get('/checktoken',config)
        setToken(localStorage.getItem('usertoken'))
      }catch(error){
        localStorage.removeItem('usertoken')
        localStorage.removeItem('userid')
        setToken()
      }
    })()
    
  })


   const logout =()=>{
    localStorage.removeItem('usertoken')
    localStorage.removeItem('userid')
    setToken()
    navigate('/')
   }

   const gotocart = () =>{
    navigate('/cart')
   }

   const gotoaccount = () =>{
    navigate('/accounts/profile')
   }

  return (  
    <div className='navbar-container'>
    <nav className="navbar-user">
    <div className="brand-title">VERDEELIFE</div>
    <a href="#" onClick={togglebutton} class="toggle-button">
      <span className="bar"></span>
      <span className="bar"></span>
      <span className="bar"></span>
    </a>
   { togglemenu ? <div className="navbar-links active">
      <ul>
      <li  onClick={()=>navigate('/')}><p>Home</p></li>
      {/* <li><p>Contact</p></li>
        <li><p>About</p></li> */}
         {token ?<>
          <li onClick={gotoaccount}><p>Account</p></li> 
          <li onClick={gotocart}><p>Cart</p></li> 
         <li onClick={logout}><p>Logout</p></li> 
         </>
       

         :<>
        <li onClick={()=>navigate('/signin')}><p>Sign In</p></li>
        <li onClick={()=>navigate('/signup')}><p>Sign Up</p></li>
        </>}

        
      </ul>
    </div> : <div className="navbar-links">
      <ul>
        <li onClick={()=>navigate('/')}><p>Home</p></li>
        {/* <li><p>About</p></li>
        <li><p>Contact</p></li> */}
        {token ?<>
          <li onClick={gotoaccount}><p>Account</p></li>
          <li onClick={gotocart}><p>Cart</p></li> 
         <li onClick={logout}><p>Logout</p></li> 
         </> :<>
        <li onClick={()=>navigate('/signin')}><p>Sign In</p></li>
        <li onClick={()=>navigate('/signup')}><p>Sign Up</p></li>
        </>}
    
      </ul>
    </div>}
  </nav>
  </div>
  )
}

export default NavBar




