export async  function addPostToStorage(post){
    const posts = JSON.parse(localStorage.getItem("posts") || '[]')
    posts.push({...post,comments : []})
    await delay()
    localStorage.setItem('posts',JSON.stringify(posts))
}

function delay(){
    return new Promise(res=>setTimeout(()=>res(""),300))
}
export async function editPostInStorage(post){
    const posts = JSON.parse(localStorage.getItem("posts") || '[]')
    const index = posts.findIndex((currPost) => currPost.id == post.id);
    console.log(index,post)
    await delay()

      if (index !== -1) {
        posts[index] = {...posts[index],...post};
      }
      localStorage.setItem("posts",JSON.stringify(posts))
}
export async function removePostFromStorage(id){
    let posts = JSON.parse(localStorage.getItem("posts") || '[]')
    posts = posts.filter((post)=>post.id !== id)
    await delay()
    localStorage.setItem('posts',JSON.stringify(posts))
}

export  function getAllPostsFromStorage(){
    return JSON.parse(localStorage.getItem("posts") || '[]')
}

export function addCommentToService(id,comment){
    let posts = JSON.parse(localStorage.getItem("posts") || '[]')
      const index = posts.findIndex(post => post.id == id)
      posts[index].comments.push(comment) 
      localStorage.setItem('posts',JSON.stringify(posts))

}