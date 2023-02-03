import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notificationChange(state, action) {
      return action.payload
    },
    notificationHidden() {
      return null
    }
  }
})

var timeoutID = null
export const setNotification = (content, variant, second) => {

  return dispatch => {
    if (timeoutID) {
      window.clearTimeout(timeoutID)
    }
    dispatch(notificationChange({ message: content, variant: variant }))
    timeoutID = window.setTimeout(() => {
      dispatch(notificationHidden())
      timeoutID = null
    }, 1000 * second)
  }
}
export const { notificationChange, notificationHidden } = notificationSlice.actions
export default notificationSlice.reducer