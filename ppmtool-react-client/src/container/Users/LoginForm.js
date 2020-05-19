import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Formik, Form } from 'formik'
import { isEmpty } from 'lodash'
import * as Yup from 'yup'
import * as actions from '../../store/actions'
import Input from '../../components/UI/CustomInputs/Input'

const LoginForm = (props) => {
  const { error, onClearLoginError, isAuthenticated } = props

  useEffect(() => {
    if (!isEmpty(error)) {
      alert('Invaild username and password!');
      onClearLoginError();
    }
  }, [error, onClearLoginError])

  useEffect(() => {
    if (isAuthenticated) {
      console.log('isAuthenticated');
      
      props.history.push('/dashboard')
    }
  }, [isAuthenticated, props.history])

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        username: error.username || '',
        password: error.password || '',
      }}
      validationSchema={Yup.object({
        username: Yup.string().email().required('Required'),
        password: Yup.string()
          .min(6, 'Must be 6 characters or more')
          .required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        props.onTryLogin(values)
        setSubmitting(false)
      }}
    >
      {formik => (
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Log In</h1>
                <Form>
                  <Input
                    type="email"
                    name="username"
                    placeholder="Email Address"
                  />
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
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

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    isAuthenticated: state.user.isAuthenticated,
    error: state.user.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryLogin: (user) => dispatch(actions.tryLogin(user)),
    onClearLoginError: () => dispatch(actions.clearLoginError())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
