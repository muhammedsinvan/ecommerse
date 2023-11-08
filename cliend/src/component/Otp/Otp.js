import React from 'react'
import './otp.css'



const Otp = () => {



  return (
    <div className="container">
    <div className="card">
       <div className="form">
          <div className="left-side">
            <div className='left-side-text'>
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            
            </div>
              {/* <img src="https://imgur.com/K230JeW.jpg"/> */}
  
                  
          </div>
          <div className="right-side">
                  <div className="heading">
                      <h3>Log in to VERDEELIFE.</h3>
                      <p>Welcome Back! login with your data that you entered during registration.</p>
                  </div>
                
                  <div  className='otp-field' >
        <input type="text" maxLength="1" />
        <input type="text" maxLength="1" />
        <input type="text" maxLength="1"  />
        <input type="text" maxLength="1"  />
        
    </div>
              
  
             </div>
          </div>
      </div>
  </div>
  
  )
}

export default Otp


