import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";

import Timer from "./Timer";
import QuestionView from "../questions/QuestionView";
import PageBar from "./PageBar";

function addSeconds(numOfSeconds, date = new Date()) {
    const miliseconds = Date.parse(date.toISOString());
    return new Date(miliseconds + numOfSeconds * 1000);
}

class QuizView extends React.Component {
    state = {
        quizId: null,
        page: 0,
    };

    submit = () => {
        console.log(this.props.answers);
    };

    render() {
        if (!this.props.activeQuiz) {
            return <div>There is not active quizes at the moment!</div>;
        }

        const { quiz, start } = this.props.activeQuiz;

        const expire = addSeconds(
            quiz.timeLimit,
            new Date(start.endsWith("Z") ? start : start + "Z")
        );

        const question = quiz.questions[this.state.page];

        return (
            <div>
                <h4 className="text-center text-secondary">{quiz.title}</h4>
                <div className="row justify-content-center">
                    <div className="col-2">
                        Time Left: <Timer expire={expire} />
                    </div>
                    <div className="col-4">
                        <PageBar
                            pageCount={quiz.questions.length}
                            current={this.state.page}
                            onPageChanged={(newPage) =>
                                this.setState({
                                    page: newPage,
                                })
                            }
                        />
                    </div>
                    <div className="col-3">
                        <button
                            className="btn btn-primary"
                            onClick={this.submit}
                        >
                            Submit Answers
                        </button>
                    </div>
                </div>
                <QuestionView question={question} />
            </div>
        );
    }
}

const masStateToProps = ({ activeQuiz, answers }) => ({ activeQuiz, answers });

export default connect(masStateToProps)(QuizView);
