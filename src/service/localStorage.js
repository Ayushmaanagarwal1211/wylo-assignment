export  function addPostToStorage(post){
    const posts = JSON.parse(localStorage.getItem("posts") || '[]')
    posts.push(post)
    localStorage.setItem('posts',JSON.stringify(posts))
}

export  function editPostInStorage(post){
    const posts = JSON.parse(localStorage.getItem("posts") || '[]')
    const index = posts.findIndex((currPost) => currPost.id == post.id);
    console.log(index,post)
      if (index !== -1) {
        posts[index] = {...posts[index],...post};
      }
      localStorage.setItem("posts",JSON.stringify(posts))
}
export  function removePostFromStorage(id){
    let posts = JSON.parse(localStorage.getItem("posts") || '[]')
    posts = posts.filter((post)=>post.id !== id)
    localStorage.setItem('posts',JSON.stringify(posts))
}

export function getAllPostsFromStorage(){
    return JSON.parse(localStorage.getItem("posts") || '[]')
}