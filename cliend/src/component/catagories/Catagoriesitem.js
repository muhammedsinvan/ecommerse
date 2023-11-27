import React from 'react'
import './Catagoriesitem.css'
import {useNavigate} from 'react-router-dom'

const Catagoriesitem = ({item}) => {  

  const navigate = useNavigate()

  function getcatagory (item){
    navigate(`/products/${item}`)
  }
 
  return (
    
    <div className='CatagerisItem-MainContainer'  onClick={()=>navigate(`/products/${item.name}`)} >   
      < img className='CatagerisItem-Image' src={item.image} alt="categories"  />
      <div className='CatagerisItem-Info'>
        <text className='CatagerisItem-Title'>{item.name}</text>
        <button className='CatagerisItem-Button' value={item.name} onClick={e => getcatagory(e.target.value)} >SHOP NOW</button>
      </div>

    </div> 
  ) 
}  

export default Catagoriesitem