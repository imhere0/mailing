import React from 'react'
import {Link, useNavigate}  from 'react-router-dom';
import '../App.css';

const Nav = () => {

  const LinkStyle = {
    color: 'black',
    textDecoration : 'none',
    padding : '15px'
  }
  const navigate = useNavigate();
  const logout = () =>
  {
    localStorage.clear();
    navigate("/");
  }
  return (
    <div class="topnav"  id = "myTopnav">
        <a  href="#" class = "navbar-brand" id = "home" style={{fontFamily:'cambria'}}> Welcome, {localStorage.getItem('name')}</a>
        <div class = "right">
          <Link to = {'/sent'} style = {LinkStyle}>Sent</Link>
          <Link to = {'/inbox'} style = {LinkStyle}>Inbox</Link>
          <Link to = {'/compose'} style = {LinkStyle}>Compose</Link>
          
          <button class="dropbtn" onClick={logout}>Logout &nbsp;
          </button>      
        </div>
    </div>  
    
  )
}

export default Nav