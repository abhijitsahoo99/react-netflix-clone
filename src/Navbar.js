import React from 'react'
import './Navbar.css'
import logo from './assets/netflixlogo.png'
import avatar from './assets/Netflix-avatar.png'
import { useState , useEffect} from 'react'


function Navbar() {
    const[show , handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if(window.scrollY > 100){
                handleShow(true);
            } else { 
                handleShow(false);
            }
        });
        return () => {
            window.removeEventListener("scroll" , handleShow);
        };
    },[]);
  return (
    <div className={`nav ${show && "nav_black"}`}>
    <img 
        className='nav_logo'
        src={logo}
        alt='Netflix Logo' />
    <img 
        className='nav_avatar'
        src={avatar}
        alt='Avatar Logo' 
    />
      
    </div>
  )
}

export default Navbar
