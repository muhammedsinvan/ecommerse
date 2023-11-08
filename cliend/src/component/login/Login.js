import React from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Login = () => {

    const navigate = useNavigate();

  const{useState}=React;
    
  const[eye,seteye]=useState(true);
  const[inpass,setinpass]=useState("password");
  const[tick,settick]=useState(false);
  const[errorMessage,setErrorMessage] = useState('')
  
  

const Eye=()=>{
   if(inpass=="password"){
       setinpass("text");
       seteye(false); 
   }
   else{
       setinpass("password");
       seteye(true);  
   }
}

const Tick=()=>{
 
  if(tick){
      settick(false);
  }
  else{
      settick(true);
  }
}

const validationSchema = Yup.object().shape({
    email:Yup.string().required('Enter your email').email('Enter correct email'),
    password:Yup.string().required('Enter your password')
    .min(6,'Password must be atleast 6 characters')
    .max(8, 'Password must not exceed 8 characters')
  }).required()

  const {
    register,
    handleSubmit, 
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  }
  );

 
  const onsubmit = async(data) => {
    try{
       let res = await axios.post("/signin",data)
       console.log(res)
       localStorage.setItem('usertoken',res.data.jsontoken)
       localStorage.setItem('userid',res.data._id)
       setErrorMessage('')
       navigate('/')
    }catch(error){
      setErrorMessage(error.response.data)
    }
};

console.log(errorMessage)

  
  
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
                {/* <img src="https://imgur.com/K230JeW.jpg"/> */}
    
                    
            </div>
            <div className="right-side">
                    <div className="heading">
                        <h3>Log in to VERDEELIFE.</h3>
                        <p>Welcome Back! login with your data that you entered during registration.</p>
                    </div>
                    <form onSubmit={handleSubmit(onsubmit)} >
                      <p className='signin-error'>{errorMessage}</p>
                    <div className="input-text">
                        <input type="text" className='wemail' {...register('email')}  />
                        <label>Email</label>
                        <i className="fa fa-envelope"></i>
                        {errors.email && <p className='register-error-message'>{errors.email.message}</p>}
                    </div>
                    <div className="input-text">
                        <input type={inpass} className='wpassword' {...register('password')} />
                        <label>Password</label>
                        <i className="fa fa-lock"></i>
                        <i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye"}`}></i>
                        {errors.password && <p className='register-error-message'>{errors.password.message}</p>}
                    </div>
                   
                    <div className="rem_pass">
                        <div className="remember">
                             <span onClick={Tick} className={` ${tick ? "green" : ""}`}><i className="fa fa-check"></i></span>
                             <p>Remember Me</p>
                        </div>
                        <a href="#">Forgot your password?</a>
                    </div>
                    <div className="button">
                        <button type="submit">Login</button>
                        
                    </div>
                     </form>
                    <div className="register">
                        <p onClick={()=>navigate('/signup')}>Didn't have an account?<a href="#"> Register</a></p>
                    </div>
    
                
    
               </div>
            </div>
        </div>
    </div>
    
          
    </>
  )
}

export default Login    