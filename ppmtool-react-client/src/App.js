import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import Dashboard from './container/Dashboard'
import Header from './components/Layout/Header'
import CreateUpdateProject from './container/CreateUpdateProject'

function App() {
  let routes = (
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/addProject" component={CreateUpdateProject} />
      <Route path="/updateProject/:id" component={CreateUpdateProject} />
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
