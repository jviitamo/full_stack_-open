import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLike = (event) => {

    const blog = blogs.find(blog => blog.id === event.target.value)
    const newBlog = {
      ...blog,
      likes: blog.likes + 1
    }

    blogService.edit(event.target.value, newBlog)

    blogService.getAll().then(blogs => {
      const newblogs = blogs.sort(function(a,b) {
        return b.likes - a.likes
      })
      setBlogs(newblogs)
    })
    console.log(blogs)
  }

  const handleDelete = async (event) => {
    const id = event.target.value
    const blog = blogs.find(blog => blog.id === id)
    console.log(blog)
    const conf = window.confirm(`delete ${blog.title} by ${blog.author}?` )
    if (conf) {
      try {
        blogService.remove(id)
        blogService.getAll().then(blogs => {
          setBlogs(blogs)
          console.log(blogs)
          setErrorMessage(`${blog.title} was successfully deleted`)
          setTimeout(() => {
            setErrorMessage('')
          }, 5000)
        })
      } catch (exception) {
        console.log(exception)
      }
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: userName, 
        password: password
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 

      blogService.setToken(user.token)
      setUser(user)
      setUserName('')
      setPassword('')
      setErrorMessage('log in succeed')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    } catch (expection) {
      console.log('wrong credentials')
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <div className="error">{errorMessage}</div>
        <h2>Log in to application</h2>
        <LoginForm handleLogin={handleLogin} userName={userName} setUserName={setUserName} password={password} setPassword={setPassword}/>
      </div>
    )
  }

  return (
    <div>
      {errorMessage}
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogOut}>log out</button></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} handleLike={handleLike} handleDelete={handleDelete} />
      )}
      <Togglable buttonLabel="new note"> 
        <h2>create new</h2>
        <BlogForm setBlogs={setBlogs} setErrorMessage={setErrorMessage} />
      </Togglable>
    </div>
  )
}

export default App