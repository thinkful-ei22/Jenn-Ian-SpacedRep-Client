import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import './stats.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

export class StatsPage extends React.Component {
  componentDidMount(){
    // add table sort
  }
  render(){
    const overallData = [
      {
        questionsAnswered:this.props.overallAnswered,
        correctGuesses:this.props.overallCorrect,
        incorrectGuesses:(this.props.overallAnswered - this.props.overallCorrect),
        performance:isNaN(Math.round((this.props.overallCorrect/this.props.overallAnswered)*100)) ? 0 : Math.round((this.props.overallCorrect/this.props.overallAnswered)*100)
      }
    ];
    const overallColumns = [{
      Header: 'Questions Answered',
      accessor: 'questionsAnswered'
    },
    {
      Header: 'Correct Guesses',
      accessor: 'correctGuesses'
    },
    {
      Header: 'Incorrect Guesses',
      accessor: 'incorrectGuesses'
    },
    {
      Header: 'Performance',
      accessor: 'performance'
    }];
    const sessionData = [
      {
        questionsAnswered:this.props.total,
        correctGuesses:this.props.correct,
        incorrectGuesses:(this.props.total - this.props.correct),
        performance:(isNaN(Math.round((this.props.correct/this.props.total)*100))) ? 0 : Math.round(((this.props.correct/this.props.total)*100))
      }
    ];
    const sessionColumns = [
      {
        Header: 'Questions Answered',
        accessor: 'questionsAnswered'
      },
      {
        Header: 'Correct Guesses',
        accessor: 'correctGuesses'
      },
      {
        Header: 'Incorrect Guesses',
        accessor: 'incorrectGuesses'
      },
      {
        Header: 'Performance',
        accessor: 'performance'
      }
    ];
    const wordData = 
      this.props.questionList.map(question => {
        return {
          words: question.spanish,
          correct: question.correctCount,
          incorrect: question.incorrectCount,
          score: isNaN(Math.round(question.correctCount/(question.correctCount+question.incorrectCount)*100))? 0 : Math.round(question.correctCount/(question.correctCount+question.incorrectCount)*100)
        };
      });
    const wordColumns=[
      {
        Header: 'Word',
        accessor:'words',
      },
      {
        Header: 'Correct Guesses',
        accessor:'correct'
      },
      {
        Header: 'Incorrect Guesses',
        accessor: 'incorrect'
      },
      {
        Header: 'Performance',
        accessor:'score'
      }
    ];
    // let questionScores;
    // if(this.props.currentUser !== null && this.props.display === 'performance'){
    //   questionScores = this.props.questionList.map((question, index) => {
    //     return(
    //       <tr key={index}>
    //         <td>{question.spanish}</td>
    //         <td>{question.correctCount}</td>
    //         <td>{question.incorrectCount}</td>
    //         <td>{isNaN(Math.round(question.correctCount/(question.correctCount+question.incorrectCount)*100))? 0 : Math.round(question.correctCount/(question.correctCount+question.incorrectCount)*100)}%</td>
    //       </tr>
    //     );
    //   });
    // }else{
    //   questionScores = <div></div>;
    // }
    return (
      <div>
        <div className="overall">
          <h2>Overall Performance</h2>
          <ReactTable
            className='cell'
            defaultPageSize='1'
            showPagination={false}
            data={overallData}
            columns={overallColumns}
            id='overall-performance'>
          </ReactTable>
        </div>
        <div className="session">
          <h2>Current Session Performance</h2>
          <ReactTable
            className="cell"
            defaultPageSize='1'
            showPagination={false}
            data={sessionData}
            columns={sessionColumns}
            id="session-performance">
          </ReactTable>
        </div>
        <div className="word">
          <h2>Performance Per Word</h2>
          <ReactTable
            className='cell'
            defaultPageSize={this.props.questionList.length}
            showPagination={false}
            data={wordData}
            columns={wordColumns}
            id="word-performance">
          </ReactTable>
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