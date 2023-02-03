import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'
import { appendBlog } from '../reducers/blogReducer'

import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'


const BlogList = () => {

  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const user = useSelector(({ userInfo }) => { return userInfo })

  const blogs = useSelector(({ blogs }) => {
    return blogs
  })

  const createBlog = (newBlog) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(newBlog)
      .then((savedBlog) => {
        dispatch(setNotification(`a new blog ${savedBlog.title} added`, 'success', 5))
        savedBlog.user = user
        dispatch(appendBlog(savedBlog))
      })
      .catch((error) => {
        dispatch(setNotification(error.message, 'danger', 5))
        console.log(error.message)
      })
  }

  return (
    <div>
      <Togglable buttonLabel='new note' ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      <div>
        <Table striped>
          <tbody>
            {blogs.map(blog =>
              <tr key={blog.id}>
                <td>
                  <Link to={`/blogs/${blog.id}`}>
                    {blog.title}
                  </Link>
                </td>
                <td>
                  {blog.author}
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  )



}

export default BlogList
