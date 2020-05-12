import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Formik, Form } from 'formik'
import { isEmpty } from 'lodash'

import Input from '../components/UI/CustomInputs/Input'
import Textarea from '../components/UI/CustomInputs/Textarea'
import * as Yup from 'yup'
import * as actions from '../store/actions'
import { Redirect } from 'react-router-dom'

const CreateUpdateProjectForm = props => {
  const { id } = props.match.params
  useEffect(() => {
    // in case of Update Project
    if (id !== undefined) {
      props.onFetchProjectByProjectId(id)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // check invalid path
  if (id !== undefined && !isEmpty(props.errors))
    return(<Redirect to="/" />)

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        id: props.project.id,
        projectName: props.project.projectName || '',
        projectIdentifier: props.project.projectIdentifier || '',
        description: props.project.description || '',
        startDate: props.project.startDate || '',
        endDate: props.project.endDate || '',
      }}
      validationSchema={Yup.object({
        projectName: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
        projectIdentifier: Yup.string()
          .min(4, 'Must be 4 or 5 characters')
          .max(5, 'Must be 4 or 5 characters')
          .required('Required'),
        description: Yup.string().required('Required'),
        startDate: Yup.date(),
        endDate: Yup.date(),
      })}
      onSubmit={(values, { setSubmitting }) => {
        props.onCreateUpdateProject(values, props.history)
        setSubmitting(false)
      }}
    >
      {formik => (
        <div className="project">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h5 className="display-4 text-center">
                  {id !== undefined ? 'Update ' : 'Create '}Project
                </h5>
                <hr />
                <Form>
                  <Input
                    error={props.errors.projectName}
                    name="projectName"
                    type="text"
                    placeholder="Project Name"
                  />
                  <Input
                    error={props.errors.projectIdentifier}
                    name="projectIdentifier"
                    type="text"
                    placeholder="Project Identifier"
                    disabled={id !== undefined}
                  />
                  <Textarea
                    error={props.errors.description}
                    name="description"
                    type="text"
                    placeholder="description"
                  />
                  <Input label="Start Date" name="startDate" type="date" />
                  <Input label="End Date" name="endDate" type="date" />
                  <button
                    type="submit"
                    className="btn btn-primary btn-block mt-4"
                    disabled={formik.isSubmitting}
                  >
                    {id !== undefined ? 'UPDATE' : 'CREATE'}
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
    errors: state.project.errors,
    project: state.project.project,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCreateUpdateProject: (project, history) =>
      dispatch(actions.createUpdateProject(project, history)),
    onFetchProjectByProjectId: projectIdentifier =>
      dispatch(actions.fetchProjectByProjectId(projectIdentifier)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateUpdateProjectForm)
