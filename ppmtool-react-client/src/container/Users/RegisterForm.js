import React from 'react'
import { connect } from 'react-redux'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import * as actions from '../../store/actions'
import Input from '../../components/UI/CustomInputs/Input'

const RegisterForm = (props) => {
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        username: '',
        fullname: '',
        password: '',
        confirmpassword: '',
      }}
      validationSchema={Yup.object({
        username: Yup.string().email().required('Required'),
        fullname: Yup.string().required('Required'),
        password: Yup.string()
          .min(6, 'Must be 6 characters or more')
          .required('Required'),
        confirmpassword: Yup.string()
          .oneOf([Yup.ref("password"), null], 'Both password must match.')
          .required('Required')
      })}
      onSubmit={(values, { setSubmitting }) => {
        props.onCreateUser(values, props.history)
        setSubmitting(false)
      }}
    >
      {formik => (
        <div className="register">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Sign Up</h1>
                <p className="lead text-center">Create Your Account</p>
                <Form>
                  <Input
                    type="email"
                    name="username"
                    placeholder="Email Address"
                    error={props.error.username}
                  />
                  <Input
                    type="text"
                    name="fullname"
                    placeholder="Full Name"
                    error={props.error.fullname}
                  />
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    error={props.error.password}
                  />
                  <Input
                    type="password"
                    name="confirmpassword"
                    placeholder="Confirm Password"
                    error={props.error.confirmpassword}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary btn-block mt-4"
                    disabled={formik.isSubmitting}
                  >
                    LOGIN
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
    user: state.user.user,
    error: state.user.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateUser: (user, history) => dispatch(actions.createNewUser(user, history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)
