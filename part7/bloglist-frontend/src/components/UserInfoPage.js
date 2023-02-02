const UserInfoPage = ({ user }) => {
  // console.log(user)
  if (!user) {
    return null
  }
  return (
    <div>
      <h2>{user?.username}</h2>
      <p><b>added blogs</b></p>
      {
        user?.blogs.map(blog => (<li key={blog.id}>{blog.title}</li>))
      }
    </div>
  )

}

export default UserInfoPage