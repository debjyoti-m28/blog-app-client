import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { Context } from '../context/Context';
import "./header.css"

export default function Header() {
  const publicFrolder = "http://localhost:8800/images/";
  const { user }= useContext(Context);
  return (
    <div className="header">
        <div className="headerTitles">
            <span className="headerTitleSm">Have a story !</span>
            <span className="headerTitleLg">BlogIt</span>

            <Link to={user? "/write" : "/register"}>
             <button className='callToAction'>Start writing</button>
            </Link>
        </div>
        <img
        className="headerImage"
         src="http://localhost:8800/images/glenn-carstens-peters-npxXWgQ33ZQ-unsplash.jpg"
         alt=""
           />
    </div>
  )
}

// "https://images.pexels.com/photos/1167355/pexels-photo-1167355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
