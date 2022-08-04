import React, { useContext, useEffect, useState } from 'react'
import { useLocation, Link } from "react-router-dom";
import Footer from '../footer/Footer';
import axios from "axios";
import "./singlePost.css"
import { Context } from '../context/Context';
import { axiosInstance } from '../config';

export default function SinglePost() {
  const location = useLocation();  //  pathname: "/post/62e8c6be021f3dbe8d823aeb"
  const path = location.pathname.split("/")[2];  //  62e8c6be021f3dbe8d823aebF
  // console.log(path);
  const [post, setPost] = useState({});
  const publicFrolder = "https://heyblogit.herokuapp.com/images/";
  const { user } = useContext(Context);
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateDesc, setUpdateDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axiosInstance.get("/posts/" + path);
      setPost(res.data);
      //storing for updates
      setUpdateTitle(res.data.title);
      setUpdateDesc(res.data.desc);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/posts/${post._id}`, { data: { username: user.username } });
      window.location.replace("/");
    } catch (err) {

    }
  }

  const handleUpdate = async(e) =>{
    try {
      await axiosInstance.put(`/posts/${post._id}`, {
          username: user.username,
          title: updateTitle,
          desc: updateDesc
        });
      window.location.reload();
    } catch (err) {

    }
  }

  return (
    <div className='singlePost'>
      <div className="singlePostWrapper">
        {post.photo &&
          <img
            src={publicFrolder + post.photo}
            alt=""
            className="singlePostImage"
          />
        }

        {updateMode ?
          <input
            className="singlePostTitleUpdate"
            type="text"
            autoFocus={true}
            value={updateTitle}
            onChange={(e) => setUpdateTitle(e.target.value)}
          />
          :
          <h1 className="singlePostTitle">
            {post.title}
            {user?.username === post.username &&
              <div className="singlePostEdit">
                <i className="singlePostIcon fa-solid fa-pen-to-square" onClick={() => setUpdateMode(true)}></i>
                <i className="singlePostIcon fa-solid fa-trash-can" onClick={handleDelete}></i>
              </div>
            }
          </h1>
        }

        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            <span style={{color: "grey"}}>Author:</span>
            <Link to={`/?user=${post.username}`} className="link">
              <b style={{marginLeft: "5px"}}>{post.username}</b>
            </Link>

          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>

        {updateMode ?
          <textarea
            value={updateDesc}
            rows="20"
            className='singlePostDescUpdate'
            onChange={(e) => setUpdateDesc(e.target.value)}
          />
          :
          <p className='singlePostDesc'>
            {post.desc}
          </p>
        }
        
        {updateMode && 
          <button className="singlePostUpdateBtn" onClick={handleUpdate}>Update</button>
        }
        
        
      </div>
    </div>
  )
}
