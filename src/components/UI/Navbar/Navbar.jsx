import React from 'react';
import {Link} from 'react-router-dom';
import MyButton from '../button/MyButton';
import  { useContext } from 'react';
import {AuthContext} from '../../../context/index';

let Navbar = () => {
  let {isAunt, setIsAunt} = useContext(AuthContext);

  let logout = () => {
    setIsAunt(false);
    localStorage.removeItem('auth')
  }
    return (
<div className="navbar">
  <MyButton onClick={logout}>
    Выйти
  </MyButton>
    <div className="navbar__links">
     <div><Link to="/about">О сайте</Link></div>
     <div><Link to="/posts">Посты</Link></div> 
    </div>
    </div>
    )
}

export default Navbar;