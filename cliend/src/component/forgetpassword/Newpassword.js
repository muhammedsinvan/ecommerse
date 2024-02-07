import axios from '../../axios';
import React, {useState} from 'react'
import { useNavigate,useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';

const Newpassword = () => {

    const {id,token} = useParams();

    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        password:Yup.string().required('Enter your password')
        .min(6,'Password must be atleast 6 characters')
        .max(8, 'Password must not exceed 8 characters'),
        confirmpassword:Yup.string().required('Enter your confirm password').oneOf([Yup.ref('password'), null], 'Passwords must match')
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
           let res = await axios.post(`/api/newpassword/${id}/${token}`,{data});
          console.log(res.data)
          navigate('/signin')
       }catch(error){
        console.log(error.response)
       }
    };

    const[eye1,seteye1]=useState(true);
    const[inpass1,setinpass1]=useState("password");

    const Eye1=()=>{
        if(inpass1=="password"){
            setinpass1("text");
            seteye1(false); 
        }
        else{
            setinpass1("password");
            seteye1(true);  
        }
     }

     const[eye2,seteye2]=useState(true);
     const[inpass2,setinpass2]=useState("password");
 
     const Eye2=()=>{
         if(inpass2=="password"){
             setinpass2("text");
             seteye2(false); 
         }
         else{
             setinpass2("password");
             seteye2(true);  
         }
      }


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
                    <form onSubmit={handleSubmit(onsubmit)} >
                      {/* <p className='signin-error'>{errorMessage}</p> */}
                      <div className="input-text">
                        <input type={inpass1} className='wpassword'  {...register('password')}   />
                        <label>Password</label>
                        <i className="fa fa-lock"></i>
                        <i onClick={Eye1} className={`fa ${eye1 ? "fa-eye-slash" : "fa-eye"}`}></i>
                        {errors.password && <p className='password-error'>{errors.password.message}</p>}
                    </div>  
                    <div className="input-text">
                        <input type={inpass2} className='wpassword'  {...register('confirmpassword')}   />
                        <label>Confirm Password</label>
                        <i className="fa fa-lock"></i>
                        <i onClick={Eye2} className={`fa ${eye2 ? "fa-eye-slash" : "fa-eye"}`}></i>
                        {errors.confirmpassword && <p className='password-error'>{errors.confirmpassword.message}</p>}
                    </div>
                    <div className="button">
                        <button type="submit">UPDATE</button>
                        
                    </div>
                     </form>
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

export default Newpassword