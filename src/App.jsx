import React, { useEffect, useState } from "react";
import CreatePost from "./components/CreatePost";
import Posts from "./components/Posts";
import { useDispatch, useSelector } from "react-redux";
import { selectLoading, setPost } from "./store/postSlice";
import { getAllPostsFromStorage } from "./service/localStorage";
import { ToastContainer } from "react-toastify";
import Spinner from "./components/Spinner";

const App = () => {
  const dispatch = useDispatch()
  const loading = useSelector(state=>selectLoading(state))

  useEffect(()=>{
    const posts = getAllPostsFromStorage()
    dispatch(setPost(posts))
  },[])

  return (
    <>
   { loading && <Spinner/> }
    <ToastContainer className={'z-[10000]'}/>
    <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Social Feed
          </h1>
          <CreatePost />
          <Posts />
        </div>
      </div>
    </>
  )
   
};

export default App;
