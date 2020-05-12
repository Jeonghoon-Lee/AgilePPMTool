import * as actionTypes from '../actions/actionTypes'

const initialState = {
  tasks: [],
  task: {},
  error: {},
  loading: false,
}

const fetchProjectTasksStart = (state, action) => {
  return {
    ...state,
    loading: true,
    task: {},
    error: {},
  }
}

const fetchProjectTasksSuccess = (state, action) => {
  return {
    ...state,
    tasks: [...action.tasks],
    error: {},
    loading: false,
  }
}

const fetchProjectTasksFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error,
  }
}

const fetchProjectTaskByIdSuccess = (state, action) => {
  return {
    ...state,
    task: action.task,
    error: {}
  }
}

const fetchProjectTaskByIdFail = (state, action) => {
  return {
    ...state,
    error: action.error
  }
}

const deleteProjectTaskSuccess = (state, action) => {
  const newTasks = state.tasks.filter(task => task.projectSequence !== action.sequence)
  return {
    ...state,
    tasks: [...newTasks]
  }
}

const deleteProjectTaskFail = (state, action) => {
  return {
    ...state,
    error: action.error
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PROJECT_TASKS_START: return fetchProjectTasksStart(state, action)
    case actionTypes.FETCH_PROJECT_TASKS_SUCCESS: return fetchProjectTasksSuccess(state, action)
    case actionTypes.FETCH_PROJECT_TASKS_FAIL: return fetchProjectTasksFail(state, action)

    case actionTypes.FETCH_PROJECT_TASK_BY_ID_SUCCESS: return fetchProjectTaskByIdSuccess(state, action)
    case actionTypes.FETCH_PROJECT_TASK_BY_ID_FAIL: return fetchProjectTaskByIdFail(state, action)

    case actionTypes.DELETE_PROJECT_TASK_SUCCESS: return deleteProjectTaskSuccess(state, action)
    case actionTypes.DELETE_PROJECT_TASK_FAIL: return deleteProjectTaskFail(state, action)

    default:
      return state
  }
}

export default reducer