import React, { useContext, useRef } from 'react'
import { Link } from "react-router-dom"
import { Context } from '../../context/Context';
import axios from "axios";
import "./login.css"
import { axiosInstance } from '../../config';

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { user, dispatch, isFetching } = useContext(Context);
  

  const handlSubmit = async(e) =>{
    e.preventDefault();
    dispatch({type:"LOGIN_START"});
    try{
      const res = await axiosInstance.post("/auth/login",{
        username: userRef.current.value,
        password: passwordRef.current.value
      });
      dispatch({type:"LOGIN_SUCCESS", payload: res.data});
    }catch(err){
      dispatch({type:"LOGIN_FAILURE"});
    }
  };

  // console.log(user);
  // console.log(isFetching);

  return (
    <div className='login'>
        <span className="loginTitle">Login</span>

        <form className="loginForm" onSubmit={handlSubmit}>
            <label>Username</label>
            <input 
            type="text" 
            placeholder='Enter your username'
            ref = {userRef}
            />

            <label>Password</label>
            <input 
            type="password" 
            placeholder='Enter your password'
            ref= {passwordRef}
            />

            <button className="loginBtn" type="submit">Login</button>
        </form>

        <button className="loginRegBtn"><Link className="link" to="/register">Register</Link></button>
    </div>
  )
}
