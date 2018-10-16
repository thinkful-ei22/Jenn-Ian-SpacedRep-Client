import React from 'react';
import { connect } from 'react-redux';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';
import './header-bar.css';
import { togglePerformance } from '../actions/performance';

export class HeaderBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggingOut: false
    };
  }

  logOut() {
    this.setState({
      loggingOut: true
    });
    setTimeout(() => {
      this.props.dispatch(clearAuth());
      clearAuthToken();
      this.setState({
        loggingOut: false
      });
    }, 2000);
  }

  handlePerformanceToggle(){
    this.props.dispatch(togglePerformance('performance'));
  }
  handlePracticeToggle(){
    this.props.dispatch(togglePerformance('practice'));
  }
  render() {
    let loggingOutMessage;
    if (this.state.loggingOut === true && this.props.loggedIn) {
      loggingOutMessage = <div className="logout-message"><h3 className="goodbye">¡Adios! See You Next Time!</h3></div>;
    }

    // Only render the log out button if we are logged in
    let logOutButton;
    if (this.props.loggedIn) {
      logOutButton = (
        <a className="item" onClick={() => this.logOut()}>Log out</a>
      );
    }
    return (
      <div role="navigation">
        <div id="header" className="ui inverted stackable menu">
          <div className="header item">
            ¡Hablamos!
          </div>
          <a className="item" onClick={() => this.handlePracticeToggle()}>
            Practice
          </a>
          <a className="item" onClick={() => this.handlePerformanceToggle()}>
            Performance
          </a>
          {logOutButton}
        </div>
        {loggingOutMessage}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
