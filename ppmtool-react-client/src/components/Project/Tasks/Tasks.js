import React from 'react'
import { connect } from 'react-redux'

import Task from './Task/Task'
import CategoryTitle from './CategoryTitle'
import * as actions from '../../../store/actions'

const Tasks = props => {
  return (
    <div className="col-md-4">
      <CategoryTitle title={props.title} color={props.color} />
      {props.tasks.map(task => (
        <Task
          key={task.id}
          task={task}
          delete={() =>
            props.onDeleteProjectTaskById(
              task.projectIdentifier,
              task.projectSequence
            )
          }
        />
      ))}
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    onDeleteProjectTaskById: (projectId, taskSequence) =>
      dispatch(actions.deleteProjectTaskById(projectId, taskSequence)),
  }
}

export default connect(null, mapDispatchToProps)(Tasks)
