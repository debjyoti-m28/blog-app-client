import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import { Context } from '../context/Context'
import "./topbar.css"

export default function Topbar() {
  const { user, dispatch }= useContext(Context);
  const publicFrolder = "http://localhost:8800/images/";

  const handleLogout = () =>{
      dispatch({type:"LOGOUT"});
      window.location.replace("/");
  }
  
  return (
    <div className='top'>
      <div className="topLeft">
        <i className="topIcon fa-brands fa-square-facebook"></i>
        <i className="topIcon fa-brands fa-square-twitter"></i>
        <i className="topIcon fa-brands fa-square-pinterest"></i>
        <i className="topIcon fa-brands fa-square-instagram"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem"><Link className="link" to="/">HOME</Link></li>
          <li className="topListItem"><Link className="link" to="/write">WRITE</Link></li>
          <li className="topListItem"><Link className="link" to="/">ABOUT</Link></li>
          <li className="topListItem"><Link className="link" to="/">CONTACT</Link></li>
          <li className="topListItem" onClick={ handleLogout }>{user && "LOGOUT"}</li>
        </ul>
      </div>
      <div className="topRight">
        {user ?
          <Link to="/settings">
            {user.profilePic? 
              <img
              className='topImage'
              src={publicFrolder+user.profilePic} //"https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
            />
            :
            <img
              className='topImage'
              src="https://www.portmelbournefc.com.au/wp-content/uploads/2022/03/avatar-1.jpeg"
              alt="" 
            />
            }
            
            
          </Link>
          :
          <>
            <ul className="topList">
              <li className="topListItem"><Link className="link" to="/login">LOGIN</Link></li>
              <li className="topListItem"><Link className="link" to="/register">REGISTER</Link></li>
            </ul>
          </>

        }
        <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  )
}
