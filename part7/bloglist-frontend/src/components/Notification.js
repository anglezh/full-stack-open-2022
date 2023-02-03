import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  // variant = 'danger'
  // variant = 'success'
  const notification = useSelector(({ notification }) => {
    return notification
  })


  if (notification === null) {
    return null
  }

  const message = notification.message
  const variant = notification.variant
  return (
    <div className="container">
      {(message &&
        <Alert variant={variant}>
          {message}
        </Alert>
      )}
    </div>
  )
}

export default Notification
