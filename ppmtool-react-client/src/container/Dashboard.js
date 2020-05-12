import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actions from '../store/actions'
import Spinner from '../components/UI/Spinner/Spinner'

import ProjectItem from '../components/Project/ProjectItem/ProjectItem'
import CreateProjectButton from '../components/UI/CustomButtons/CreateProjectButton'

class Dashboard extends Component {
  componentDidMount() {
    this.props.onFetchProjects()
  }

  render() {
    let projects = <Spinner />

    if (!this.props.loading) {
      projects = (
        <React.Fragment>
          <h1 className="display-4 text-center">Projects</h1>
          <CreateProjectButton />
          <hr />
          {this.props.projects.map(project => (
            <ProjectItem
              key={project.id}
              project={project}
              delete={() =>
                this.props.onDeleteProject(
                  project.projectIdentifier,
                  this.props.history
                )
              }
            />
          ))}
        </React.Fragment>
      )
    }

    return (
      <div className="projects">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{projects}</div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    projects: state.project.projects,
    loading: state.project.loading,
    errors: state.project.errors,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchProjects: () => dispatch(actions.fetchProjects()),
    onDeleteProject: (projectIdentifier, history) =>
      dispatch(actions.deleteProjectByProjectId(projectIdentifier, history)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
