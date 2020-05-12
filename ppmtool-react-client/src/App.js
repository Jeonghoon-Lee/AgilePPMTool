import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import Dashboard from './container/Dashboard'
import Header from './components/Layout/Header'
import CreateUpdateProjectForm from './container/CreateUpdateProjectForm'
import CreateUpdateProjectTaskForm from './container/CreateUpdateProjectTaskForm'
import ProjectBoard from './container/ProjectBoard'

function App() {
  let routes = (
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/addProject" component={CreateUpdateProjectForm} />
      <Route path="/updateProject/:id" component={CreateUpdateProjectForm} />
      <Route path="/project-board/:projectId" component={ProjectBoard} />
      <Route path="/addProjectTask/:projectId" component={CreateUpdateProjectTaskForm} />
      <Route path="/updateProjectTask/:projectId/:taskId" component={CreateUpdateProjectTaskForm} />
      <Route path="/" component={Dashboard} exact />
      <Redirect to="/" />
    </Switch>
  )

  return (
    <div className="App">
      <Header />
      {routes}
    </div>
  )
}

export default App
