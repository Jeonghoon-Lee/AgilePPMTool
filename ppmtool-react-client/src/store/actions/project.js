import axios from 'axios'
import * as actionTypes from './actionTypes'

export const createUpdateProjectFail = (errors) => {
  return {
    type: actionTypes.CREATE_UPDATE_PROJECT_FAIL,
    errors,
  }
}

export const fetchProjectsStart = () => {
  return {
    type: actionTypes.FETCH_PROJECTS_START,
  }
}

export const fetchProjectsSuccess = (projects) => {
  return {
    type: actionTypes.FETCH_PROJECTS_SUCCESS,
    projects,
  }
}

export const fetchProjectsFail = (errors) => {
  return {
    type: actionTypes.FETCH_PROJECTS_FAIL,
    errors,
  }
}

export const fetchProjectByProjectIdSuccess = (project) => {
  return {
    type: actionTypes.FETCH_PROJECT_BY_PROJECT_ID_SUCCESS,
    project,
  }
}

export const fetchProjectByProjectIdFail = (errors) => {
  return {
    type: actionTypes.FETCH_PROJECT_BY_PROJECT_ID_FAIL,
    errors: errors,
  }
}

export const deleteProjectSuccess = (projectIdentifier) => {
  return {
    type: actionTypes.DELETE_PROJECT_SUCCESS,
    projectIdentifier,
  }
}

export const deleteProjectFail = (error) => {
  return {
    type: actionTypes.DELETE_PROJECT_FAIL,
    error,
  }
}

export const createUpdateProject = (project, history) => {
  return async dispatch => {
    try {
      await axios.post('/api/project', project)
      history.push('/dashboard')
    } catch (err) {
      dispatch(createUpdateProjectFail(err.response.data))
    }
  }
}

export const fetchProjects = () => {
  return async dispatch => {
    dispatch(fetchProjectsStart())
    try {
      const res = await axios.get('/api/project/all')
      dispatch(fetchProjectsSuccess(res.data))
    } catch (error) {
      dispatch(fetchProjectsFail(error))
    }
  }
}

export const fetchProjectByProjectId = (projectIdentifier) => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/project/${projectIdentifier}`)
      dispatch(fetchProjectByProjectIdSuccess(res.data))
    } catch (err) {
      dispatch(fetchProjectByProjectIdFail(err.response.data))
    }
  }
}

export const deleteProjectByProjectId = (projectIdentifier, history) => {
  return async dispatch => {
    try {
      await axios.delete(`/api/project/${projectIdentifier}`)
      // dispatch(fetchProjects())
      // history.push('/dashboard')
      dispatch(deleteProjectSuccess(projectIdentifier))
    } catch (err) {
      dispatch(deleteProjectFail(err))
    }
  }
}