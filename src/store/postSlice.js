import { createSlice } from '@reduxjs/toolkit';

export const postSlice = createSlice({
  name: 'posts',
  initialState : {
    posts : []
  },
  reducers: {
    setPost : (state,action)=>{
        state.posts = action.payload
    },

    addPost: (state, action) => {
      state.posts.push(action.payload);
    },

    editPost: (state, action) => {
        const {id} = action.payload
        state.posts = state.posts.map((post)=>post.id == id ? {...post,...action.payload} : post)
    },

    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
  },
});

export const { addPost, editPost, deletePost ,setPost } = postSlice.actions;
export default postSlice.reducer;