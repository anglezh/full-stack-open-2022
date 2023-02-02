import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = null

const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    saveUser(state, action) {
      return action.payload
    }
  }
})

export const getUser = () => {
  return dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    var user = null
    if (loggedUserJSON) {
      user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
    }
    dispatch(saveUser(user))
  }

}


export const { saveUser } = userSlice.actions

export default userSlice.reducer