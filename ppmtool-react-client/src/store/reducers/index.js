import { combineReducers } from 'redux'
import projectReducer from './project'
// import errorReducer from './errorReducer'

export default combineReducers({
  project: projectReducer,
  // errors: errorReducer,
})
