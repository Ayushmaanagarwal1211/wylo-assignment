import React,{useState,useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { Pencil, Trash2, X, Save, Upload } from 'lucide-react';
import ModalBody from './ModalBody';
import {  editPostInStorage, removePostFromStorage } from '../service/localStorage';
import { deletePost,editPost } from '../store/postSlice';

function EditingModalInnerBody({post,onClose}){
    const [editedContent, setEditedContent] = useState(post.content);
    const [editedImageUrl, setEditedImageUrl] = useState(post.imageUrl || '');
    const dispatch = useDispatch()

    const handleSave = () => {
        if (!editedContent.trim()) return;
        const updatedPost = {
            id:post.id,
            content: editedContent.trim(),
            imageUrl: editedImageUrl.trim() || undefined,
            updatedAt: new Date().toISOString(),
        }
        dispatch(editPost(updatedPost));
        editPostInStorage(updatedPost)
        onClose();
      };

    return (
        <div className="p-6 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800">Edit Post</h2>
      
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-600">
            Post Title
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-3 py-2 border border-gray-300 bg-gray-50 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter post title"
            onChange={(e) => setEditedContent(e.target.value)}
            value={editedContent}
          />
        </div>
        <div className="space-y-2">
        <input
          type="url"
          value={editedImageUrl}
          onChange={(e) => setEditedImageUrl(e.target.value)}
          placeholder="Image URL"
          className="w-full p-2 border border-gray-200 rounded-lg mb-3"
        />
        {
            editedImageUrl && <img
            src={ editedImageUrl}
            alt="Preview"
            className="max-h-48 rounded-lg object-contain bg-gray-50"
          />
        }
        </div>
      
        <div className="flex justify-end">
          <button
            className="px-4 py-2 text-white cursor-pointer bg-indigo-600 rounded-lg hover:bg-indigo-700 transition focus:ring-2 focus:ring-indigo-400"
            onClick={handleSave}
          >
            Submit
          </button>
        </div>
      </div>
      
    )

}
export default function Post({ post }) {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
  
    const handleDelete = () => {
      dispatch(deletePost(post.id));
      removePostFromStorage(post.id)
    };
  
    function closeModal() {
      setIsEditing(false);
    }
    return (
      <>
      
        <ModalBody modalIsOpen={isEditing} closeModal={closeModal}>
          <EditingModalInnerBody onClose={closeModal} post={post} />
        </ModalBody>
        <div  className="bg-white hover:scale-[1.01] transform-all duration-100 rounded-lg shadow-lg p-6 mb-6 border border-gray-200 transition hover:shadow-xl">
      
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-500 text-sm font-medium">
            {new Date(post.updatedAt).toLocaleDateString()}
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
              title="Edit Post"
            >
              <Pencil size={18} className="text-gray-600" />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 rounded-lg bg-red-100 hover:bg-red-200 transition"
              title="Delete Post"
            >
              <Trash2 size={18} className="text-red-600" />
            </button>
          </div>
        </div>
      
        <p className="text-gray-900 text-lg font-medium leading-relaxed mb-4">
          {post.content}
        </p>
      
        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt="Post content"
            className="w-[15rem] m-auto  rounded-lg shadow-md "
          />
        )}
      </div>
      </>
      
    )
}
