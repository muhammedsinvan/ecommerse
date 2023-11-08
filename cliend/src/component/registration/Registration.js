import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import './registration.css';
import axios from 'axios';

const Registration = () => {

  const navigate = useNavigate();

  const [passwordEye,setPasswordEye] =useState(true); 
  const [typePassword,setTypePassword] = useState('password')
  const [errormessage,setError] = useState('')

  const Eye =()=>{
    if(typePassword == 'password'){
      setTypePassword('Text')
      setPasswordEye(false)
    }else{
      setTypePassword('password')
      setPasswordEye(true)
    }
  }

  const validationSchema = Yup.object().shape({
    username:Yup.string().required('Enter your name'),
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
  });


   const onsubmit = async(data) => {
    try{
       await axios.post("/signup",data)
      navigate('/signin')
    }catch(error){
      setError(error.response.data)
    }
};


  return (
    <>
    <div className="container">
      <div className="card">
         <div className="form">
            <div className="left-side">
              <div className='left-side-text'>
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info.</p>
              <button onClick={()=>navigate('/signin')}>
                SIGN IN
              </button>
              </div>

    
                    
            </div>
            <div className="right-side">
                    <div className="heading">
                        <h3>start journey with VERDEELIFE.</h3>
                        <p>Welcome to VERDEELIFE! Register with your personal data.</p>
                    </div> 
                    <form  onSubmit={handleSubmit(onsubmit)} >
                    <div className='registration-error'>{errormessage}</div>
                    <div className="input-text">
                        <input type="text" className='wusername'
                          {...register('username')}/>
                        <label>User Name</label>
                        <i className="fa fa-user"></i>
                        {errors.username && <p className='register-error-message'>{errors.username.message}</p>}

                    </div>
                    <div className="input-text">
                        <input type="text" className='wemail'
                        
                        {...register('email')}/>
                        <label>Email</label>
                        <i className="fa fa-envelope"></i>
                        {errors.email && <p className='register-error-message'>{errors.email.message}</p>}
                    </div>
                    
                    <div className="input-text">
                        <input type={typePassword} className='wpassword'
                        {...register('password')} />
                        <label>Password</label>
                        <i className="fa fa-lock"></i>
                        <i onClick={Eye} className={`fa ${passwordEye ? "fa-eye-slash" : "fa-eye"}`}></i>
                        {errors.password && <p className='register-error-message'>{errors.password.message}</p>}
                    </div>
                   
                    <div className="button">
                        <button type="submit">signup</button>
                        
                    </div>
                     </form>
                    <div className="register">
                        <p onClick={()=>navigate('/signin')}>Already have an account?<a href="#"> Login</a></p>
                    </div>
    
               </div>
            </div>
        </div>
    </div>
    
          
    </>
  )
}

export default Registration