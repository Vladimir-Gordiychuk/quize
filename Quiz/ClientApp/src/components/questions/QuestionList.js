import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchQuestions } from "../../actions";

const QuestionList = (props) => {
    useEffect(() => {
        props.fetchQuestions();
    }, []);

    const items = props.questions.map((question) => (
        <div className="item" key={question.id}>
            <i className="large github middle aligned icon"></i>
            <div className="content">
                <div className="right floated content">
                    <Link
                        to={`/questions/${question.id}/edit`}
                        className="ui button"
                    >
                        Edit
                    </Link>
                    <Link
                        to={`/questions/${question.id}/delete`}
                        className="ui button negative"
                    >
                        Delete
                    </Link>
                </div>
                <Link className="header" to={`/questions/${question.id}`}>
                    Question #{question.id}
                </Link>
                <div className="description">{question.text}</div>
            </div>
        </div>
    ));

    return <div className="ui relaxed divided list">{items}</div>;
};
QuestionList.defaultProps = {
    questions: [],
};

const mapStateToProps = ({ questions }) => ({
    questions: Object.values(questions),
});

export default connect(mapStateToProps, {
    fetchQuestions,
})(QuestionList);
