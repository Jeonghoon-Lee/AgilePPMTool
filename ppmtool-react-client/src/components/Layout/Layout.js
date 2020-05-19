import React from 'react';
import { connect } from 'react-redux'
import Header from './Header'

function Layout(props) {
  const { isAuthenticated, user } = props
  
  return (
    <React.Fragment>
      <Header isAuthenticated={isAuthenticated} username={user.fullname} />
      {props.children}
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated,
    user: state.user.user
  }
}

export default connect(mapStateToProps)(Layout);