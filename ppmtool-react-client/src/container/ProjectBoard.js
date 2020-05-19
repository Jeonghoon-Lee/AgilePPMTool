import React, { Component } from 'react'
import { connect } from 'react-redux'

import Spinner from '../components/UI/Spinner/Spinner'
import CreateProjectTaskButton from '../components/UI/CustomButtons/CreateProjectTaskButton'
import { isEqual, isEmpty } from 'lodash'
import * as actions from '../store/actions'
import Tasks from '../components/Project/Tasks/Tasks'
import { Redirect } from 'react-router-dom'

class ProjectBoard extends Component {
  componentDidMount() {
    const { projectId } = this.props.match.params
    if (projectId !== undefined) {
      this.props.onFetchProjectByProjectId(projectId)
      this.props.onFetchProjectTasks(projectId)
    }
  }

  render() {
    let projectTasks = <Spinner />

    // check invalid 
    console.log('props', this.props);
    if (!this.props.isAuthenticated) {
      console.log('redirect', this.props.isAuthenticated);
      return(<Redirect to="/" />)
    }

    if (!this.props.loading) {
      if (!isEmpty(this.props.error)) {
        projectTasks = (
          <div className="alert alert-danger text-center">
            {this.props.error.projectNotFound}
          </div>
        )
      } else {
        let tasksBoard = (
          <div className="alert alert-info text-center">
            No Project Tasks on this board
          </div>
        )
        if (!isEmpty(this.props.tasks)) {
          tasksBoard = (
            <div className="row">
              <Tasks
                title="TO DO"
                color="bg-secondary"
                tasks={this.props.tasks.filter(task =>
                  isEqual(task.status, 'TODO')
                )}
              />
              <Tasks
                title="In Progress"
                color="bg-primary"
                tasks={this.props.tasks.filter(task =>
                  isEqual(task.status, 'IN_PROGRESS')
                )}
              />
              <Tasks
                title="Done"
                color="bg-success"
                tasks={this.props.tasks.filter(task =>
                  isEqual(task.status, 'DONE')
                )}
              />
            </div>
          )
        }
        projectTasks = (
          <React.Fragment>
            <CreateProjectTaskButton
              projectId={this.props.match.params.projectId}
            />
            <hr />
            {tasksBoard}
          </React.Fragment>
        )
      }
    }
    return <div className="container">{projectTasks}</div>
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.backlog.tasks,
    project: state.project.project,
    loading: state.backlog.loading,
    error: state.backlog.error,
    isAuthenticated: state.user.isAuthenticated
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchProjectByProjectId: projectIdentifier =>
      dispatch(actions.fetchProjectByProjectId(projectIdentifier)),
    onFetchProjectTasks: projectIdentifier =>
      dispatch(actions.fetchProjectTasks(projectIdentifier)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectBoard)
