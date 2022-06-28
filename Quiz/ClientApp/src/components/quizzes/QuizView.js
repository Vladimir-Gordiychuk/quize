import React from "react";

import Timer from "./Timer";
import QuestionView from "../questions/QuestionView";
import PageBar from "./PageBar";

function addSeconds(numOfSeconds, date = new Date()) {
    const miliseconds = Date.parse(date.toISOString());
    return new Date(miliseconds + numOfSeconds * 1000);
}

class QuizView extends React.Component {
    state = {
        page: 0,
    };

    onPageChanged = (newPage) => {
        this.setState({
            page: newPage,
        });
    };

    render() {
        if (!this.props.challenge) {
            return <div>There is not active quizes at the moment!</div>;
        }

        const { quiz, start } = this.props.challenge;
        const page =
            (this.props.page && parseInt(this.props.page)) || this.state.page;
        const onPageChanged = this.props.onPageChanged || this.onPageChanged;

        const expire = addSeconds(
            quiz.timeLimit,
            new Date(start.endsWith("Z") ? start : start + "Z")
        );

        const question = quiz.questions[page];

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
                            current={page}
                            onPageChanged={onPageChanged}
                        />
                    </div>
                    <div className="col-3">
                        <button
                            className="btn btn-primary"
                            onClick={this.props.onSubmit}
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

export default QuizView;
