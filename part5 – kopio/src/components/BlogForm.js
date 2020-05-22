import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ( { setBlogs, setErrorMessage } ) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = async (event) => {
    event.preventDefault()
    try {
      await blogService.create({
        title,
        author,
        url
      })
    
      blogService.getAll().then(blogs => 
        setBlogs(blogs)) 

      setErrorMessage(`a new blog ${title} by ${author} was added`)
      setTitle('')
      setAuthor('')
      setUrl('')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    
    } catch (expection) {
      console.log('invalid/missing information')
    }
  }

  return (
    <form onSubmit={handleNewBlog}>
      <div>
          title
        <input
          id="title"
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
          author
        <input
          id="author"
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
          url
        <input
          id="url"
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">add</button>
    </form>
  )
}

export default BlogForm