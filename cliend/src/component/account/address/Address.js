import React, {useEffect,useState} from 'react'
import './address.css'
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Address = () => {

  const navigate = useNavigate();

  const userid = localStorage.getItem('userid')

  const [address,setAddress] = useState([])

  const [refresh,setRefresh] = useState(false)

  const userInfo = localStorage.getItem('usertoken')

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo}`,
    },
  };
 


  useEffect(()=>{
    (async()=>{
      try{
        let res = await axios.get(`/getshippingaddress/${userid}`,config)
        setAddress(res.data)
      }catch(error){
        console.log(error)
      }
    })()
  },[refresh])

  const removeaddress = async (addressid)=>{
    try{
      let res = await axios.post(`/removeaddress/${userid}`,{addressid})
      setRefresh(!refresh)
    }catch(error){
      console.log(error)
    }
  }

  const Editaddress = (addressid) =>{
    navigate(`/accounts/address/add/${addressid}`)
  }


  return (
    <div className='address-container'>
        <div className='address-box'>
            <h1 className='address-title'>ADDRESS</h1>
<div className='address-addnewaddress' onClick={()=>navigate('/accounts/address/add')}>
<AddIcon />
<text>ADD A NEW ADDRESS</text>  
</div>
{address?.map((item)=>(
<div className='address-oneaddress'>
  <div className='address-dsc'> 
  <div className='address-personal'>
  <text>{item?.name}</text>
<text>{item?.mobile}</text>
</div>
<div className='address-info'>
<text> {item?.buildingname},</text>
<text>{item?.locality},</text>
<text>{item?.district},</text>
<text>{item?.state}</text>-
<text>{item?.pin}</text> 
</div>
  </div>
<div className='address-btn'>
  <button value={item?._id} onClick={e => Editaddress(e.target.value)} >Edit</button>
  <button value={item?._id} onClick={e => removeaddress(e.target.value)}>Delete</button>
</div>
</div>
))}
        </div>
    </div>
  )
}

export default Address