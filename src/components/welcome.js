import React from 'react';
import { connect } from 'react-redux';
import ResetBtn from './reset-btn';

export class Welcome extends React.Component {
    render() {
        let score;
        if (this.props.currentUser !== null && this.props.currentUser.questionsAnswered !== 0 && this.props.total === 0) {
            score = Math.floor(100 * (this.props.currentUser.questionsCorrect / this.props.currentUser.questionsAnswered));
        } else if (this.props.currentUser !== null && this.props.currentUser.questionsAnswered === 0 && this.props.total === 0) {
            score = 0;
        } else {
            score = Math.floor(100 * (this.props.overallCorrect / this.props.overallAnswered));
        }

        let sessionScore;
        if (isNaN((this.props.correct / this.props.total) * 100)) {
            sessionScore = <h3>Your Session Score is {`${0}%`}</h3>;
        }
        else if (!isNaN((this.props.correct / this.props.total) * 100)) {
            sessionScore = <h3>Your Session Score is {this.props.correct} out of {this.props.total} or {`${Math.round((this.props.correct / this.props.total) * 100)}%`}</h3>;
        }
        return (
            <div className="dashboard row">
                <div id="welcome" className="dashboard-name">
                    <h1 className="welcome">Welcome to ¡Hablamos! {this.props.name}</h1>
                    <h3>Your Overall Score is {score} %</h3>
                    {sessionScore}
                    <ResetBtn />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userId: state.auth.currentUser._id,
    name: state.auth.currentUser.firstName,
    currentUser: state.auth.currentUser,
    total: state.checkAnswer.totalAnswered,
    correct: state.checkAnswer.totalCorrect,
    overallAnswered: state.checkAnswer.overallAnswered,
    overallCorrect: state.checkAnswer.overallCorrect
});

export default connect(mapStateToProps)(Welcome);
