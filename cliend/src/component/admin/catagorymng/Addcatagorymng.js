import axios from '../../../axios';
import React,{useEffect, useState} from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import './catagorymng.css'


const Addcatagorymng = () => {

    const [catagoryName,setCatagoryName] = useState()
    const [image,setImage] = useState()
    const [catbanner,setCatbanner] = useState()
    const [baseImage1, setBaseImage1] = useState("");
    const [baseImage2, setBaseImage2] = useState("");

    const navigate = useNavigate();
    const params = useParams();

    const uploadImage1 = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setBaseImage1(base64);
      };

      const uploadImage2 = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setBaseImage2(base64);
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

      
      const addcatagory = async() =>{
        try{
            const newcatagory = {
                name:catagoryName,
                image:baseImage1,
                catbanner:baseImage2
            }

            let res = await axios.post('/api/admin/addcatagory',newcatagory)
            if(res){
              navigate('/admin/showcatagory')
            }
        }catch(error){
            console.log(error)
        }
      }

      const updatecatagory = async() =>{
        try{
          const newcatagory = {
            name:catagoryName,
            image:baseImage1,
            catbanner:baseImage2
        }

        let res = await axios.post(`/api/admin/updatecatagory/${params.id}`,newcatagory)
        if(res){
          navigate('/admin/showcatagory')
        }
        }catch(error){
          console.log(error)
        }
      }

      useEffect(() => {
        if(params.id){
          (async()=>{
            try{
              let res = await axios.get(`/api/admin/catagorydata/${params.id}`)
              setCatagoryName(res.data.name)
              setImage(res.data.image)
              setCatbanner(res.data.catbanner)
            }catch(error){
              console.log(error)
            }
          })()
        }
      }, [])
      

      


  return (
    <div className='addcatagory-container' >
       
    <div className='addcatagory-box' >
      
    
        <div className='addcatagory-box-title'>
        <div onClick={()=>navigate("/admin/showcatagory")} className='addcatagory-viewbutton'  >
        <button>View Catagory</button>
        </div>
            <h1>Add Catagory</h1>
        </div>

        <div className='addcatagory-box-data'>
            <text>Catagory Name</text>
            <input value={catagoryName} onChange={(e)=>setCatagoryName(e.target.value)} />
        </div>

        <div className='addcatagory-box-data'>
            <text>Image</text>
            {baseImage1?<img className='addcatagory-img' src={baseImage1} alt='image' /> : <img className='addcatagory-img' src={image} alt='image' />}
            <input type='file' onChange={(e)=>{uploadImage1(e)}} />
        </div>
        <div className='addcatagory-box-data'>
            <text>Catagory Banner</text>
            {baseImage2?<img className='addcatagory-img' src={baseImage2} alt='image' /> : <img className='addcatagory-img' src={catbanner} alt='image' />}
            <input type='file' onChange={(e)=>{uploadImage2(e)}} />
        </div>

        <div className='addcatagory-box-button'>
            {params.id ? <button onClick={updatecatagory}>Update Catagory</button> 
            :<button onClick={addcatagory}>Add Catagory</button>}
        </div>
        
    </div>

 

</div>
  )
}

export default Addcatagorymng