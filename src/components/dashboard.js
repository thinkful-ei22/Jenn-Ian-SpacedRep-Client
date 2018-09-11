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
    if(answer === this.props.englishWord){
      console.log('correct!');
    }
    else {
      console.log('incorrect!');
    }
  }
  render() {
    console.log(this.props.spanishWord, this.props.englishWord);
    return (
      <div className="dashboard row">
        <div className="dashboard-name">
          <h2 className="welcome">Welcome to ¡Hablamos! {this.props.name}</h2>
        </div>
        <div className="word-display col-3">
          <h3 className="spanish-word">{this.props.spanishWord}</h3>
          <form onSubmit={(e)=>{
            e.preventDefault();
            this.props.dispatch(fetchQuestion());
            this.checkAnswer(e);
          }
          }>
            <input type="text" name="answer" className="answer"></input>
            <button className="submit-answer" >Submit Answer</button>
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
