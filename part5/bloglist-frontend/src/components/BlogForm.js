import { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      url: url,
      author: author
    })
    setTitle('')
    setUrl('')
    setAuthor('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input type="text"
            name="Title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            placeholder='write here title'
          />
        </div>
        <div>
          author
          <input type="text"
            name="Author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            placeholder='write here author'
          />
        </div>
        <div>
          url
          <input type="text"
            name="Url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            placeholder='write here url'
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div >
  )
}

export default BlogForm