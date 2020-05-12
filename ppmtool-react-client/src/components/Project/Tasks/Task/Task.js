import React from 'react'
import { Link } from 'react-router-dom'

const Task = props => {
  const priority = ['HIGH', 'MEDIUM', 'LOW']
  const priorityClass = ['bg-danger', 'bg-warning text-dark', 'bg-info']
  const { task } = props

  const deleteProjectTask = () => {
    if (window.confirm(`Are you sure to delete project task [${task.projectSequence}]?`)) {
      props.delete()
    }
  }

  return (
    <div className="card mb-1 bg-light">
      <div className={`card-header text-light ${priorityClass[task.priority - 1]}`}>
        ID: {task.projectSequence} -- Priority: {priority[task.priority - 1]}
      </div>
      <div className="card-body bg-light">
        <h5 className="card-title">{task.summary}</h5>
        <p className="card-text text-truncate ">{task.acceptanceCriteria}</p>
        <Link
          to={`/updateProjectTask/${task.projectIdentifier}/${task.projectSequence}`}
          className="btn btn-primary"
        >
          View / Update
        </Link>
        <button className="btn btn-danger ml-4" onClick={deleteProjectTask}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default Task
