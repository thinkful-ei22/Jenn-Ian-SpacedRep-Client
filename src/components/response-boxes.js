import React from 'react';
import { connect } from 'react-redux';
import { clearFeedback } from '../actions/check-answer';
import { fetchQuestion } from '../actions/questions';
import './response-boxes.css';

export class ResponseBoxes extends React.Component {
  nextQuestion() {
    this.props.dispatch(fetchQuestion(this.props.userId));
    this.props.dispatch(clearFeedback());
  }

  render() {
    let correctMessage;
    let incorrectMessage;
    if (this.props.feedback !== null && this.props.feedback.feedback === true) {
      // answerInput = '';
      correctMessage =
                <div className="ui answer inverted green segment" id="correct">
                  <h3>¡Muy bien!</h3>
                  <p>The answer is {this.props.feedback.correctAnswer}.
                    <br></br>
                        On to the next one!
                  </p>
                  <button className="ui button large" onClick={() => this.nextQuestion()}>Next Word</button>
                </div>;
    } else if (this.props.feedback !== null && this.props.feedback.feedback === false) {
      // answerInput = '';
      incorrectMessage =
                <div className="ui answer inverted red segment" id="incorrect">
                  <h3>¡Ay!</h3>
                  <p>The answer is {this.props.feedback.correctAnswer}.
                    <br></br>
                        You'll get it next time!
                  </p>
                  <button className="ui button large" onClick={e => this.nextQuestion(e)}>Next Word</button>
                </div>;
    }
    return (
      <div className="response-boxes">
        {incorrectMessage}
        {correctMessage}
      </div>
    );
        
  }
}

const mapStateToProps = state => ({
  userId: state.auth.currentUser._id,
  feedback: state.checkAnswer.feedback,
});

export default connect(mapStateToProps)(ResponseBoxes);
