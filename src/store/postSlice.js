import { createSlice } from '@reduxjs/toolkit';

export const postSlice = createSlice({
  name: 'posts',
  initialState : {
    posts : [],
    loading : false
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
    toggleLoading: (state,action)=>{
      state.loading = action.payload
    }
  },
});

export function selectPosts(state){
  return state.posts
}

export function selectLoading(state){
  return state.loading
}
export const { addPost, editPost, deletePost ,setPost, toggleLoading } = postSlice.actions;
export default postSlice.reducer;