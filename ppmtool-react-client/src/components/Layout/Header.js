import React from 'react'
import { Link } from 'react-router-dom'

const Header = (props) => {
  let menu = (
    <React.Fragment>
      <li className="nav-item">
        <Link className="nav-link " to="/users/register">
          Sign Up
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/users/login">
          Login
        </Link>
      </li>
    </React.Fragment>
  )

  if (props.isAuthenticated) {
    menu = (
      <React.Fragment>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            <i className="fas fa-user-circle mr-1" />{props.username}
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/users/logout">
            Logout
          </Link>
        </li>
      </React.Fragment>
    )
  }

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand text-warning" to="/">
          Personal Project Management
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mobile-nav">
          <ul className="navbar-nav ml-auto">
            {menu}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header
