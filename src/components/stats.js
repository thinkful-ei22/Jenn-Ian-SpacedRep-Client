import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import './stats.css';

export class StatsPage extends React.Component {
  componentDidMount(){
    // add table sort
  }
  render(){
    let questionScores;
    if(this.props.currentUser !== null && this.props.display === 'performance'){
      questionScores = this.props.questionList.map((question, index) => {
        return(
          <tr key={index}>
            <td>{question.spanish}</td>
            <td>{question.correctCount}</td>
            <td>{question.incorrectCount}</td>
            <td>{isNaN(Math.round(question.correctCount/(question.correctCount+question.incorrectCount)*100))? 0 : Math.round(question.correctCount/(question.correctCount+question.incorrectCount)*100)}%</td>
          </tr>
        );
      });
    }else{
      questionScores = <div></div>;
    }
    return (
      <div>
        <div className="overall">
          <h2>Overall Performance</h2>
          <table id="overall-performance" className="ui celled table ui collapsing table ui striped table">
            <thead>
              <tr>
                <th>Questions Answered</th>
                <th>Correct Guesses</th>
                <th>Incorrect Guesses</th>
                <th>Performance</th>
              </tr>
            </thead>
            <tbody>
              <td>{this.props.overallAnswered}</td>
              <td>{this.props.overallCorrect}</td>
              <td>{this.props.overallAnswered - this.props.overallCorrect}</td>
              <td>{isNaN(Math.round((this.props.overallCorrect/this.props.overallAnswered)*100)) ? 0 : Math.round((this.props.overallCorrect/this.props.overallAnswered)*100)}%</td>
            </tbody>
          </table>
        </div>
        <div className="session">
          <h2>Current Session Performance</h2>
          <table id="session-performance" className="ui celled table ui collapsing table ui striped table">
            <thead>
              <tr>
                <th>Questions Answered</th>
                <th>Correct Guesses</th>
                <th>Incorrect Guesses</th>
                <th>Performance</th>
              </tr>
            </thead>
            <tbody>
              <td>{this.props.total}</td>
              <td>{this.props.correct}</td>
              <td>{this.props.total - this.props.correct}</td>
              <td>{(isNaN(Math.round((this.props.correct/this.props.total)*100))) ? 0 : Math.round(((this.props.correct/this.props.total)*100))}%</td>
            </tbody>
          </table>
        </div>
        <div className="word">
          <h2>Performance Per Word</h2>
          <table id="word-performance" className="ui celled table ui collapsing table ui striped table">
            <thead>
              <tr>
                <th>Word</th>
                <th>Correct Guesses</th>
                <th>Incorrect Guesses</th>
                <th>Performance</th>
              </tr>
            </thead>
            <tbody>
              {questionScores}
            </tbody>
          </table>
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
    overallAnswered: state.auth.currentUser.questionsAnswered,
    overallCorrect: state.auth.currentUser.questionsCorrect,
    questionList: state.questions.questionList,
    userId: state.auth.currentUser._id,
    display: state.checkAnswer.displayPerformance
  };
};

export default requiresLogin()(connect(mapStateToProps)(StatsPage));