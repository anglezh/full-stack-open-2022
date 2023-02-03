import { commentBlogOf, toggleLikeOf } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

const BlogInfoPage = ({ blog }) => {
  if (!blog) {
    return null
  }
  const dispatch = useDispatch()
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

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>
      <br />
      {blog.likes} likes <button onClick={toggleLike}>like</button>
      <br />
      added by {blog.user.username}

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