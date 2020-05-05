import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import Dashboard from './components/Dashboard'
import Header from './components/Layout/Header'
import AddProject from './components/Project/AddProject'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/addProject" component={AddProject} />
      </div>
    </BrowserRouter>
  )
}

export default App
