import React, { useEffect, useState } from 'react'
import './profile.css'
// import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {

  const navigate = useNavigate()

  const [data,setData]=useState({})

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
        setData(res.data)
      }catch(error){
        console.log(error)
      }
    })()
  },[])

  console.log(data)

  return (
    <div className='profile-container'> 
    <div className='profile-box'>
      <h1 className='profile-title'>PROFILE</h1>
      
      <div className='profile-img'>
        <img src='https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png' alt='profileimg'/>
      </div>
        <div className='profile-field'>
        <div className='profile-field_one'>
      <text >Name</text>
      </div>
      <div className='profile-field_two'>
      <text >{data?.username}</text>
      </div>
      {/* <div className='profile-field_three'>
      <button onClick={()=> navigate(`/accounts/profile/editprofile/${"username"}`)} >Change</button>
      </div> */}
    </div>

    <div className='profile-field'>
    <div className='profile-field_one'>
      <text >Email</text>
      </div>
      <div className='profile-field_two'>
      <text >{data?.email}</text>
      </div>
      {/* <div className='profile-field_three'>
      <button onClick={()=> navigate(`/accounts/profile/editprofile/${"email"}`)} >Change</button>
      </div> */}
    </div>

    {/* <div className='profile-field'>
    <div className='profile-field_one'>
      <text >Number</text>
      </div>
      <div className='profile-field_two'>
      <text >6238454944</text>
      </div>
    </div>


     <div className='profile-field'>
     <div className='profile-field_one'>
      <text >Gender</text>
      </div>
      <div className='profile-field_two'>
      <text >Male</text>
      </div>
    </div> */}
{/* <div className='profile-edit_btn'>
<button onClick={()=> navigate('/accounts/profile/editprofile')}>
 
  Edit
  <EditIcon /> </button>
</div>
     */}



    


    </div>
    
    </div>
  )
}

export default Profile