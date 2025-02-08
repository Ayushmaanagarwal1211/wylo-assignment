import React from 'react'
import Post from './Post';
import { useSelector } from 'react-redux';

export default function Posts() {
    const posts = useSelector((state) => state.posts);

    return (
      <div className="max-w-2xl  gap-[20px] mx-auto">
        {posts && posts.map(post => 
          <Post key={post.id} post={post} />
        )}
        {posts.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <p className="text-xl">No posts yet</p>
          </div>
        )}
      </div>
    )
}
