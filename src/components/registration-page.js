import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import RegistrationForm from './registration-form';

export function RegistrationPage(props) {
  // If we are logged in (which happens automatically when registration
  // is successful) redirect to the user's dashboard
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className="home col-2">
      <h2 className="ui huge header">
        <img className="ui image" src="https://th.seaicons.com/wp-content/uploads/2015/11/Cultures-Sombrero-icon.png" alt="hat" />
        <div className="content">
          ¡Bienvenido!
          </div>
      </h2>
      <p>Looking to take your Spanish to the next level?  ¡Hablamos! uses scientifically proven learning
        techniques to help you learn Spanish in no time!</p>
      <h2>Register for ¡Hablamos!</h2>
      <div id="segment" className="ui raised segment login">
      <RegistrationForm />
      <Link to="/">Already a User? Login Here</Link>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationPage);
