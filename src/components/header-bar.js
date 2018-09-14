import React from 'react';
import { connect } from 'react-redux';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';
import './header-bar.css';

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
      <div>
        <div className="ui inverted menu">
          <div className="header item">
            ¡Hablamos!
          </div>
          <a className="item" href="/dashboard">
            Practice
          </a>
          <a className="item" href="/stats">
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
