import { configureStore } from '@reduxjs/toolkit'

import anecdoteReducer from './reducers/anecdoteReducer'
import notifacationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    notifacation: notifacationReducer,
    filter: filterReducer
  }
})

export default store