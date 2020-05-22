import React, { useState } from 'react'
import './styles.css'



const Blog = ({ blog, handleLike, handleDelete, user }) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  
  console.log(blog)
  console.log(user)
  console.log(blog.user)

  return (
    <div className="toggle">
      <span>{blog.title} {blog.author}</span> 
      <button onClick={ toggleVisibility } style={hideWhenVisible} id='view'> view </button>
      <button onClick={ toggleVisibility } style={showWhenVisible} id='hide'> hide </button>
      <div style= {showWhenVisible} className='inner'>
        <div>{blog.url}</div>
        <div id="likes">likes {blog.likes} <button id="like"value={blog.id} onClick={handleLike}>like</button></div> 
        <button value={blog.id} onClick={handleDelete}>delete</button>
      </div>
    </div>
  )
}

export default Blog
