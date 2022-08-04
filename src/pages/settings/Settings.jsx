import React, { useContext, useState } from 'react'
import "./settings.css"
import Sidebar from "../../../src/sidebar/Sidebar"
import { Context } from '../../context/Context'
import axios from "axios";
import { axiosInstance } from '../../config';

export default function Settings() {
  const [file, setFile] = useState(null);
  const [updatedUserName, setUpdatedUserName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedPassword, setUpdatedPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const { user, dispatch } = useContext(Context);
  const publicFrolder = "https://heyblogit.herokuapp.com/images/";

  const handleUpdate = async (e) => {
    e.preventDefault();
    dispatch({type: "UPDATE_START"});
    const updatedUser = {
      userId: user._id,
      username: updatedUserName,
      email: updatedEmail,
      password: updatedPassword
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axiosInstance.post("/upload", data);
      } catch (err) { }
    }

    try {
      const res = await axiosInstance.put("/users/" + user._id, updatedUser);
      setIsSuccess(true);
      dispatch({type: "UPDATE_SUCCESS", payload: res.data});
    } catch (err) { 
      dispatch({type: "UPDATE_FAILURE"});
    }
  };

  // console.log(user._id);
 
  
  return (
    <div className='settings'>
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span className="settingsDeleteTitle">Delete Account</span>
        </div>

        <form className="settingsForm" onSubmit={handleUpdate}>
          <label> Profile Picture</label>
          <div className="settingsProfilePic">
            {user.profilePic ?
              <img
                src={file? URL.createObjectURL(file) : publicFrolder+user.profilePic}
                alt="" />
              :
              <img
                src="https://www.portmelbournefc.com.au/wp-content/uploads/2022/03/avatar-1.jpeg"
                alt="" />
            }

            <label htmlFor="fileInput">
              <i className="settingsProfilePicIcon fa-solid fa-circle-user"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={e => setFile(e.target.files[0])}
            />
          </div>

          <label> Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={e => setUpdatedUserName(e.target.value)}
          />

          <label> Eamil</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={e => setUpdatedEmail(e.target.value)}
          />

          <label> Password</label>
          <input
            type="password"
            onChange={e => setUpdatedPassword(e.target.value)}
          />

          <button className="settingsSubmit" type="submit">Update</button>
          {isSuccess && 
            <span className="updateSignal">Your profile has been updated succesfully.</span>
          }
        </form>
      </div>

      <Sidebar />
    </div>
  )
}
