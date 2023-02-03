import { commentBlogOf, toggleLikeOf } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { removeBlogOf } from '../reducers/blogReducer'
import { useNavigate } from 'react-router-dom'

const BlogInfoPage = ({ blog }) => {
  if (!blog) {
    return null
  }
  const dispatch = useDispatch()
  const user = useSelector(({ userInfo }) => { return userInfo })
  const showRVisible = { display: user.id === blog.user?.id ? '' : 'none' }
  const navigate = useNavigate()

  const toggleLike = () => {
    const changedBlog = { ...blog, likes: blog.likes + 1 }
    dispatch(toggleLikeOf(changedBlog))
  }

  const [comment, setComment] = useState('')
  const commentBlog = (e) => {
    e.preventDefault()
    dispatch(commentBlogOf(comment, blog))
    console.log(comment)
    setComment('')
  }
  const removeBlog = (blog) => {
    console.log(blog)
    dispatch(removeBlogOf(blog))
    navigate('/')
  }

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>
      <br />
      {blog.likes} likes <button onClick={toggleLike}>like</button>
      <br />
      added by {blog.user.username}
      <div style={showRVisible}>
        <button className='remove-blog' onClick={() => removeBlog(blog)}>
          remove
        </button>
      </div>

      <p><b>comments</b></p>
      <form onSubmit={commentBlog}>
        <input type='text' value={comment} onChange={({ target }) => { setComment(target.value) }}></input><button type='submit'>add comment</button>
      </form>
      {
        blog.comments.map(c => (<li key={c.id}>{c.content}</li>))
      }
    </div >
  )
}

export default BlogInfoPage