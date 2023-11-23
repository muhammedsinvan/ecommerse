import React, { useEffect, useState } from 'react'
import './Forgetpassword.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Forgetpassword = () => {

    const navigate = useNavigate();

    const [email,setEmail] = useState('');
    const [error,setError] = useState('');
    const [minutes, setMinutes] = useState();
    const [seconds, setSeconds] = useState();
    const [buttons,setButtons] = useState(false);
    const [message,setMessage] = useState('')

    useEffect(() => {
      const interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
  
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            setButtons(false);
            setMessage("")
          } else {
            setSeconds(59);
            setMinutes(minutes - 1);
          }
        }
      }, 1000);
  
      return () => {
        clearInterval(interval);
      };
    }, [seconds]);
  
    const resendOTP = () => {
      setMinutes(1);
      setSeconds(59);
    };

    const validateEmail = async(email) => {
      setError('')
      if(email){
        var reg= /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        var result= reg.test(email);
       if(result === true){
        try{
          let res = await axios.post('/api/checkmail',{email})
          if(res.data){
            if(res.data){
              setButtons(true)
              resendOTP()
              setMessage('Email sended successfully !!')
            }
          }
        }catch(error){
          setError(error.response.data)
        }

       }else{
        setError("Enter valid email")
       }
      }else{
        setError("Enter your registerd email")
      }
    };

  return (
    <>
    <div className="container">
      <div className="card">
         <div className="form">
            <div className="left-side">
              <div className='left-side-text'>
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button onClick={()=> navigate('/signup')}>
                SIGN UP
              </button>
              </div>
                    
            </div>
            <div className="right-side">
                    <div className="heading">
                        <h3>Reset Your Password</h3>
                        <p>Welcome Back! login with your data that you entered during registration.</p>
                    </div>
                      {error && <p className='email-error'>{error}</p>}
                      {message&&<p className='email-successmessage'>{message}</p>}
                    <div className="input-text">
                        <input type="text" className='wemail' value={email} onChange={(e)=>setEmail(e.target.value)}  />
                        <label>Email</label>
                        <i className="fa fa-envelope"></i>
                        {/* {errors.email && <p className='register-error-message'>{errors.email.message}</p>} */}
                    </div>
                    {buttons ?<p className='forget-timmer'>
              Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
              {seconds < 10 ? `0${seconds}` : seconds}
            </p> : <></>}
                    <div className="button">
                        {buttons ?<button  className='forger-click'>SEND EMAIL</button>:<button  onClick={()=>validateEmail(email)}>SEND EMAIL</button>}
                        
                    </div>
                     
                    <div className="register">
                        <p onClick={()=>navigate('/signup')}>Didn't have an account?<text > Register</text></p>
                    </div>
               </div>
            </div>
        </div>
    </div>
    
          
    </>
  )
}

export default Forgetpassword