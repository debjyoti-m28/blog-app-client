import React from 'react'
import "./footer.css"

export default function Footer() {
  return (
    <div className='footer'>
        <div className="footerContent">
            <div className="footerLeft">
               <ul className="footerCats">
                 <li>Life</li>
                 <li>Music</li>
                 <li>Style</li>
                 <li>Cinema</li>
                 <li>Sports</li>
                 <li>Tech</li>
               </ul>
            </div>
            <div className="footerRight">
                Contact Us :
                
            </div>
        </div>
        <div className="copyRight">
             All Rights Reserved
        </div>
    </div>
  )
}
