import React, { useEffect, useState } from 'react';
import './profile.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Editprofile = () => {

  const params = useParams();

  const [username,setUsername]=useState()

  const [email,setEmail] = useState()

  const userid = localStorage.getItem('userid')

  const userInfo = localStorage.getItem('usertoken')

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo}`,
    },
  };
 

  useEffect(()=>{
    (async()=>{
      try{
        let res = await axios.get(`/userdata/${userid}`,config)
        setUsername(res.data.username)
        setEmail(res.data.email)
      }catch(error){
        console.log(error)
      }
    })()
  },[])

  const onSubmit = async ()=>{
    try{
      if(params.data === 'username'){
        const data = await axios.post(`/updateprofile/${userid}`,{username})
        console.log(data)
      }else{
        const data = await axios.post(`/updateprofile/${userid}`,{email})
        console.log(data)
      }
    }catch(error){
      console.log(error)
    }

  }



  return (
    <div className='profile-container'> 
    <div className='profile-box'>
      <h1 className='profile-title'>PROFILE</h1>
      
      <div className='profile-img'>
        <img src='https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png' alt='profileimg'/>
      </div>
        {params.data === 'username' && <div className='profile-field'>
        <div className='profile-field_one'>
      <text >Name</text>
      </div>
      <div className='profile-field_two'>
      <input value={username} onChange={(e)=>{setUsername(e.target.value)}}  />
      </div>
    </div>}

    {params.data === 'email' && <div className='profil 
    e-field'>
    <div className='profile-field_one'>
      <text >Email</text>
      </div>
      <div className='profile-field_two'>
      <input value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
      </div>
    </div>}




<div className='profile-submit_btn'>
<button onClick={onSubmit} >
  Submit
 </button>
</div>
    
    </div>
    
    </div>
  )
}

export default Editprofile