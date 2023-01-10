import { createSlice } from "@reduxjs/toolkit"

const initialState = null
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notificationChange(state, action) {
      return action.payload
    },
    notificationHidden(state, action) {
      return null
    }
  }
})

export const { notificationChange, notificationHidden } = notificationSlice.actions
export default notificationSlice.reducer