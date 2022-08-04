import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import "./sidebar.css";

export default function Sidebar() {
    const [cats, setCats] = useState([]);

    useEffect(()=>{
       const getCats = async() =>{
        const res = await axios.get("/categories");
        setCats(res.data);
       }
       getCats();
    },[]);
  return (
    <div className='sidebar'>
        <div className="sidebarItem">
            <span className="sidebarTitle">ABOUT ME</span>
            <img
            src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg"
            alt=""
           />
           <p>
             Lorem ipsum dolor amet consectetur
             adipisicing elit. Rem, quo quasi tenetur
              at fugit quis laudantium distinctio?
           </p>
        </div>
        <div className="sidebarItem">
            <span className="sidebarTitle">CATEGORIES</span>
            <ul className="sidebarList">
                {cats.map(c=>(
                    <Link to={`/?cat=${c.name}`} className="link">
                      <li className="sidebarListItem">{c.name}</li>
                    </Link>
                ))}
            
            </ul>
        </div>
        <div className="sidebarItem">
            <span className="sidebarTitle">FOLLOW US</span>
            <div className="sidebarSocial">
               <i className="sidebarIcon fa-brands fa-square-facebook"></i>
               <i className="sidebarIcon fa-brands fa-square-twitter"></i>
               <i className="sidebarIcon fa-brands fa-square-pinterest"></i>
               <i className="sidebarIcon fa-brands fa-square-instagram"></i>
            </div>
        </div>
    </div>
  )
}
