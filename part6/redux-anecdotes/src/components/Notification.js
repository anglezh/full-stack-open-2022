import { connect } from 'react-redux'



const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (props.noti === null) {
    return null
  }
  return (
    <div style={style}>
      {props.noti}
    </div>
  )

}
const mapStateToProps = (state) => {

  return { noti: state.notifacation }
}

export default connect(
  mapStateToProps
)(Notification)