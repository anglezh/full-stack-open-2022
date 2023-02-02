import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'

import { BrowserRouter as Router } from 'react-router-dom'
import allUsersReducer from './reducers/allUsersReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    userInfo: userReducer,
    allUsers: allUsersReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)
