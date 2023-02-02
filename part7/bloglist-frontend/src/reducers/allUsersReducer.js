import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const initialState = []

const allUserSlice = createSlice({
  name: 'allUsers',
  initialState,
  reducers: {
    saveAllUsers(state, action) {
      return action.payload
    }
  }
})

export const getAllUsers = () => {
  return async dispatch => {
    const response = await userService.getUsers()
    dispatch(saveAllUsers(response))
  }
}


export const { saveAllUsers } = allUserSlice.actions

export default allUserSlice.reducer