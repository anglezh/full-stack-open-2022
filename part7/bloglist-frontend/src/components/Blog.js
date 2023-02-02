import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeBlogOf, toggleLikeOf } from '../reducers/blogReducer'
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
        {blog.title} {blog.author}{' '}
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
  const user = useSelector(({ userInfo }) => {
    return userInfo
  })

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

  return (
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

  )
}

export default BlogList
