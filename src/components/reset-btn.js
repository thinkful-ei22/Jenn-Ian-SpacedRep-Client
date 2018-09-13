import React from 'react';
import { connect } from 'react-redux';
import { clearSession, clearFeedback } from '../actions/check-answer';
import { fetchQuestion } from '../actions/questions';

export class ResetBtn extends React.Component {
  handleReset() {
    console.log('RESET BUTTON');
    this.props.dispatch(clearSession());
    this.props.dispatch(fetchQuestion(this.props.userId));
    this.props.dispatch(clearFeedback());
  }

  render() {
        return (
            <button className="huge ui button" onClick={() => this.handleReset()}>Start a New Session</button>
        );
    }
}

const mapStateToProps = state => ({
  userId: state.auth.currentUser._id,
  sessionCorrect: state.checkAnswer.totalCorrect,
  sessionAnswered: state.checkAnswer.totalAnswered
});

export default connect(mapStateToProps)(ResetBtn);
