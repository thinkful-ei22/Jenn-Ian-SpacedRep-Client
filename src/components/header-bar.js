import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import './header-bar.css';

export class HeaderBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loggingOut: false
    };
  }

  logOut() {
    this.setState({
      loggingOut: true
    })
    setTimeout(() => {
      this.props.dispatch(clearAuth());
      clearAuthToken();
    }, 2000)
  }

  render() {
    let loggingOutMessage;
    if(this.state.loggingOut === true) {
      loggingOutMessage = <h3>Logging Out, See You Next Time!</h3>
    }

    // Only render the log out button if we are logged in
    let logOutButton;
    if (this.props.loggedIn) {
      logOutButton = (
        <button onClick={() => this.logOut()}>Log out</button>
      );
    }
    return (
      <div className="header-bar row">
        <h1>¡Hablamos!</h1>
        {logOutButton}
        {loggingOutMessage}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
