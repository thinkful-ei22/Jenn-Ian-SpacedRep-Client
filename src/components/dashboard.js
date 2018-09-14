import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchQuestion } from '../actions/questions';
import { checkAnswer } from '../actions/check-answer';
import './dashboard.css';
import HeaderBar from './header-bar';
import ResponseBoxes from './response-boxes';
import Welcome from './welcome';


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
  handleAnswerSubmit(e) {
    e.preventDefault();
    const answerObj = {
      userAnswer: e.target.answer.value,
      currentQuestionSpanish: this.props.currentQuestion.spanish,
    };

    this.setState({
      searchBtnDisabled: true
    })
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

    let answerInput = <input onChange={(e) => this.handleDisable(e)} type="text" name="answer" placeholder="your guess..." className="answer ui input"></input>;
    if (this.props.feedback !== null) {
      answerInput = '';
    }
    let submitBtn;

    if (this.props.feedback === null) {
      submitBtn = <button disabled={disabled} className="submit-answer ui button large" >Submit Answer</button>;
    }

    return (
      <div>
        <HeaderBar />
        <Welcome />
        {/* <div className="ui horizontal segments"> */}
        <div id="segment" className="ui raised segment guess">
          <h2 className="spanish-word">{spanishWord}</h2>
          <form onSubmit={(e) => this.handleAnswerSubmit(e)}>
            {answerInput}
            {submitBtn}
            <ResponseBoxes/>
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
    currentUser: state.auth.currentUser,
    userId: state.auth.currentUser._id,
    feedback: state.checkAnswer.feedback,
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
