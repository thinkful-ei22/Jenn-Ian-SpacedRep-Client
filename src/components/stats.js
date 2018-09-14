import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchQuestion } from '../actions/questions';
import HeaderBar from './header-bar';
import './stats.css';

export class StatsPage extends React.Component {
  componentDidMount(){
    this.props.dispatch(fetchQuestion(this.props.userId));
    // add table sort
  }
  render(){
    let questionScores;
    if(this.props.currentUser !== null){
      questionScores = this.props.questionList.map((question, index) => {
        return(
          <tr key={index}>
            <td>{question.spanish}</td>
            <td>{question.correctCount}</td>
            <td>{question.incorrectCount}</td>
            <td>{Math.round(question.correctCount/(question.correctCount+question.incorrectCount))}</td>
          </tr>
        );
      });
    }else{
      questionScores = <div></div>;
    }
    return (
      <div>
        <HeaderBar/>
        <h1>{this.props.name}'s Performance</h1>
        <h2>Overall Performance</h2>
        <table id="overall-performance" className="ui collapsing table ui striped table">
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
            <td>{Math.round((this.props.overallCorrect/this.props.overallAnswered)*100)}</td>
          </tbody>
        </table>
        <h2>Current Session Performance</h2>
        <table id="session-performance" className="ui collapsing table ui striped table">
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
            <td>{Math.round((this.props.correct/this.props.total)*100)}</td>
          </tbody>
        </table>
        <h2>Performance Per Word</h2>
        <table id="word-performance" className="ui sortable celled table ui collapsing table ui striped table">
          <thead>
            <tr>
              <th className="sorted descending">Word</th>
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