import axios from 'axios'
const baseUrl = '/api/blogs'
// const baseUrl = 'http://localhost:3003/api/blogs'


let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`

}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}
const likes = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }
  blog.likes += 1
  console.log(blog.likes)
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return response.data
}
const remove = async blogId => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${blogId}`, config)
  return response.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const exportDefault = { getAll, setToken, create, likes, remove }
export default exportDefault