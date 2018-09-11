import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import { fetchQuestion } from '../actions/questions';
import './dashboard.css';

export class Dashboard extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchQuestion());
  }
  checkAnswer(e){
    const answer = e.target.answer.value;
    const incorrectPopup = e.target.firstChild.nextSibling.nextSibling;
    const successPopup = e.target.firstChild.nextSibling.nextSibling.nextSibling;
    const wordDisplay = e.target.parentElement;

    if(answer === this.props.englishWord){
      successPopup.className='success-popup';
      wordDisplay.className='word-display col-3 correct';
    }
    else {
      incorrectPopup.className='incorrect-popup';
      wordDisplay.className='word-display col-3 incorrect';
    }
  }
  nextQuestion(e){
    const wordDisplay = e.target.parentElement.parentElement.parentElement;
    const popup = e.target.parentElement;
    if(popup.className==='incorrect-popup'){
      popup.className='hidden';
      wordDisplay.className='word-display col-3 answering';
    }
    else if(popup.className==='success-popup'){
      popup.className='hidden';
      wordDisplay.className='word-display col-3 answering';
    }
    //fetch next question in the list using the algorithm
  }
  render() {
    return (
      <div className="dashboard row">
        <div className="dashboard-name">
          <h2 className="welcome">Welcome to ¡Hablamos! {this.props.name}</h2>
        </div>
        <div className="word-display col-3 answering">
          <h3 className="spanish-word">{this.props.spanishWord}</h3>
          <form onSubmit={(e)=>{
            e.preventDefault();
            this.props.dispatch(fetchQuestion());
            this.checkAnswer(e);
          }
          }>
            <input type="text" name="answer" className="answer"></input>
            <button className="submit-answer" >Submit Answer</button>
            <div className="hidden" id="incorrect">
              <h4>¡Ay!</h4>
              <p>The answer is {this.props.englishWord}.
                <br></br>
            You'll get it next time!
              </p>
              <button onClick={e => {
                e.preventDefault();
                this.nextQuestion(e);
              }}>Next Word</button>
            </div>
            <div className="hidden" id="success">
              <h4>¡Muy bien!</h4>
              <p>The answer is {this.props.englishWord}.
                <br></br>
            On to the next one!
              </p>
              <button onClick={e => {
                e.preventDefault();
                this.nextQuestion(e);
              }
              }>Next Word</button>
            </div>
          </form>
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
    protectedData: state.protectedData.data,
    spanishWord: state.questions.currentQuestion.spanish,
    englishWord: state.questions.currentQuestion.english
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
