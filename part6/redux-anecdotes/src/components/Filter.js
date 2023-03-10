import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'
const Filter = (props) => {
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={(event) => {
        props.filterChange(event.target.value)
      }} />
    </div>
  )
}

const mapDispatchToProps = {
  filterChange,
}

export default connect(
  null,
  mapDispatchToProps
)(Filter)