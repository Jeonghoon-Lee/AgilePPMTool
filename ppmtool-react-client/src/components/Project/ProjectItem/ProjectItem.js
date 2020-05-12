import React from 'react'
import { Link } from 'react-router-dom'

const ProjectItem = (props) => {
  const { projectIdentifier, projectName, description } = props.project

  const deleteProject = () => {
    if (window.confirm(`Are you sure to delete project [${projectName}]?`)) {
      props.delete()
    }
  }  

  return (
    <div className="container">
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <span className="mx-auto">{projectIdentifier}</span>
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{projectName}</h3>
            <p>{description}</p>
          </div>
          <div className="col-md-4 d-none d-lg-block">
            <ul className="list-group">
              <li className="list-group-item board">
                <Link to={`/project-board/${projectIdentifier}`}>
                  <i className="fa fa-flag-checkered pr-1"> Project Board </i>
                </Link>
              </li>
              <li className="list-group-item update">
                <Link to={`/updateProject/${projectIdentifier}`}>
                  <i className="fa fa-edit pr-1"> Update Project Info</i>
                </Link>
              </li>
              <li className="list-group-item delete" onClick={deleteProject}>
                <i className="fa fa-minus-circle pr-1"> Delete Project</i>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectItem
