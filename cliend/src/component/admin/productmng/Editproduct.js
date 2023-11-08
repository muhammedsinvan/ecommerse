import React, {useEffect, useState} from 'react'
import './productmng.css'
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'
import {useFormik} from 'formik';
import * as Yup from 'yup';

const Editproduct = () => {

  const params = useParams();
  const navigate = useNavigate();

  const [data,setData] = useState({})


  const [baseImage1, setBaseImage1] = useState("");
  const [baseImage2, setBaseImage2] = useState("");
  const [baseImage3, setBaseImage3] = useState("");
  const [baseImage4, setBaseImage4] = useState("");
  

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


  useEffect(()=>{
        (async()=>{
          try{
            let data = await axios.get(`/admin/productdata/${params.id}`)
            setData(data.data)
            
          }catch(error){
            console.log(error)
          }
        })()
  },[])

 const validationSchemas = Yup.object({
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
    retailprice:Yup.string().required('Enter the retail price'),
  }).required()

  const { handleSubmit, errors, getFieldProps } = useFormik({
    initialValues: {
      name:data.name,
                detail:data.detail,
                material:data.material,
                color:data.color,
                catagory:data.catagory,
                pointone:data.pointone,
                pointtwo:data.pointtwo,
                stock:data.stock,
                image1:data.image1,
                image2:data.image2,
                image3:data.image3,
                image4:data.image4, 
                wholesaleprice:data.wholesaleprice,
                retailprice:data.retailprice
    },
    enableReinitialize: true,
    validationSchema: validationSchemas,
  
  onSubmit: values => {
    (async()=>{
      try{
        const updateProduct = {
         name:values.name,
                detail:values.detail,
                material:values.material,
                color:values.color,
                catagory:values.catagory,
                pointone:values.pointone,
                pointtwo:values.pointtwo,
                stock:values.stock,
                image1:baseImage1?baseImage1:values.image1,
                image2:baseImage2?baseImage2:values.image2,
                image3:baseImage3?baseImage3:values.image3,
                image4:baseImage4?baseImage4:values.image4,
                wholesaleprice:values.wholesaleprice,
                retailprice:values.retailprice
        }
        const res = await axios.post(`/admin/updateproduct/${params.id}`,updateProduct)
        console.log(res.data)
        if(res.data){
          navigate('/admin/showproduct')
       }
      }catch(error){
        console.log(error)
      }
    })()
}
});

 

  return (
    <div className='addproduct-container' >
        <div className='addproduct-box'>
        
            <div className='addproduct-box-title' >
            <div  onClick={()=>navigate("/admin/showproduct")}  className='addproduct-viewbutton'  >
            <button >View Product</button>
            </div>
                <h1>Add Product</h1>
            </div>
<form onSubmit={handleSubmit} >
            <div className='addproduct-box-data'>
                <text>Product Name</text>
                <input  type="text"
                  {...getFieldProps('name')}
                  autoComplete="off"/>
                              {errors.name && <p className='register-error-message'>{errors.name}</p>}
            </div>
            <div className='addproduct-box-data'>
                <text>Product Detail</text>
                <input  
                 type="text"
                 {...getFieldProps('detail')}
                 autoComplete="off"/>
              {errors.detail && <p className='register-error-message'>{errors.detail}</p>} 
            </div>
            <div className='addproduct-box-data'>
                <text>Material</text>
                <input 
                 type="text"
                 {...getFieldProps('material')}
                 autoComplete="off" />
                               {errors.material && <p className='register-error-message'>{errors.material}</p>}
            </div>
            <div className='addproduct-box-data'>
                <text>Color</text>
                <input 
                 type="text"
                 {...getFieldProps('color')}
                 autoComplete="off"/>
                               {errors.color && <p className='register-error-message'>{errors.color}</p>}
            </div>
            <div className='addproduct-box-data'>
                <text>Features 1</text>
                <input 
                 type="text"
                 {...getFieldProps('pointone')} 
                 autoComplete="off" />
                               {errors.pointone && <p className='register-error-message'>{errors.pointone}</p>}
            </div>

            <div className='addproduct-box-data'>
                <text>Features 2</text>
                <input   
                type="text"
                {...getFieldProps('pointtwo')}
                autoComplete="off"  />
                               {errors.pointtwo && <p className='register-error-message'>{errors.pointtwo}</p>}
            </div>

            <div className='addproduct-box-data'>
                <text>Stock</text>
                <input 
                 type="text"
                 {...getFieldProps('stock')}
                 autoComplete="off" />
              {errors.stock && <p className='register-error-message'>{errors.stock}</p>}
            </div>

            <div className='addproduct-box-data'>
                <text>Image 1</text>
                {baseImage1 ?<img src={baseImage1} className='editproduct-img' />  :<img src={data.image1} className='editproduct-img' /> }
                <input  type='file'    onChange={(e)=>{
                uploadImage1(e);
              }} />
               
            </div>
            <div className='addproduct-box-data'>
                <text>Image 2</text>
                {baseImage2 ?<img src={baseImage2} className='editproduct-img' />  :<img src={data.image2} className='editproduct-img' /> }
                <input type='file' onChange={(e)=>{
                uploadImage2(e);
              }} />
              
            </div>
            <div className='addproduct-box-data'>
                <text>Image 3</text>
                {baseImage3 ?<img src={baseImage3} className='editproduct-img' />  :<img src={data.image3} className='editproduct-img' /> }
                <input type='file'  onChange={(e)=>{
                uploadImage3(e);
              }} />
               
            </div>
            <div className='addproduct-box-data'>
                <text>image 4</text>
              {baseImage4 ?<img src={baseImage4} className='editproduct-img' />  :<img src={data.image4} className='editproduct-img' /> }
                <input type='file'    onChange={(e)=>{
                uploadImage4(e);
              }} />
               
            </div>
            
            <div className='addproduct-box-price'>
            <div className='addproduct-box-data'>
                <text>WholeSale Price</text>
                <input 
                 type="number"
                 {...getFieldProps('wholesaleprice')}
                 autoComplete="off" />
                {errors.wholesaleprice && <p className='register-error-message'>{errors.wholesaleprice}</p>}
            </div>
            <div className='addproduct-box-data'>
                <text>Retail Price</text>
                <input 
                 type="number"
                 {...getFieldProps('retailprice')}
                 autoComplete="off"  />
               {errors.retailprice && <p className='register-error-message'>{errors.retailprice}</p>}
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

export default Editproduct

