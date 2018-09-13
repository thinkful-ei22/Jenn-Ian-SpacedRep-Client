import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchQuestion } from '../actions/questions';
import HeaderBar from './header-bar';

export class StatsPage extends React.Component {
  componentDidMount(){
    console.log('mounting!');
    this.props.dispatch(fetchQuestion(this.props.userId));
  }
  render(){
    console.log('rendering!');
    let questionScores;
    if(this.props.currentUser !== null){
      questionScores = this.props.questionList.map((question, index) => {
        return(
          <div key={index} className="question-score">
            <p>Word: {question.spanish}</p>
            <p>Correct Guesses: {question.correctCount}</p>
            <p>Incorrect Guesses: {question.incorrectCount}</p>
            <p>Performance: {Math.round(question.correctCount/(question.correctCount+question.incorrectCount))}</p>
          </div>
        );
      });
    }else{
      questionScores = <div></div>;
    }
    return (
      <div>
        <HeaderBar/>
        <h2>{this.props.name}'s Performance</h2>
        <div className="col-3 overall-score">
          <h4>Overall</h4>
          <p>Questions Answered: {this.props.overallAnswered}</p>
          <p>Questions Correct: {this.props.overallCorrect}</p>
          <p>Questions Incorrect: {this.props.overallAnswered - this.props.overallCorrect}</p>
          <p>Performance: {Math.round((this.props.overallCorrect/this.props.overallAnswered)*100)}</p>
        </div>
        <div className="col-3 session-score">
          <h4>Current Session</h4>
          <p>Questions Answered: {this.props.total}</p>
          <p>Questions Correct: {this.props.correct}</p>
          <p>Questions Incorrect: {this.props.total - this.props.correct}</p>
          <p>Performance: {Math.round((this.props.correct/this.props.total)*100)}</p>
        </div>
        <div className="col-3 question-stats">
          <h4>Question Stats</h4>
          {questionScores}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
    name: state.auth.currentUser.firstName,
    total: state.checkAnswer.totalAnswered,
    correct: state.checkAnswer.totalCorrect,
    overallAnswered: state.checkAnswer.overallAnswered,
    overallCorrect: state.checkAnswer.overallCorrect,
    questionList: state.questions.questionList,
    userId: state.auth.currentUser._id
  };
};

export default requiresLogin()(connect(mapStateToProps)(StatsPage));