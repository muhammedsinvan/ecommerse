import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate,useParams} from 'react-router-dom'
import './bannermng.css'



const Addbannermng = () => {

  const navigate = useNavigate();
  const params = useParams();

  const [title,setTitle] = useState()
  const [detail,setDetail] = useState()
  const [button,setButton] = useState()
  const [url,setUrl] = useState();
  const [image,setImage] = useState()
  const [baseImage,setBaseImage] = useState("")


 
  const adminInfo = localStorage.getItem('admintoken')

  const config = {
    headers: {
      Authorization: `Bearer ${adminInfo}`,
    },
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage(base64);
  };

          
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const addbanner = async () =>{
    try{
      const newbanner = {
        title,
        detail,
        url,
        button,
        image:baseImage
      }
      let res = await axios.post('/admin/addbanner',newbanner)
      if(res) {
        navigate("/admin/showbanner")
      }
    }catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    if(params.id){
      (async()=>{
        try{
          let res = await axios.get(`/admin/getbannerdata/${params.id}`,config)
          setTitle(res.data.title)
          setDetail(res.data.detail)
          setUrl(res.data.url)
          setButton(res.data.button)
          setImage(res.data.image)
        }catch(error){
          console.log(error)
        }
      })()
    }
  },[])

  const updatebanner = async () =>{
    try{
      const newbanner = {
        title,
        detail,
        button,
        image:baseImage
      }

      let res = await axios.post(`/admin/updatebanner/${params.id}`,newbanner)
      if (res){
        navigate('/admin/showbanner')
      }
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className='addbanner-container' >
       
    <div className='addbanner-box'>
    
        <div className='addbanner-box-title'>
        <div onClick={()=>navigate("/admin/showbanner")} className='addbanner-viewbutton'>
        <button>View Banner</button>
        </div>
            <h1>Add Banner</h1>
        </div>

        <div className='addbanner-box-data'>
            <text>Banner Title</text>
            <input value={title} onChange={(e)=> setTitle(e.target.value)} />
        </div>
        <div className='addbanner-box-data'>
            <text>Banner Detail</text>
            <input value={detail} onChange={(e)=> setDetail(e.target.value)} />
        </div>
        <div className='addbanner-box-data'>
            <text>URL</text>
            <input value={url} onChange={(e)=> setUrl(e.target.value)} />
        </div>
        <div className='addbanner-box-data'>
            <text>Button Name</text>
            <input value={button} onChange={(e)=> setButton(e.target.value)} />
        </div>

        <div className='addbanner-box-data'>
            <text>Image 1</text>
            {params.id ? <img className='addbanner-img' src={image} alt="image" /> : <></>}
            <input type='file' onChange={(e)=> {uploadImage(e)}}/>
        </div>

        <div className='addbanner-box-button'>
            {params.id ?<button onClick={updatebanner}>Update Banner</button>
            : <button onClick={addbanner}>Add Banner</button>}
        </div>
        
    </div>

 

</div>
  )
}

export default Addbannermng