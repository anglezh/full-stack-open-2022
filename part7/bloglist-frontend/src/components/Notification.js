import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(({ notification }) => {
    return notification
  })
  if (message === null) {
    return null
  }

  return <div className="error">{message}</div>
}

export default Notification
