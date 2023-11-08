import React from 'react'
import './Catagoriesitem.css'
import {useNavigate} from 'react-router-dom'

const Catagoriesitem = ({item}) => {

  const navigate = useNavigate()

  function getcatagory (item){
    navigate(`/products/${item}`)
  }

  return (
    <div className='CatagerisItem-Container'>
      < img className='CatagerisItem-Image' src={item.image} alt="categories" />
      <div className='CatagerisItem-Info'>
        <h1 className='CatagerisItem-Title'>{item.name}</h1>
        <button className='CatagerisItem-Button' value={item.name} onClick={e => getcatagory(e.target.value)} >{item.button}</button>
      </div>
    </div>
  ) 
} 

export default Catagoriesitem