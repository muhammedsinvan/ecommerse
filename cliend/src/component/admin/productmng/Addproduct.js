import React, { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './productmng.css'
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import axios from 'axios';


const Addproduct = () => {

  const navigate = useNavigate();


    const [baseImage1, setBaseImage1] = useState("");
    const [baseImage2, setBaseImage2] = useState("");
    const [baseImage3, setBaseImage3] = useState("");
    const [baseImage4, setBaseImage4] = useState("");

    const [data,setData] = useState([])

    const adminInfo = localStorage.getItem('admintoken')

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo}`,
      },
    };

    useEffect(()=>{
      (async()=>{
        try{
          let res = await axios.get('/admin/getcatagory',config)
          setData(res.data)
        }catch(error){
          console.log(error)
        }
      })()
    },[])

    console.log(data)
 

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
    
      const uploadImage3 = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setBaseImage3(base64);
      };
    
      const uploadImage4 = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setBaseImage4(base64);
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


    const validationSchema = Yup.object().shape({
        name:Yup.string().required('Enter the product name'),
        detail:Yup.string().required('Enter the product detail'),
        material:Yup.string().required('Enter the material'),
        color:Yup.string().required('Enter the color'),
        catagory:Yup.string().required('Select a catagory'),
        pointone:Yup.string().required('Enter feature'),
        pointtwo:Yup.string().required('Enter feature'),
        stock:Yup.string().required('Enter the stock'),
        image1:Yup.mixed()
            .test('required','Uplod the image', value =>{
              return value && value.length;
            }),
        image2:Yup.mixed()
            .test('required','Uplod the image', value =>{
              return value && value.length;
            }),
        image3:Yup.mixed()
            .test('required','Uplod the image', value =>{
              return value && value.length;
            }),
        image4:Yup.mixed()
            .test('required','Uplod the image', value =>{
              return value && value.length;
            }),
        wholesaleprice:Yup.string().required('Enter the wholesale price'),
        retailprice:Yup.string().required('Enter the retail price')
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
            const newproduct={
                name:data.name,
                detail:data.detail,
                material:data.material,
                color:data.color,
                catagory:data.catagory,
                pointone:data.pointone,
                pointtwo:data.pointtwo,
                stock:data.stock,
                image1:baseImage1,
                image2:baseImage2,
                image3:baseImage3,
                image4:baseImage4,
                wholesaleprice:data.wholesaleprice,
                retailprice:data.retailprice
            }
            const res = await axios.post('/admin/addproduct',newproduct)
            if(res.data){
              navigate('/admin/showproduct')
            }
        }catch(err){
            console.log(err)
        }
    };


  return (
    <div className='addproduct-container' >
        <div className='addproduct-box'>
        
            <div className='addproduct-box-title' >
            <div onClick={()=>navigate("/admin/showproduct")} className='addproduct-viewbutton'  >
            <button >View Product</button>
            </div>
                <h1>Add Product</h1>
            </div>
<form onSubmit={handleSubmit(onsubmit)} >
            <div className='addproduct-box-data'>
                <text>Product Name</text>
               <input {...register('name')}/>
               {console.log("error = "+errors.name)}
               {errors.name && <p className='register-error-message'>{errors.name.message}</p>}
            </div>
            <div className='addproduct-box-data'>
                <text>Product Detail</text>
                <input {...register('detail')} />
                {errors.detail && <p className='register-error-message'>{errors.detail.message}</p>}
            </div>
            <div className='addproduct-box-data'>
                <text>Material</text>
                <input {...register('material')}/>
                {errors.material && <p className='register-error-message'>{errors.material.message}</p>}
            </div>
            <div className='addproduct-box-data'>
                <text>Color</text>
                <input  {...register('color')}/>
                {errors.color && <p className='register-error-message'>{errors.color.message}</p>}
            </div>
            <div className='addproduct-box-data'>
                <text>Catagory</text>
                <select className='addproduct-box-data_dropdown' 
                  {...register('catagory')} >
                  {data.map((item)=>(
                    <option value={item.name}>{item.name}</option>
                  ))}
                </select>
                {errors.catagory && <p className='register-error-message'>{errors.catagory.message}</p>}
            </div>   
            <div className='addproduct-box-data'>
                <text>Features 1</text>
                <input {...register('pointone')}/>
                {errors.pointone && <p className='register-error-message'>{errors.pointone.message}</p>}
            </div>

            <div className='addproduct-box-data'>
                <text>Features 2</text>
                <input   {...register('pointtwo')}/>
                {errors.pointtwo && <p className='register-error-message'>{errors.pointtwo.message}</p>}
            </div>

            <div className='addproduct-box-data'>
                <text>Stock</text>
                <input {...register('stock')}/>
                {errors.stock && <p className='register-error-message'>{errors.stock.message}</p>}
            </div>

            <div className='addproduct-box-data'>
                <text>Image 1</text>
                {baseImage1&& <img src={baseImage1} className='addproduct-img' />}
                <input  type='file'  {...register('image1')}  onChange={(e)=>{
                uploadImage1(e);
              }} />
                {errors.image1 && <p className='register-error-message'>{errors.image1.message}</p>}
            </div>
            <div className='addproduct-box-data'>
                <text>Image 2</text>
                {baseImage2&& <img src={baseImage2} className='addproduct-img' />}
                <input type='file'  {...register('image2')}  onChange={(e)=>{
                uploadImage2(e);
              }} />
                {errors.image2 && <p className='register-error-message'>{errors.image2.message}</p>}
            </div>
            <div className='addproduct-box-data'>
                <text>Image 3</text>
                {baseImage3&& <img src={baseImage3} className='addproduct-img' />}
                <input type='file'  {...register('image3')}  onChange={(e)=>{
                uploadImage3(e);
              }} />
                {errors.image3 && <p className='register-error-message'>{errors.image3.message}</p>}
            </div>
            <div className='addproduct-box-data'>
                <text>image 4</text>
                {baseImage4&& <img src={baseImage4} className='addproduct-img' />}
                <input type='file'  {...register('image4')}  onChange={(e)=>{
                uploadImage4(e);
              }} />
                {errors.image4 && <p className='register-error-message'>{errors.image4.message}</p>}
            </div>
            
            <div className='addproduct-box-price'>
            <div className='addproduct-box-data'>
                <text>WholeSale Price</text>
                <input  {...register('wholesaleprice')}/>
                {errors.wholesaleprice && <p className='register-error-message'>{errors.wholesaleprice.message}</p>}
            </div>
            <div className='addproduct-box-data'>
                <text>Retail Price</text>
                <input  {...register('retailprice')}/>
                {errors.retailprice && <p className='register-error-message'>{errors.retailprice.message}</p>}
            </div>
            </div>

            <div className='addproduct-box-button'>
                <button type='submit'>Add Item</button>
            </div>
            </form>
        </div>

     

    </div>
  )
}

export default Addproduct