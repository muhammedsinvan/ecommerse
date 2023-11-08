import React from 'react'
import './footer.css'
import {Facebook, Instagram, MailOutline, Phone, Pinterest, Room, Twitter} from '@material-ui/icons'

const Footer = () => {
  return (
    <div className='Footer-Container'>
    <div className='Footer-LeftContainer'>
        <h1 className='Footer-Logo'>VERDEELIFE</h1>
        <p className='Footer-Desc'>Verdeelife shopping website that sell only eco friedly product. The main attrection of the webapp is users can buy product at high quality product at effective price.</p>
        <div className='Footer-SocialContainer'>
            <div  className='Footer-SocialIcon'>
                <Facebook/>
            </div>
            <div  className='Footer-SocialIcon'>
                <Instagram/>
            </div>
            <div  className='Footer-SocialIcon'>
                <Twitter/>
            </div>
            <div  className='Footer-SocialIcon'>
                <Pinterest/>
            </div>
        </div>
    </div>

    <div className='Footer-CenterContainer'>
        <h3 className='Footer-Title'>Useful List</h3>
        <ul className='Footer-List'>
<li className='Footer-ListItem'>Home</li>
<li className='Footer-ListItem'>Cart</li>
<li className='Footer-ListItem'>Men Fashion</li>
<li className='Footer-ListItem'>Women Fashion</li>
<li className='Footer-ListItem'>Accessories</li>
<li className='Footer-ListItem'>My Account</li>
<li className='Footer-ListItem'>Orders</li>
<li className='Footer-ListItem'>Whislist</li>
<li className='Footer-ListItem'>Whislist</li>
<li className='Footer-ListItem'>Terms</li>
        </ul>
    </div>

    <div className='Footer-RightContainer'>
        <h3 className='Footer-Title'>Contact</h3>
        <div className='Footer-ContactItem'><Room style={{marginRight:"10px"}}/> India, Kerala, Kozhikode</div>
        <div className='Footer-ContactItem'><Phone style={{marginRight:"10px"}}/> +91 6238454944</div>
        <div className='Footer-ContactItem'><MailOutline style={{marginRight:"10px"}}/> verdeelife@gmail.com</div>
        <img className='Footer-Payment' src='https://i.ibb.co/Qfvn4z6/payment.png' alt='payment'/>
    </div>

</div>
  )
}

export default Footer