import React, { useEffect } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import asyncComponent from './hoc/asyncComponent/asyncComponent'

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

// import Header from './components/Layout/Header'
import Layout from './components/Layout/Layout'
import WelcomePage from './components/Layout/WelcomePage'
import Logout from './container/Users/Logout'

import * as actions from './store/actions'


const asyncDashboard = asyncComponent(() => {
  return import('./container/Dashboard')
})
const asyncCreateUpdateProjectForm = asyncComponent(() => {
  return import('./container/CreateUpdateProjectForm')
})
const asyncCreateUpdateProjectTaskForm = asyncComponent(() => {
  return import('./container/CreateUpdateProjectTaskForm')
})
const asyncProjectBoard = asyncComponent(() => {
  return import('./container/ProjectBoard')
})
const asyncLoginForm = asyncComponent(() => {
  return import('./container/Users/LoginForm')
})
const asyncRegisterForm = asyncComponent(() => {
  return import('./container/Users/RegisterForm')
})

const App = (props) => {
  const { onTryAutoSignup } = props

  useEffect(() => {
    onTryAutoSignup()
  }, [onTryAutoSignup])

  let routes = (
    <Switch>
      <Route path="/users/login" component={asyncLoginForm} />
      <Route path="/users/register" component={asyncRegisterForm} />
      <Route path="/" component={WelcomePage} exact />
      <Redirect to="/" />
    </Switch>
  )

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/dashboard" component={asyncDashboard} />
        <Route path="/addProject" component={asyncCreateUpdateProjectForm} />
        <Route path="/updateProject/:id" component={asyncCreateUpdateProjectForm} />
        <Route path="/project-board/:projectId" component={asyncProjectBoard} />
        <Route path="/addProjectTask/:projectId" component={asyncCreateUpdateProjectTaskForm} />
        <Route path="/updateProjectTask/:projectId/:taskId" component={asyncCreateUpdateProjectTaskForm} />
        <Route path="/users/logout" component={Logout} />
        <Route path="/" component={asyncDashboard} exact />
        <Redirect to="/" />
      </Switch>
    )
  }

  return (
    <div className="App">
      <Layout>
        {routes}
      </Layout>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.checkAuthState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
