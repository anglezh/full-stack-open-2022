import { useState } from 'react'
const Blog = ({ blog, toggleLike, removeBlog, username }) => {
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
    display: username === blog.user?.username ? '' : 'none',
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

export default Blog
