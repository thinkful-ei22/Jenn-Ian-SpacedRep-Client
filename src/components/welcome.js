import React from 'react';
import { connect } from 'react-redux';
import ResetBtn from './reset-btn';
import './welcome.css';

export class Welcome extends React.Component {
  render() {
    let score;
    if (this.props.currentUser !== null && this.props.currentUser.questionsAnswered !== 0 && this.props.total === 0) {
      score = Math.floor(100 * (this.props.currentUser.questionsCorrect / this.props.currentUser.questionsAnswered));
    } else if (this.props.currentUser !== null && this.props.currentUser.questionsAnswered === 0 && this.props.total === 0) {
      score = 0;
    } else {
      score = Math.floor(100 * (this.props.overallCorrect / this.props.overallAnswered));
    }

    let sessionScore;
    if (isNaN((this.props.correct / this.props.total) * 100)) {
      sessionScore = <h3 className="session-score">Your Session Score is <span>{`${0}%`}</span></h3>;
    }
    else if (!isNaN((this.props.correct / this.props.total) * 100)) {
      sessionScore = <h3 className="session-score">Your Session Score is {this.props.correct} out of {this.props.total} or <span>{`${Math.round((this.props.correct / this.props.total) * 100)}%`}</span></h3>;
    }
    return (
      <div className="ui grid row">
        <div id="welcome" className="dashboard-name">
          <h1 className="welcome">Welcome to ¡Hablamos! {this.props.name}</h1>
          <div className="progress-box">
            <h3 className="overall-score">Your Overall Score is <span>{score}%</span></h3>
            {sessionScore}
          </div>
          <ResetBtn />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.auth.currentUser._id,
  name: state.auth.currentUser.firstName,
  currentUser: state.auth.currentUser,
  total: state.checkAnswer.totalAnswered,
  correct: state.checkAnswer.totalCorrect,
  overallAnswered: state.checkAnswer.overallAnswered,
  overallCorrect: state.checkAnswer.overallCorrect
});

export default connect(mapStateToProps)(Welcome);
