import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchQuestion } from '../actions/questions';
import { checkAnswer } from '../actions/check-answer';
import './dashboard.css';

export class Dashboard extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchQuestion(this.props.userId));
  }
  componentDidUpdate(){
    console.log(this.props.currentQuestion)
  }
  checkAnswer(e) {
    const answer = e.target.answer.value;
    const incorrectPopup = e.target.firstChild.nextSibling.nextSibling;
    const successPopup = e.target.firstChild.nextSibling.nextSibling.nextSibling;
    const wordDisplay = e.target.parentElement;

    if (answer === this.props.englishWord) {
      successPopup.className = 'success-popup';
      wordDisplay.className = 'word-display col-3 correct';
    }
    else {
      incorrectPopup.className = 'incorrect-popup';
      wordDisplay.className = 'word-display col-3 incorrect';
    }
  }
  nextQuestion(e) {
    const wordDisplay = e.target.parentElement.parentElement.parentElement;
    const popup = e.target.parentElement;
    if (popup.className === 'incorrect-popup') {
      popup.className = 'hidden';
      wordDisplay.className = 'word-display col-3 answering';
    }
    else if (popup.className === 'success-popup') {
      popup.className = 'hidden';
      wordDisplay.className = 'word-display col-3 answering';
    }
    //fetch next question in the list using the algorithm
  }

  handleAnswerSubmit(e) {
    e.preventDefault();
    const answerObj = {
      userAnswer: e.target.answer.value,
      currentQuestionSpanish: this.props.currentQuestion.spanish,
    }
    console.log(answerObj)
    this.props.dispatch(checkAnswer(answerObj, this.props.userId))
    //send a PUT request to /users with submitted answer
  }

  render() {
    let spanishWord;
    if( this.props.currentQuestion === null) {
      spanishWord = "loading..."
    } else {
      spanishWord = this.props.currentQuestion.spanish;
    }

    return (
      <div className="dashboard row">
        <div className="dashboard-name">
          <h2 className="welcome">Welcome to ¡Hablamos! {this.props.name}</h2>
          <h3>You're Total Score is {this.props.currentUser.score}</h3>
        </div>
        <div className="word-display col-3 answering">
          <h3 className="spanish-word">{spanishWord}</h3>

          <form onSubmit={(e) => this.handleAnswerSubmit(e)}>
            <input type="text" name="answer" className="answer"></input>
            <button className="submit-answer" >Submit Answer</button>
            {/* --------- if correct -----------*/}
            <div className="hidden" id="incorrect">
              <h4>¡Ay!</h4>
              <p>The answer is {this.props.englishWord}.
                <br></br>
                You'll get it next time!
              </p>
              <button onClick={e => this.nextQuestion(e)}>Next Word</button>
            </div>
            {/* --------- if incorrect ----------- */}
            <div className="hidden" id="success">
              <h4>¡Muy bien!</h4>
              <p>The answer is {this.props.englishWord}.
                <br></br>
                On to the next one!
              </p>
              <button onClick={e => this.nextQuestion(e)}>Next Word</button>

            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentQuestion: state.questions.currentQuestion,
    username: state.auth.currentUser.username,
    currentUser: state.auth.currentUser,
    userId: state.auth.currentUser._id,
    name: state.auth.currentUser.firstName,
    // spanishWord: state.questions.currentQuestion.spanish,
    //send just the question to front, send the user answer to the backend instead and validate there, then send response to front
    // englishWord: state.questions.currentQuestion.english,
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
