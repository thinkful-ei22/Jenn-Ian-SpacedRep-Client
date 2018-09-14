import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchQuestion } from '../actions/questions';
// import { Link, Redirect } from 'react-router-dom';
import { checkAnswer, clearFeedback } from '../actions/check-answer';
import ResetBtn from './reset-btn';
import './dashboard.css';
import HeaderBar from './header-bar';

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBtnDisabled: true
    };
  }
  componentDidMount() {
    this.props.dispatch(fetchQuestion(this.props.userId));
  }

  nextQuestion() {
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
    this.props.dispatch(checkAnswer(answerObj, this.props.userId));
  }

  handleDisable(e) {
    if (e.target.value !== '') {
      this.setState({
        searchBtnDisabled: false
      });
    } else {
      this.setState({
        searchBtnDisabled: true
      });
    }
  }

  render() {
    let disabled = true;
    if(this.state.searchBtnDisabled === false) {
      disabled = false;
    }

    let spanishWord;
    if (this.props.currentQuestion === null) {
      spanishWord = 'loading...';
    } else {
      spanishWord = this.props.currentQuestion.spanish;
    }
    let sessionScore;
    if (isNaN((this.props.correct / this.props.total) * 100)) {
      sessionScore = <h3>Your Session Score is {`${0}%`}</h3>;
    }
    else if (!isNaN((this.props.correct / this.props.total) * 100)) {
      sessionScore = <h3>Your Session Score is {this.props.correct} out of {this.props.total} or {`${Math.round((this.props.correct / this.props.total) * 100)}%`}</h3>;
    }
    let correctMessage;
    let incorrectMessage;
    let answerInput = <input onChange={(e) => this.handleDisable(e)} type="text" name="answer" placeholder="your guess..." className="answer ui input"></input>;

    if (this.props.feedback !== null && this.props.feedback.feedback === true) {
      answerInput = '';
      correctMessage =
        <div className="ui green inverted segment" id="success">
          <h3>¡Muy bien!</h3>
          <p>The answer is {this.props.feedback.correctAnswer}.
            <br></br>
            On to the next one!
          </p>
          <button className="ui button large" onClick={() => this.nextQuestion()}>Next Word</button>
        </div>;
    } else if (this.props.feedback !== null && this.props.feedback.feedback === false) {
      answerInput = '';
      incorrectMessage =
        <div className="ui red inverted segment" id="incorrect">
          <h3>¡Ay!</h3>
          <p>The answer is {this.props.feedback.correctAnswer}.
            <br></br>
            You'll get it next time!
          </p>
          <button className="ui button large" onClick={e => this.nextQuestion(e)}>Next Word</button>
        </div>;

    }
    let submitBtn;

    if (this.props.feedback === null) {
      submitBtn = <button disabled={disabled} className="submit-answer ui button large" >Submit Answer</button>;
    }
    let score;
    if (this.props.currentUser !== null && this.props.currentUser.questionsAnswered !== 0 && this.props.total === 0) {
      score = Math.floor(100 * (this.props.currentUser.questionsCorrect / this.props.currentUser.questionsAnswered));
    } else if (this.props.currentUser !== null && this.props.currentUser.questionsAnswered === 0 && this.props.total === 0) {
      score = 0;
    } else {
      score = Math.floor(100 * (this.props.overallCorrect / this.props.overallAnswered));
    }

    return (
      <div>
        <HeaderBar />
        <div className="dashboard row">
          <div id="welcome" className="dashboard-name">
            <h1 className="welcome">Welcome to ¡Hablamos! {this.props.name}</h1>
            <h3>Your Overall Score is {score} %</h3>
            {sessionScore}
            <ResetBtn />
          </div>
        </div>
        {/* <div className="ui horizontal segments"> */}
        <div id="segment" className="word-display col-3 answering ui raised segment">
          <h2 className="spanish-word">{spanishWord}</h2>
          <form onSubmit={(e) => this.handleAnswerSubmit(e)}>
            {answerInput}
            {submitBtn}
            {incorrectMessage}
            {correctMessage}
          </form>
        </div>
      </div>
      // </div>
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
    overallAnswered: state.checkAnswer.overallAnswered,
    overallCorrect: state.checkAnswer.overallCorrect
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
