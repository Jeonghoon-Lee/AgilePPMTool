import axios from 'axios'
import * as actionTypes from './actionTypes'

export const fetchProjectTasksStart = () => {
  return {
    type: actionTypes.FETCH_PROJECT_TASKS_START
  }
}

export const fetchProjectTasksSuccess = (tasks) => {
  return {
    type: actionTypes.FETCH_PROJECT_TASKS_SUCCESS,
    tasks
  }
}

export const fetchProjectTasksFail = (error) => {
  return {
    type: actionTypes.FETCH_PROJECT_TASKS_FAIL,
    error
  }
}

export const createUpdateProjectTaskFail = (error) => {
  return {
    type: actionTypes.CREATE_UPDATE_PROJECT_TASK_FAIL,
    error
  }
}

export const fetchProjectTaskByIdSuccess = (task) => {
  return {
    type: actionTypes.FETCH_PROJECT_TASK_BY_ID_SUCCESS,
    task
  }
}

export const fetchProjectTaskByIdFail = (error) => {
  return {
    type: actionTypes.FETCH_PROJECT_TASK_BY_ID_FAIL,
    error
  }
}

export const deleteProjectTaskSuccess = (taskSequence) => {
  return {
    type: actionTypes.DELETE_PROJECT_TASK_SUCCESS,
    sequence: taskSequence
  }
}

export const deleteProjectTaskFail = (error) => {
  return {
    type: actionTypes.DELETE_PROJECT_TASK_FAIL,
    error
  }
}

export const createProjectTask = (projectId, projectTask, history) => {
  return async dispatch => {
    try {
      await axios.post(`/api/project-task/${projectId}`, projectTask)
      history.push(`/project-board/${projectId}`)
    } catch (err) {
      dispatch(createUpdateProjectTaskFail(err.response.data))
    }
  }
}

export const fetchProjectTasks = (projectIdentifier) => {
  return async dispatch => {
    dispatch(fetchProjectTasksStart())
    try {
      const res = await axios.get(`http://localhost:8080/api/project-task/${projectIdentifier}`)
      dispatch(fetchProjectTasksSuccess(res.data))
    } catch (error) {
      dispatch(fetchProjectTasksFail(error.response.data))
    }
  }
}

export const fetchProjectTaskById = (projectId, taskSequence) => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/project-task/${projectId}/${taskSequence}`)
      dispatch(fetchProjectTaskByIdSuccess(res.data))
    } catch (err) {
      dispatch(fetchProjectTaskByIdFail(err.response.data))
    }
  }
}

export const deleteProjectTaskById = (projectId, taskSequence) => {
  return async dispatch => {
    try {
      await axios.delete(`/api/project-task/${projectId}/${taskSequence}`)
      dispatch(deleteProjectTaskSuccess(taskSequence))
    } catch (err) {
      dispatch(deleteProjectTaskFail(err))
    }
  }  
}

export const updateProjectTask = (projectId, taskId, projectTask, history) => {
  return async dispatch => {
    try {
      await axios.patch(`/api/project-task/${projectId}/${taskId}`, projectTask)
      history.push(`/project-board/${projectId}`)
    } catch (err) {
      dispatch(createUpdateProjectTaskFail(err.response.data))
    }
  }
}