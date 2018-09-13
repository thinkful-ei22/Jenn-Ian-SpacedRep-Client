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

  return (
    <div className="home col-2">
      <h2 className="ui huge header">
        <img className="ui image" src="https://th.seaicons.com/wp-content/uploads/2015/11/Cultures-Sombrero-icon.png" alt="hat"/>
          <div className="content">
          ¡Bienvenido!
          </div>
      </h2>
        <p>Looking to take your Spanish to the next level?  ¡Hablamos! uses scientifically proven learning techniques to help you learn Spanish in no time!</p>
        <div id="segment" className="ui raised segment login">
        <LoginForm />
        <Link to="/register">Not a User? Register Here</Link>
        </div>
    </div>
      );
    }
    
const mapStateToProps = state => ({
        loggedIn: state.auth.currentUser !== null,
    });
    
    export default connect(mapStateToProps)(LandingPage);
