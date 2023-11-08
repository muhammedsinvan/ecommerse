import axios from 'axios'
import React,{useEffect, useState} from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import './catagorymng.css'


const Addcatagorymng = () => {

    const [catagoryName,setCatagoryName] = useState()
    const [catagoryButton,setCatagoryButton] = useState()
    const [image,setImage] = useState()
    const [baseImage1, setBaseImage1] = useState("");

    const navigate = useNavigate();
    const params = useParams();

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setBaseImage1(base64);
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
                button:catagoryButton,
                image:baseImage1
            }

            let res = await axios.post('/admin/addcatagory',newcatagory)
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
            button:catagoryButton,
            image:baseImage1
        }

        let res = await axios.post(`/admin/updatecatagory/${params.id}`,newcatagory)
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
              let res = await axios.get(`/admin/catagorydata/${params.id}`)
              setCatagoryName(res.data.name)
              setCatagoryButton(res.data.button)
              setImage(res.data.image)
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
            <text>Button Name</text>
            <input value={catagoryButton} onChange={(e)=>setCatagoryButton(e.target.value)} />
        </div>

        <div className='addcatagory-box-data'>
            <text>Image 1</text>
            {params.id?<img className='addcatagory-img' src={image} alt='image' /> : <></>}
            <input type='file' onChange={(e)=>{uploadImage(e)}} />
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