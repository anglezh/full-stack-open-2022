import { useSelector } from "react-redux"
const Notification = () => {
  const noti = useSelector(({ notifacation }) => {
    return notifacation
  })
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (noti === null) {
    return null
  }
  return (
    <div style={style}>
      {noti}
    </div>
  )


}

export default Notification