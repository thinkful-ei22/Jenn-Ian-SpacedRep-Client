import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchQuestion } from '../actions/questions';
import { checkAnswer, clearFeedback} from '../actions/check-answer';
import './dashboard.css';

export class Dashboard extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchQuestion(this.props.userId));
  }
  componentDidUpdate() {
    console.log(this.props.currentQuestion);
  }
  nextQuestion(e) {
    const wordDisplay = e.target.parentElement.parentElement.parentElement;
    const popup = e.target.parentElement;
    if (popup.className === 'incorrect-popup') {
      popup.className = 'hidden';
      wordDisplay.className = 'word-display col-3 answering';
      // this.props.dispatch(updateScoreIncorrect());
    }
    else if (popup.className === 'success-popup') {
      popup.className = 'hidden';
      wordDisplay.className = 'word-display col-3 answering';
      // this.props.dispatch(updateScoreCorrect());
    }
    this.props.dispatch(fetchQuestion(this.props.userId));
    this.props.dispatch(clearFeedback());

  }

  handleAnswerSubmit(e) {
    e.preventDefault();
    const answerObj = {
      userAnswer: e.target.answer.value,
      currentQuestionSpanish: this.props.currentQuestion.spanish,
    };
    e.target.answer.value = '';
    console.log(answerObj, this.props.userId);
    this.props.dispatch(checkAnswer(answerObj, this.props.userId));
  }

  render() {
    let spanishWord;
    if (this.props.currentQuestion === null) {
      spanishWord = 'loading...';
    } else {
      spanishWord = this.props.currentQuestion.spanish;
    }
    let sessionScore;
    if(isNaN((this.props.correct/this.props.total)*100)){
      sessionScore = <h3>Your Session Score is {`${0}%`}</h3>;
    }
    else if (!isNaN((this.props.correct/this.props.total)*100)){
      sessionScore = <h3>Your Session Score is {`${Math.round((this.props.correct/this.props.total)*100)}%`}</h3>;
    }
    let correctMessage;
    let incorrectMessage;
    
    if (this.props.feedback !== null && this.props.feedback.feedback === true) {
      correctMessage =
        <div className="success-popup" id="success">
          <h4>¡Muy bien!</h4>
          <p>The answer is {this.props.feedback.correctAnswer}.
            <br></br>
            On to the next one!
          </p>
          <button onClick={e => this.nextQuestion(e)}>Next Word</button>
        </div>;
    } else if (this.props.feedback !== null && this.props.feedback.feedback === false){
      incorrectMessage =
        <div className="incorrect-popup" id="incorrect">
          <h4>¡Ay!</h4>
          <p>The answer is {this.props.feedback.correctAnswer}.
            <br></br>
            You'll get it next time!
          </p>
          <button onClick={e => this.nextQuestion(e)}>Next Word</button>
        </div>;
     
    }
    let submitBtn;
    
    if (this.props.feedback === null) {
      submitBtn = <button className="submit-answer" >Submit Answer</button>;
    }

    return (
      <div className="dashboard row">
        <div className="dashboard-name">
          <h2 className="welcome">Welcome to ¡Hablamos! {this.props.name}</h2>
          <h3>Your Total Score is {this.props.currentUser.score}</h3>
          {sessionScore}
        </div>
        <div className="word-display col-3 answering">
          <h3 className="spanish-word">{spanishWord}</h3>

          <form onSubmit={(e) => this.handleAnswerSubmit(e)}>
            <input type="text" name="answer" className="answer"></input>
            {submitBtn}
            {incorrectMessage}
            {correctMessage}
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
    feedback: state.checkAnswer.feedback,
    total: state.checkAnswer.totalAnswered,
    correct: state.checkAnswer.totalCorrect,
    // spanishWord: state.questions.currentQuestion.spanish,
    //send just the question to front, send the user answer to the backend instead and validate there, then send response to front
    // englishWord: state.questions.currentQuestion.english,
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
