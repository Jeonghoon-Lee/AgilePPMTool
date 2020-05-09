import * as actionTypes from '../actions/actionTypes'

const initialState = {
  projects: [],
  project: {},
  loading: false,
  errors: {},
}

const createUpdateProjectFail = (state, action) => {
  return {
    ...state,
    errors: action.errors,
  }
}

const fetchProjectsStart = (state, action) => {
  return {
    ...state,
    loading: true,
    errors: {},
  }
}

const fetchProjectsSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    projects: [...action.projects],
    errors: {},
  }
}

const fetchProjectsFail = (state, action) => {
  return {
    ...state,
    loading: false,
    errors: action.errors,
  }
}

const fetchProjectByProjectIdSuccess = (state, action) => {
  return {
    ...state,
    project: action.project,
  }
}

const fetchProjectByProjectIdFail = (state, action) => {
  return {
    ...state,
    errors: action.errors,
  }
}

const deleteProjectSuccess = (state, action) => {
  const newProjects = state.projects.filter(
    project => project.projectIdentifier !== action.projectIdentifier
  )
  return {
    ...state,
    projects: [...newProjects]
  }
}

const deleteProjectFail = (state, action) => {
  return {
    ...state,
    errors: action.error,
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_UPDATE_PROJECT_FAIL:
      return createUpdateProjectFail(state, action)

    case actionTypes.FETCH_PROJECTS_START:
      return fetchProjectsStart(state, action)
    case actionTypes.FETCH_PROJECTS_SUCCESS:
      return fetchProjectsSuccess(state, action)
    case actionTypes.FETCH_PROJECTS_FAIL:
      return fetchProjectsFail(state, action)

    case actionTypes.FETCH_PROJECT_BY_PROJECT_ID_SUCCESS:
      return fetchProjectByProjectIdSuccess(state, action)
    case actionTypes.FETCH_PROJECT_BY_PROJECT_ID_FAIL:
      return fetchProjectByProjectIdFail(state, action)

    case actionTypes.DELETE_PROJECT_SUCCESS:
      return deleteProjectSuccess(state, action)
    case actionTypes.DELETE_PROJECT_FAIL:
      return deleteProjectFail(state, action)

    default:
      return state
  }
}

export default reducer
