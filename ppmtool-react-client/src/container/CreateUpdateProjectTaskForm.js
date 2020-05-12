import React, { useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Formik, Form } from 'formik'
import { isEmpty } from 'lodash'
import * as Yup from 'yup'
import * as actions from '../store/actions'
import Input from '../components/UI/CustomInputs/Input'
import Textarea from '../components/UI/CustomInputs/Textarea'
import Select from '../components/UI/CustomInputs/Select'

const CreateUpdateProjectTaskForm = props => {
  const { projectId, taskId } = props.match.params

  useEffect(() => {
    if (taskId !== undefined) {
      props.onFetchProjectTaskById(projectId, taskId)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // check invalid path
  if (isEmpty(props.project)) {
    return <Redirect to={`/dashboard`} />
  }

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        id: props.task.id,
        projectSequence: props.task.projectSequence,
        projectIdentifier: props.task.projectIdentifier,
        summary: props.task.summary || '',
        acceptanceCriteria: props.task.acceptanceCriteria || '',
        dueDate: props.task.dueDate || '',
        priority: props.task.priority || '',
        status: props.task.status || '',
      }}
      validationSchema={Yup.object({
        summary: Yup.string()
          .max(100, 'Must be 100 characters or less')
          .required('Required'),
        acceptanceCriteria: Yup.string(),
        dueDate: Yup.date(),
        priority: Yup.string()
          .oneOf(['1', '2', '3']),
        status: Yup.string()
          .oneOf(['TODO', 'IN_PROGRESS', 'DONE']),
      })}
      onSubmit={(values, { setSubmitting }) => {
        if (values.id === undefined) {
          props.onCreateProjectTask(projectId, values, props.history)
        } else {
          props.onUpdateProjectTask(projectId, taskId, values, props.history)
        }
        setSubmitting(false)
      }}
    >
      { formik => (
        <div className="add-PBI">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <Link to={`/project-board/${projectId}`} className="btn btn-light">
                  Back to Project Board
                </Link>
                <h4 className="display-4 text-center">
                  {taskId === undefined ? 'ADD ' : 'UPDATE '}Project Task
                  <p className="lead text-center">
                    {props.project.projectName}
                    {props.task.projectSequence && (' / ' + props.task.projectSequence)}
                  </p>
                </h4>
                <Form>
                  <Input 
                    error={props.error.summary} 
                    name="summary"
                    type="text"
                    placeholder="Project Task summary"
                  />
                  <Textarea
                    name="acceptanceCriteria"
                    placeholder="Acceptance Criteria"
                  />
                  <Input label="Due Date" name="dueDate" type="date" />
                  <Select name="priority">
                    <option value="0">Select Priority</option>
                    <option value="1">High</option>
                    <option value="2">Medium</option>
                    <option value="3">Low</option>
                  </Select>
                  <Select name="status">
                    <option value="">Select Status</option>
                    <option value="TODO">TO DO</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </Select>
                  <button
                    type="submit"
                    className="btn btn-primary btn-block mt-4"
                    disabled={formik.isSubmitting}
                  >
                    {taskId !== undefined ? 'UPDATE' : 'CREATE'}
                  </button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  )
}

const mapStateToProps = state => {
  return {
    task: state.backlog.task,
    project: state.project.project,
    error: state.backlog.error,
  }
}

const mapDispatchToProp = dispatch => {
  return {
    onCreateProjectTask: (projectId, task, history) => dispatch(actions.createProjectTask(projectId, task, history)),
    onUpdateProjectTask: (projectId, taskId, task, history) => dispatch(actions.updateProjectTask(projectId, taskId, task, history)),
    onFetchProjectTaskById: (projectId, taskSequence) => dispatch(actions.fetchProjectTaskById(projectId, taskSequence)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProp
)(CreateUpdateProjectTaskForm)
