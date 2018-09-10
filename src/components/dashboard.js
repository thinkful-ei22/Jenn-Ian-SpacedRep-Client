import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import { fetchWord } from '../actions/words';
import './dashboard.css';

export class Dashboard extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchWord());
  }

  render() {
    return (
      <div className="dashboard row">
        <div className="dashboard-name">
          <h2 className="welcome">Welcome to ¡Hablamos! {this.props.name}</h2>
        </div>
        <div className="word-display col-3">
          <h3 className="spanish-word">Spanish Word Here</h3>
          <input type="text" name="answer" className="answer"></input>
          <button className="submit-answer" onClick={()=>this.props.dispatch(fetchWord())}>Submit Answer</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {currentUser} = state.auth;
  return {
    username: state.auth.currentUser.username,
    name: `${currentUser.firstName}`,
    protectedData: state.protectedData.data
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
