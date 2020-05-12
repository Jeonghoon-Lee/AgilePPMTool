import React from 'react'
import { Link } from 'react-router-dom'

const CreateProjectTaskButton = (props) => {
  return (
    <div>
      <Link to={`/addProjectTask/${props.projectId}`} className="btn btn-primary mb-3">
        <i className="fas fa-plus-circle"> Create Project Task</i>
      </Link>
    </div>
  );
};

export default CreateProjectTaskButton