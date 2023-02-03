import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeBlogOf, toggleLikeOf } from '../reducers/blogReducer'
import { useRef } from 'react'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'
import { appendBlog } from '../reducers/blogReducer'
import Notification from './Notification'

import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { Link } from 'react-router-dom'

const Blog = ({ blog, toggleLike, removeBlog, userID }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const [showDetail, setShowDetail] = useState(false)
  // const [showRemove, setShowRemove] = useState(false)

  const showWhenVisible = { display: showDetail ? '' : 'none' }
  const showRVisible = {
    display: userID === blog.user?.id ? '' : 'none',
  }
  const toggleDetail = (event) => {
    event.preventDefault()
    setShowDetail(!showDetail)
  }
  return (
    <div style={blogStyle} className='blog'>
      <div>
        <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}{' '}</Link>
        <button onClick={toggleDetail}>{showDetail ? 'hide' : 'view'}</button>
      </div>
      <div style={showWhenVisible}>
        <a href={blog.url}>{blog.url}</a>
        <br />
        likes:{blog.likes}{' '}
        <button className='like-toggle' onClick={toggleLike}>
          like
        </button>
        <br />
        {blog.user?.name}
        <div style={showRVisible}>
          <button className='remove-blog' onClick={removeBlog}>
            remove
          </button>
        </div>
      </div>
    </div>
  )
}

const BlogList = () => {

  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const user = useSelector(({ userInfo }) => { return userInfo })

  const blogs = useSelector(({ blogs }) => {
    return blogs
  })

  const toggleLike = (blog) => {
    const likeToBlog = blogs.find(b => b.id === blog.id)
    const changeBlog = { ...likeToBlog, likes: likeToBlog.likes + 1 }
    dispatch(toggleLikeOf(changeBlog))
  }

  const removeBlog = (blog) => {
    console.log(blog)
    dispatch(removeBlogOf(blog))
  }





  const createBlog = (newBlog) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(newBlog)
      .then((savedBlog) => {
        dispatch(setNotification(`a new blog ${savedBlog.title} added`, 5))
        savedBlog.user = user
        dispatch(appendBlog(savedBlog))
      })
      .catch((error) => {
        dispatch(setNotification(error.message, 5))
        console.log(error.message)
      })
  }

  return (
    <div>
      <Notification />
      <div>
        <Togglable buttonLabel='new note' ref={blogFormRef}>
          <BlogForm createBlog={createBlog} />
        </Togglable>
        <div>
          {
            blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                toggleLike={() => toggleLike(blog)}
                removeBlog={() => removeBlog(blog)}
                userID={user.id}
              />
            ))
          }
        </div>
      </div>
    </div>
  )



}

export default BlogList
