import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from '../store/postSlice';
import { Image, Send, X, Upload } from 'lucide-react';
import { addPostToStorage } from '../service/localStorage';

export default function CreatePost() {
  const dispatch = useDispatch();
  const [postData,setPostData] = useState({
    content : "",
    imageUrl : "",
  })
  const [showImageInput, setShowImageInput] = useState(false);

  function reset(){
    setPostData({content:"",imageUrl:""})
    setShowImageInput(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!postData.content.trim()) return;

    const newPost = {
      id: Date.now().toString(),
      content: postData.content.trim(),
      imageUrl: postData.imageUrl.trim() || undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    dispatch(addPost(newPost));
    addPostToStorage(newPost)
    reset()
  };

  const clearImage = () => {
    setPostData(prev=>({...prev,imageUrl : ""}))
  };



  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-4 mb-6">
      <textarea
        value={postData.content}
        onChange={(e)=>setPostData({content:e.target.value,imageUrl : postData.imageUrl})}
        placeholder="What's on your mind?"
        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        rows={3}
      />
       {showImageInput && (
        <div className="mt-4 space-y-3">
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="url"
                value={postData.imageUrl}
                onChange={(e) => {
                    setPostData(prev=>({...prev,imageUrl : e.target.value}));
                }}
                placeholder="Enter image URL"
                className="w-full p-2 border border-gray-200 rounded-lg"
              />
            </div>

          </div>
          
          {(postData.imageUrl) && (
            <div className="relative">
              <img
                src={ postData.imageUrl}
                alt="Preview"
                className="max-h-48 min-h-[80px] text-center py-2 rounded-lg object-contain bg-gray-50"
              />
              <button
                type="button"
                onClick={clearImage}
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
          )}
        </div>
      )}

      <div className="mt-3 flex justify-between items-center">
        <button
        type='button'
          onClick={() => setShowImageInput(!showImageInput)}
          className="text-gray-500 hover:text-gray-700 flex items-center gap-2"
        >
          <Image size={20} />
          <span>Add Image</span>
        </button>
        
        <button
          type="submit"
          disabled={!postData.content.trim()}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={20} />
          <span>Post</span>
        </button>
      </div>
    </form>
  );
}