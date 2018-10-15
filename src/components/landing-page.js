import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import './landing-page.css';
import LoginForm from './login-form';

export function LandingPage(props) {
  // If we are logged in redirect straight to the user's dashboard
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }
  if(props.loading){
    return(
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
        <img className="ui image sombrero" src="https://th.seaicons.com/wp-content/uploads/2015/11/Cultures-Sombrero-icon.png" alt="hat"/>
      </div>
      <div className="ui grid">
        <p className="description">Looking to take your Spanish to the next level?  <span className="app-name">¡Hablamos!</span> uses scientifically proven learning techniques to help you learn Spanish in no time!</p>
      </div>
      <div className="ui grid">
        <div id="segment" className="ui raised segment login">
          <LoginForm />
          <Link className="register-link" to="/register">Not a User? Register Here</Link>
        </div>
      </div>
    </div>
  );
}
    
const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  loading: state.auth.loading
});
    
export default connect(mapStateToProps)(LandingPage);
