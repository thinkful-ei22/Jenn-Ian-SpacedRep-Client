import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import RegistrationForm from './registration-form';
import hatImage from '../images/sombrero-icon.png';
import './registration-page.css';

export function RegistrationPage(props) {
  // If we are logged in (which happens automatically when registration
  // is successful) redirect to the user's dashboard
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }
  if(props.loading){
    return (
      <div className="home row">
        <div className="ui huge icon header">  
          <h1 className="content welcome">
          Please wait...
          </h1>  
        </div>
      </div>
    );
  }
  return (
    <div className="home row">
      <div className="ui huge icon header">  
        <h1 className="content welcome">
          ¡Bienvenido!
        </h1>  
        <img className="ui image sombrero" src={hatImage} alt="hat"/>
      </div>
      <div classname="ui grid">
        <p className="description">Looking to take your Spanish to the next level?  <span className="app-name">¡Hablamos!</span> uses scientifically proven learning
        techniques to help you learn Spanish in no time!</p>
      </div>
      <h2 className="register">Register for ¡Hablamos!</h2>
      <div className="ui grid">
        <div id="segment" className="ui raised segment login">
          <RegistrationForm />
          <Link className="login-link" to="/">Already a User? Login Here</Link>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  loading: state.auth.loading
});

export default connect(mapStateToProps)(RegistrationPage);
