import { combineReducers } from 'redux'
import projectReducer from './project'
import backlogReducer from './backlog'
import userReducer from './user'

export default combineReducers({
  project: projectReducer,
  backlog: backlogReducer,
  user: userReducer,
})
