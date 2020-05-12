import { combineReducers } from 'redux'
import projectReducer from './project'
import backlogReducer from './backlog'
// import errorReducer from './errorReducer'

export default combineReducers({
  project: projectReducer,
  backlog: backlogReducer,
  // errors: errorReducer,
})
